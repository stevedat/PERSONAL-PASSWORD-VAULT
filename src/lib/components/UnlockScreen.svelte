<script>
  import { onMount } from "svelte";
  import { StorageEngine } from "../storage";
  import { CryptoEngine } from "../crypto.client";
  import {
    isUnlocked,
    vaultItems,
    startAutoLock,
    biometricEnabled,
    showReminder,
  } from "../stores";
  import { BiometricAuth } from "../biometric";
  import { ReminderSystem } from "../reminders";
  import {
    ScanFace,
    Fingerprint,
    LockKeyhole,
    ShieldAlert,
    KeyRound,
    Copy,
    Download,
    CheckCircle2,
  } from "lucide-svelte";

  let masterPassword = "";
  let error = "";
  let loading = false;
  let hasExistingVault = false;
  let showBiometricSetup = false;
  let biometricSupported = false;
  let biometricType = "Biometric";

  // Recovery Key states
  let showRecoveryFlow = false;
  let recoveryKey = "";
  let recoveryNewPassword = "";
  let recoveryNewPasswordConfirm = "";
  let recoveryError = "";
  let recoveryLoading = false;
  let hasRecoveryData = false;
  let passwordHint = "";

  // Recovery Key Display (after vault creation)
  let showRecoveryKeyModal = false;
  let generatedRecoveryKey = "";
  let recoveryKeyCopied = false;
  let recoveryKeyAcknowledged = false;

  // Password hint
  let createPasswordHint = "";

  async function checkForVault() {
    if (typeof window === "undefined") return;
    hasExistingVault = await StorageEngine.hasVault();
    biometricSupported = await BiometricAuth.isAvailable();
    biometricEnabled.set(BiometricAuth.isEnabled());
    biometricType = await BiometricAuth.getBiometricType();
    if (hasExistingVault) {
      hasRecoveryData = await StorageEngine.hasRecoveryData();
      // Load hint
      const rd = await StorageEngine.getRecoveryData();
      if (rd && rd.passwordHint) passwordHint = rd.passwordHint;
    }
  }

  let failedAttempts = 0;

  async function unlock() {
    if (!masterPassword.trim()) {
      error = "Please enter your master password";
      return;
    }
    loading = true;
    error = "";
    try {
      const items = await StorageEngine.loadVault(masterPassword);
      sessionStorage.setItem("pv_master_key", masterPassword);
      vaultItems.set(items);
      isUnlocked.set(true);
      startAutoLock();
      ReminderSystem.resetSession();
      const reminderType = ReminderSystem.shouldShowReminder();
      if (reminderType) {
        showReminder.set(reminderType);
        ReminderSystem.markShownThisSession();
      }
      if (biometricSupported && !BiometricAuth.isEnabled()) {
        showBiometricSetup = true;
      }
      failedAttempts = 0;
      masterPassword = "";
    } catch (err) {
      failedAttempts++;
      error = failedAttempts >= 3 && passwordHint
        ? `Invalid master password. Hint: ${passwordHint}`
        : "Invalid master password";
    } finally {
      loading = false;
    }
  }

  async function unlockWithBiometric() {
    if (!BiometricAuth.isEnabled()) {
      error = "Biometric authentication not set up";
      return;
    }
    loading = true;
    error = "";
    try {
      await BiometricAuth.authenticate();
      let savedPassword = sessionStorage.getItem("pv_temp_password");
      if (!savedPassword) {
        savedPassword = await BiometricAuth.getSecureMasterKey();
      }
      if (savedPassword) {
        masterPassword = savedPassword;
        await unlock();
        sessionStorage.removeItem("pv_temp_password");
      } else {
        error = "Please enter your master password to complete unlock";
        loading = false;
      }
    } catch (err) {
      error = `${biometricType} authentication failed`;
      loading = false;
    }
  }

  async function setupBiometric() {
    if (!masterPassword.trim()) {
      error = "Please enter your master password first";
      return;
    }
    try {
      await BiometricAuth.register();
      biometricEnabled.set(true);
      sessionStorage.setItem("pv_temp_password", masterPassword);
      await BiometricAuth.setSecureMasterKey(masterPassword);
      showBiometricSetup = false;
      await unlock();
    } catch (err) {
      error = `Failed to set up ${biometricType}`;
    }
  }

  function skipBiometricSetup() {
    showBiometricSetup = false;
  }

  /** @param {string} password */
  function validateMasterPassword(password) {
    const errors = [];
    if (!password.trim()) return "Vui lòng nhập mật khẩu chính";
    if (password.length < 8) errors.push("ít nhất 8 ký tự");
    if (!/[A-Z]/.test(password)) errors.push("ít nhất 1 chữ hoa");
    if (!/[a-z]/.test(password)) errors.push("ít nhất 1 chữ thường");
    if (!/[0-9]/.test(password)) errors.push("ít nhất 1 số");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("ít nhất 1 ký tự đặc biệt");
    if (errors.length > 0) return `Mật khẩu phải có: ${errors.join(", ")}`;
    return null;
  }

  async function createVault() {
    const passwordError = validateMasterPassword(masterPassword);
    if (passwordError) {
      error = passwordError;
      return;
    }
    loading = true;
    error = "";
    try {
      await StorageEngine.saveVault([], masterPassword);
      sessionStorage.setItem("pv_master_key", masterPassword);

      // Generate recovery key
      generatedRecoveryKey = CryptoEngine.generateRecoveryKey();
      await StorageEngine.saveRecoveryData([], generatedRecoveryKey, createPasswordHint || undefined);

      vaultItems.set([]);
      isUnlocked.set(true);
      startAutoLock();

      // Show recovery key modal FIRST (before biometric)
      showRecoveryKeyModal = true;
      masterPassword = "";
    } catch (err) {
      error = "Failed to create vault";
    } finally {
      loading = false;
    }
  }

  function dismissRecoveryKeyModal() {
    showRecoveryKeyModal = false;
    if (biometricSupported) {
      showBiometricSetup = true;
    }
  }

  async function copyRecoveryKey() {
    try {
      await navigator.clipboard.writeText(generatedRecoveryKey);
      recoveryKeyCopied = true;
      setTimeout(() => (recoveryKeyCopied = false), 2000);
    } catch (err) {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = generatedRecoveryKey;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      recoveryKeyCopied = true;
      setTimeout(() => (recoveryKeyCopied = false), 2000);
    }
  }

  function downloadRecoveryKey() {
    const content = `PocketVault Recovery Key\n========================\n\nRecovery Key: ${generatedRecoveryKey}\n\nKeep this file in a safe place.\nYou will need this key if you forget your master password.\n\nGenerated: ${new Date().toLocaleString()}\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pocketvault-recovery-key.txt";
    a.click();
    URL.revokeObjectURL(url);
    recoveryKeyAcknowledged = true;
  }

  // --- Recovery Flow ---
  function startRecovery() {
    showRecoveryFlow = true;
    recoveryKey = "";
    recoveryNewPassword = "";
    recoveryNewPasswordConfirm = "";
    recoveryError = "";
  }

  function cancelRecovery() {
    showRecoveryFlow = false;
    recoveryKey = "";
    recoveryNewPassword = "";
    recoveryNewPasswordConfirm = "";
    recoveryError = "";
  }

  async function performRecovery() {
    if (!recoveryKey.trim()) {
      recoveryError = "Vui lòng nhập Recovery Key";
      return;
    }
    const pwError = validateMasterPassword(recoveryNewPassword);
    if (pwError) {
      recoveryError = pwError;
      return;
    }
    if (recoveryNewPassword !== recoveryNewPasswordConfirm) {
      recoveryError = "Mật khẩu xác nhận không khớp";
      return;
    }
    recoveryLoading = true;
    recoveryError = "";
    try {
      const items = await StorageEngine.recoverVault(recoveryKey.trim(), recoveryNewPassword);
      sessionStorage.setItem("pv_master_key", recoveryNewPassword);
      vaultItems.set(items);
      isUnlocked.set(true);
      startAutoLock();
      showRecoveryFlow = false;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      recoveryError = msg.includes("Invalid recovery key")
        ? "Recovery Key không hợp lệ"
        : `Recovery thất bại: ${msg}`;
    } finally {
      recoveryLoading = false;
    }
  }

  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (event.key === "Enter") {
      if (showRecoveryFlow) {
        performRecovery();
      } else if (showBiometricSetup) {
        setupBiometric();
      } else {
        hasExistingVault ? unlock() : createVault();
      }
    }
  }

  onMount(() => {
    checkForVault();
  });
</script>

<!-- Recovery Key Display Modal (after vault creation) -->
{#if showRecoveryKeyModal}
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999;">
    <div class="glass-modal" style="max-width: 480px;">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem; display: flex; justify-content: center;" class="animate-bounce-subtle">
          <KeyRound size={56} strokeWidth={1} color="#f59e0b" />
        </div>
        <h1 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0;" class="text-glass">
          Save Your Recovery Key
        </h1>
        <p class="text-glass-secondary" style="font-size: 0.875rem; line-height: 1.6;">
          This is your <strong>ONLY</strong> way to recover your vault if you forget your master password. Save it somewhere safe!
        </p>
      </div>

      <div style="background: rgba(245,158,11,0.1); border: 2px dashed rgba(245,158,11,0.4); border-radius: 16px; padding: 1.25rem; text-align: center; margin-bottom: 1rem;">
        <code style="font-size: 1.125rem; font-weight: 700; letter-spacing: 0.05em; word-break: break-all; line-height: 1.8; color: #f59e0b;">
          {generatedRecoveryKey}
        </code>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
        <button class="glass-btn haptic-light" style="flex: 1; padding: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;" on:click={copyRecoveryKey}>
          {#if recoveryKeyCopied}
            <CheckCircle2 size={18} strokeWidth={1.5} color="#22c55e" /> <span style="color: #22c55e;">Copied!</span>
          {:else}
            <Copy size={18} strokeWidth={1.5} /> Copy
          {/if}
        </button>
        <button class="glass-btn-primary haptic-medium" style="flex: 1; padding: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;" on:click={downloadRecoveryKey}>
          <Download size={18} strokeWidth={1.5} /> Download
        </button>
      </div>

      <button
        class="glass-btn haptic-medium"
        style="width: 100%; padding: 0.875rem; font-weight: 600;"
        on:click={dismissRecoveryKeyModal}
        disabled={!recoveryKeyAcknowledged && !recoveryKeyCopied}
      >
        {recoveryKeyAcknowledged || recoveryKeyCopied ? "I've saved it — Continue" : "Copy or download first"}
      </button>

      <p style="font-size: 0.7rem; text-align: center; margin: 0.75rem 0 0 0; opacity: 0.6;" class="text-glass-secondary">
        ⚠️ This key will NOT be shown again. If lost, recovery is impossible.
      </p>
    </div>
  </div>

<!-- Recovery Flow -->
{:else if showRecoveryFlow}
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div class="glass-modal">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem; display: flex; justify-content: center;">
          <KeyRound size={56} strokeWidth={1.5} color="#f59e0b" />
        </div>
        <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;" class="text-glass">
          Recover Vault
        </h1>
        <p class="text-glass-secondary" style="font-size: 0.875rem;">
          Enter your recovery key and set a new master password
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
          <label for="recovery-key" style="font-size: 0.8rem; font-weight: 500;" class="text-glass-secondary">Recovery Key</label>
          <input id="recovery-key" type="text" bind:value={recoveryKey} placeholder="XXXX-XXXX-XXXX-XXXX-XXXX" class="glass-input" style="font-size: 1rem; padding: 0.875rem; letter-spacing: 0.05em; text-transform: uppercase;" on:keydown={handleKeydown} disabled={recoveryLoading} />
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
          <label for="new-password" style="font-size: 0.8rem; font-weight: 500;" class="text-glass-secondary">New Master Password</label>
          <input id="new-password" type="password" bind:value={recoveryNewPassword} placeholder="New master password" class="glass-input" style="font-size: 1rem; padding: 0.875rem;" on:keydown={handleKeydown} disabled={recoveryLoading} />
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
          <label for="confirm-password" style="font-size: 0.8rem; font-weight: 500;" class="text-glass-secondary">Confirm New Password</label>
          <input id="confirm-password" type="password" bind:value={recoveryNewPasswordConfirm} placeholder="Confirm new password" class="glass-input" style="font-size: 1rem; padding: 0.875rem;" on:keydown={handleKeydown} disabled={recoveryLoading} />
        </div>

        {#if recoveryError}
          <div class="glass animate-fade-in" style="background: rgba(255,107,107,0.2); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem; border-radius: 12px; font-size: 0.875rem; text-align: center;">
            {recoveryError}
          </div>
        {/if}

        <button class="glass-btn-primary haptic-heavy" style="width: 100%; padding: 1rem; font-size: 1.125rem;" on:click={performRecovery} disabled={recoveryLoading || !recoveryKey.trim() || !recoveryNewPassword.trim() || !recoveryNewPasswordConfirm.trim()}>
          {#if recoveryLoading}
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <div class="glass-spinner"></div>
              <span>Recovering...</span>
            </div>
          {:else}
            Recover Vault
          {/if}
        </button>

        <button class="glass-btn haptic-light" style="width: 100%; padding: 0.75rem;" on:click={cancelRecovery}>
          Back to Login
        </button>
      </div>
    </div>
  </div>

<!-- Biometric Setup -->
{:else if showBiometricSetup}
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div class="glass-modal">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 3.75rem; margin-bottom: 1rem;" class="animate-bounce-subtle">
          {#if biometricType === "FaceID"}
            <span style="display: flex; align-items: center; justify-content: center;"><ScanFace size={60} strokeWidth={1} color="currentColor" /></span>
          {:else if biometricType === "TouchID"}
            <span style="display: flex; align-items: center; justify-content: center;"><Fingerprint size={60} strokeWidth={1} color="currentColor" /></span>
          {:else}
            <span style="display: flex; align-items: center; justify-content: center;"><LockKeyhole size={60} strokeWidth={1} color="currentColor" /></span>
          {/if}
        </div>
        <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;" class="text-glass">
          Set up {biometricType}
        </h1>
        <p class="text-glass-secondary">Enable {biometricType} for quick and secure access</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        {#if error}
          <div class="glass animate-fade-in" style="background: rgba(255,107,107,0.2); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem; border-radius: 12px; font-size: 0.875rem; text-align: center;">
            {error}
          </div>
        {/if}

        <button class="glass-btn-primary haptic-medium" style="width: 100%; padding: 1rem; font-size: 1.125rem;" on:click={setupBiometric} disabled={loading}>
          {#if loading}
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <div class="glass-spinner"></div>
              <span>Setting up...</span>
            </div>
          {:else}
            Enable {biometricType}
          {/if}
        </button>

        <button class="glass-btn haptic-light" style="width: 100%; padding: 0.75rem;" on:click={skipBiometricSetup}>
          Skip for now
        </button>

        <div style="text-align: center;">
          <p style="font-size: 0.75rem; margin: 0;" class="text-glass-secondary">You can enable this later in settings</p>
        </div>
      </div>
    </div>
  </div>

<!-- Main Unlock Screen -->
{:else}
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div class="glass-modal">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 3.75rem; margin-bottom: 1rem; display: flex; justify-content: center;" class="animate-bounce-subtle flex justify-center w-full">
          <ShieldAlert size={60} strokeWidth={1.5} color="#3b82f6" />
        </div>
        <h1 style="font-size: 1.875rem; font-weight: 700; margin: 0 0 0.5rem 0;" class="text-glass">
          PocketVault
        </h1>
        <p class="text-glass-secondary">Secure Password Manager</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        {#if BiometricAuth.isEnabled() && hasExistingVault}
          <button class="glass-btn-primary haptic-medium" style="width: 100%; padding: 1rem; font-size: 1.125rem;" on:click={unlockWithBiometric} disabled={loading}>
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
              <div style="font-size: 1.25rem; display: flex; align-items: center; justify-content: center;">
                {#if biometricType === "FaceID"}
                  <ScanFace size={20} strokeWidth={1.5} />
                {:else if biometricType === "TouchID"}
                  <Fingerprint size={20} strokeWidth={1.5} />
                {:else}
                  <LockKeyhole size={20} strokeWidth={1.5} />
                {/if}
              </div>
              <span>Unlock with {biometricType}</span>
            </div>
          </button>

          <div style="position: relative;">
            <div style="position: absolute; inset: 0; display: flex; align-items: center;">
              <div style="width: 100%; border-top: 1px solid #e2e8f0;" class="dark:border-zinc-800"></div>
            </div>
            <div style="position: relative; display: flex; justify-content: center; font-size: 0.875rem;">
              <span class="glass text-glass-secondary" style="padding: 0 1rem; font-size: 0.75rem;">or</span>
            </div>
          </div>
        {/if}

        <input
          type="password"
          bind:value={masterPassword}
          placeholder={hasExistingVault ? "Enter master password" : "Create master password"}
          class="glass-input"
          style="font-size: 1.125rem; padding: 1rem;"
          on:keydown={handleKeydown}
          disabled={loading}
        />

        {#if !hasExistingVault}
          <input
            type="text"
            bind:value={createPasswordHint}
            placeholder="Password hint (optional)"
            class="glass-input"
            style="font-size: 0.9375rem; padding: 0.875rem;"
            disabled={loading}
          />
        {/if}

        {#if error}
          <div class="glass animate-fade-in" style="background: rgba(255,107,107,0.2); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem; border-radius: 12px; font-size: 0.875rem; text-align: center;">
            {error}
          </div>
        {/if}

        <button
          class="glass-btn-primary haptic-heavy"
          style="width: 100%; padding: 1rem; font-size: 1.125rem;"
          on:click={hasExistingVault ? unlock : createVault}
          disabled={loading || !masterPassword.trim()}
        >
          {#if loading}
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <div class="glass-spinner"></div>
              <span>Unlocking...</span>
            </div>
          {:else if hasExistingVault}
            Unlock Vault
          {:else}
            Create Vault
          {/if}
        </button>

        {#if hasExistingVault && hasRecoveryData}
          <button class="glass-btn haptic-light" style="width: 100%; padding: 0.75rem; font-size: 0.875rem; opacity: 0.8;" on:click={startRecovery}>
            <span style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <KeyRound size={16} strokeWidth={1.5} />
              Forgot Master Password?
            </span>
          </button>
        {/if}

        {#if !hasExistingVault}
          <div class="glass" style="padding: 1rem; text-align: center;">
            <p style="font-size: 0.75rem; margin: 0; line-height: 1.6;" class="text-glass-secondary">
              Choose a strong master password. A recovery key will be generated to help you if you forget it.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
