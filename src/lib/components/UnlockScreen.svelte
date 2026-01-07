<script>
  import { onMount } from 'svelte';
  import { StorageEngine } from '../storage';
  import { isUnlocked, vaultItems, startAutoLock, biometricEnabled, showReminder } from '../stores';
  import { BiometricAuth } from '../biometric';
  import { ReminderSystem } from '../reminders';
  
  let masterPassword = '';
  let error = '';
  let loading = false;
  let hasExistingVault = false;
  let showBiometricSetup = false;
  let biometricSupported = false;
  let biometricType = 'Biometric';
  
  async function checkForVault() {
    if (typeof window === 'undefined') return;
    
    hasExistingVault = await StorageEngine.hasVault();
    biometricSupported = await BiometricAuth.isAvailable();
    biometricEnabled.set(BiometricAuth.isEnabled());
    biometricType = BiometricAuth.getBiometricType();
  }
  
  async function unlock() {
    if (!masterPassword.trim()) {
      error = 'Please enter your master password';
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      const items = await StorageEngine.loadVault(masterPassword);
      
      // Store master password in session for seamless operations
      sessionStorage.setItem('pv_master_key', masterPassword);
      
      vaultItems.set(items);
      isUnlocked.set(true);
      startAutoLock();
      
      // Reset reminder session and check if reminder should be shown
      ReminderSystem.resetSession();
      const reminderType = ReminderSystem.shouldShowReminder();
      if (reminderType) {
        showReminder.set(reminderType);
        ReminderSystem.markShownThisSession();
      }
      
      // Show biometric setup if supported and not enabled
      if (biometricSupported && !BiometricAuth.isEnabled()) {
        showBiometricSetup = true;
      }
      
      masterPassword = '';
    } catch (err) {
      error = 'Invalid master password';
    } finally {
      loading = false;
    }
  }
  
  async function unlockWithBiometric() {
    if (!BiometricAuth.isEnabled()) {
      error = 'Biometric authentication not set up';
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      await BiometricAuth.authenticate();
      
      // Biometric auth successful, but we still need master password for decryption
      // In a real implementation, you'd store an encrypted master key
      // For now, we'll prompt for password after biometric success
      const savedPassword = sessionStorage.getItem('pv_temp_password');
      if (savedPassword) {
        masterPassword = savedPassword;
        await unlock();
        sessionStorage.removeItem('pv_temp_password');
      } else {
        error = 'Please enter your master password to complete unlock';
        loading = false;
      }
    } catch (err) {
      error = `${biometricType} authentication failed`;
      loading = false;
    }
  }
  
  async function setupBiometric() {
    if (!masterPassword.trim()) {
      error = 'Please enter your master password first';
      return;
    }
    
    try {
      await BiometricAuth.register();
      biometricEnabled.set(true);
      
      // Temporarily store password for future biometric unlocks
      // In production, you'd encrypt this with a device-specific key
      sessionStorage.setItem('pv_temp_password', masterPassword);
      
      showBiometricSetup = false;
      await unlock();
    } catch (err) {
      error = `Failed to set up ${biometricType}`;
    }
  }
  
  function skipBiometricSetup() {
    showBiometricSetup = false;
  }
  
  function validateMasterPassword(password) {
    const errors = [];
    
    if (!password.trim()) {
      return 'Vui lòng nhập mật khẩu chính';
    }
    
    if (password.length < 8) {
      errors.push('ít nhất 8 ký tự');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('ít nhất 1 chữ hoa');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('ít nhất 1 chữ thường');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('ít nhất 1 số');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('ít nhất 1 ký tự đặc biệt');
    }
    
    if (errors.length > 0) {
      return `Mật khẩu phải có: ${errors.join(', ')}`;
    }
    
    return null;
  }

  async function createVault() {
    const passwordError = validateMasterPassword(masterPassword);
    if (passwordError) {
      error = passwordError;
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      await StorageEngine.saveVault([], masterPassword);
      
      // Store master password in session for seamless operations
      sessionStorage.setItem('pv_master_key', masterPassword);
      
      vaultItems.set([]);
      isUnlocked.set(true);
      startAutoLock();
      
      // Show biometric setup for new vault
      if (biometricSupported) {
        showBiometricSetup = true;
      }
      
      masterPassword = '';
    } catch (err) {
      error = 'Failed to create vault';
    } finally {
      loading = false;
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      if (showBiometricSetup) {
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

{#if showBiometricSetup}
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div class="glass-modal">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 3.75rem; margin-bottom: 1rem;" class="animate-bounce-subtle">
          {#if biometricType === 'FaceID'}
            👤
          {:else if biometricType === 'TouchID'}
            👆
          {:else}
            🔐
          {/if}
        </div>
        <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;" class="text-glass">Set up {biometricType}</h1>
        <p class="text-glass-secondary">Enable {biometricType} for quick and secure access</p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        {#if error}
          <div class="glass animate-fade-in" style="background: rgba(255,107,107,0.2); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem; border-radius: 12px; font-size: 0.875rem; text-align: center;">
            {error}
          </div>
        {/if}
        
        <button 
          class="glass-btn-primary haptic-medium" 
          style="width: 100%; padding: 1rem; font-size: 1.125rem;"
          on:click={setupBiometric} 
          disabled={loading}
        >
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
{:else}
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
    <div class="glass-modal">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 3.75rem; margin-bottom: 1rem;" class="animate-bounce-subtle">🔒</div>
        <h1 style="font-size: 1.875rem; font-weight: 700; margin: 0 0 0.5rem 0;" class="text-glass">PocketVault</h1>
        <p class="text-glass-secondary">Secure Password Manager</p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        {#if BiometricAuth.isEnabled() && hasExistingVault}
          <button 
            class="glass-btn-primary haptic-medium" 
            style="width: 100%; padding: 1rem; font-size: 1.125rem;"
            on:click={unlockWithBiometric} 
            disabled={loading}
          >
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
              <div style="font-size: 1.25rem;">
                {#if biometricType === 'FaceID'}
                  👤
                {:else if biometricType === 'TouchID'}
                  👆
                {:else}
                  🔐
                {/if}
              </div>
              <span>Unlock with {biometricType}</span>
            </div>
          </button>
          
          <div style="position: relative;">
            <div style="position: absolute; inset: 0; display: flex; align-items: center;">
              <div style="width: 100%; border-top: 1px solid rgba(255,255,255,0.35);"></div>
            </div>
            <div style="position: relative; display: flex; justify-content: center; font-size: 0.875rem;">
              <span class="glass text-glass-secondary" style="padding: 0 1rem; font-size: 0.75rem;">or</span>
            </div>
          </div>
        {/if}
        
        <input
          type="password"
          bind:value={masterPassword}
          placeholder={hasExistingVault ? 'Enter master password' : 'Create master password'}
          class="glass-input"
          style="font-size: 1.125rem; padding: 1rem;"
          on:keydown={handleKeydown}
          disabled={loading}
        />
        
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
        
        {#if !hasExistingVault}
          <div class="glass" style="padding: 1rem; text-align: center;">
            <p style="font-size: 0.75rem; margin: 0; line-height: 1.6;" class="text-glass-secondary">
              Choose a strong master password. This cannot be recovered if forgotten.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}