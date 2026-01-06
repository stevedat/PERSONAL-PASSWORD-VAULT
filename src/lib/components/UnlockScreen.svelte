<script>
  import { StorageEngine } from '../storage';
  import { isUnlocked, vaultItems, startAutoLock, biometricEnabled } from '../stores';
  import { BiometricAuth } from '../biometric';
  
  let masterPassword = '';
  let error = '';
  let loading = false;
  let hasExistingVault = false;
  let showBiometricSetup = false;
  let biometricSupported = false;
  let biometricType = 'Biometric';
  
  async function checkForVault() {
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
      vaultItems.set(items);
      isUnlocked.set(true);
      startAutoLock();
      
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
  
  async function createVault() {
    if (!masterPassword.trim()) {
      error = 'Please enter a master password';
      return;
    }
    
    if (masterPassword.length < 8) {
      error = 'Master password must be at least 8 characters';
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      await StorageEngine.saveVault([], masterPassword);
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
  
  checkForVault();
</script>

{#if showBiometricSetup}
  <div class="unlock-screen">
    <div class="unlock-container">
      <div class="logo">
        <div class="biometric-icon">
          {#if biometricType === 'FaceID'}
            👤
          {:else if biometricType === 'TouchID'}
            👆
          {:else}
            🔐
          {/if}
        </div>
        <h1>Set up {biometricType}</h1>
        <p>Enable {biometricType} for quick and secure access</p>
      </div>
      
      <div class="form">
        {#if error}
          <div class="error">{error}</div>
        {/if}
        
        <button class="biometric-btn" on:click={setupBiometric} disabled={loading}>
          {#if loading}
            Setting up...
          {:else}
            Enable {biometricType}
          {/if}
        </button>
        
        <button class="skip-btn" on:click={skipBiometricSetup}>
          Skip for now
        </button>
        
        <div class="info">
          <p>You can enable this later in settings</p>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="unlock-screen">
    <div class="unlock-container">
      <div class="logo">
        <div class="lock-icon">🔒</div>
        <h1>PocketVault</h1>
        <p>Secure Password Manager</p>
      </div>
      
      <div class="form">
        {#if BiometricAuth.isEnabled() && hasExistingVault}
          <button class="biometric-unlock-btn" on:click={unlockWithBiometric} disabled={loading}>
            <div class="biometric-icon-small">
              {#if biometricType === 'FaceID'}
                👤
              {:else if biometricType === 'TouchID'}
                👆
              {:else}
                🔐
              {/if}
            </div>
            Unlock with {biometricType}
          </button>
          
          <div class="divider">
            <span>or</span>
          </div>
        {/if}
        
        <input
          type="password"
          bind:value={masterPassword}
          placeholder={hasExistingVault ? 'Enter master password' : 'Create master password'}
          class="password-input"
          on:keydown={handleKeydown}
          disabled={loading}
        />
        
        {#if error}
          <div class="error">{error}</div>
        {/if}
        
        <button
          class="unlock-btn"
          on:click={hasExistingVault ? unlock : createVault}
          disabled={loading || !masterPassword.trim()}
        >
          {#if loading}
            Unlocking...
          {:else if hasExistingVault}
            Unlock Vault
          {:else}
            Create Vault
          {/if}
        </button>
        
        {#if !hasExistingVault}
          <div class="info">
            <p>Choose a strong master password. This cannot be recovered if forgotten.</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .unlock-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
  }
  
  .unlock-container {
    background: var(--bg-primary);
    border-radius: 1rem;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .lock-icon, .biometric-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .biometric-icon-small {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  h1 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
    font-size: 1.8rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .biometric-unlock-btn {
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .biometric-unlock-btn:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  
  .biometric-btn {
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .biometric-btn:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  
  .skip-btn {
    padding: 0.75rem;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: none;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .skip-btn:hover {
    background: var(--bg-hover);
  }
  
  .divider {
    text-align: center;
    position: relative;
    margin: 0.5rem 0;
  }
  
  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border);
  }
  
  .divider span {
    background: var(--bg-primary);
    padding: 0 1rem;
    color: var(--text-secondary);
    font-size: 0.8rem;
  }
  
  .password-input {
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    font-size: 1rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    transition: border-color 0.2s;
  }
  
  .password-input:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  .unlock-btn {
    padding: 1rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .unlock-btn:hover:not(:disabled) {
    background: var(--primary-dark);
  }
  
  .unlock-btn:disabled, .biometric-unlock-btn:disabled, .biometric-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .error {
    color: var(--error);
    font-size: 0.9rem;
    text-align: center;
  }
  
  .info {
    text-align: center;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
</style>