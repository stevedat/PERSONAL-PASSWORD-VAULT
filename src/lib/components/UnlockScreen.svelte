<script>
  import { StorageEngine } from '../storage';
  import { isUnlocked, vaultItems, startAutoLock } from '../stores';
  
  let masterPassword = '';
  let error = '';
  let loading = false;
  let hasExistingVault = false;
  
  async function checkForVault() {
    hasExistingVault = await StorageEngine.hasVault();
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
      masterPassword = '';
    } catch (err) {
      error = 'Invalid master password';
    } finally {
      loading = false;
    }
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
      masterPassword = '';
    } catch (err) {
      error = 'Failed to create vault';
    } finally {
      loading = false;
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      hasExistingVault ? unlock() : createVault();
    }
  }
  
  checkForVault();
</script>

<div class="unlock-screen">
  <div class="unlock-container">
    <div class="logo">
      <div class="lock-icon">🔒</div>
      <h1>PocketVault</h1>
      <p>Secure Password Manager</p>
    </div>
    
    <div class="form">
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
  
  .lock-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
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
  
  .unlock-btn:disabled {
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