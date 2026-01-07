<script>
  import { editingItem } from '../stores';
  import { StorageEngine } from '../storage';
  
  export let item;
  export let onDelete;
  
  let showPassword = false;
  let copyFeedback = {};
  let showVerifyPopup = false;
  let verifyPassword = '';
  let verifyError = '';
  let isVerifying = false;
  
  const categoryIcons = {
    email: '📧',
    banking: '🏦',
    app: '📱',
    website: '🌐',
    work: '💼',
    games: '🎮',
    other: '📌'
  };
  
  const categoryLabels = {
    email: 'Email',
    banking: 'Banking',
    app: 'App',
    website: 'Website',
    work: 'Work',
    games: 'Games',
    other: 'Other'
  };
  
  async function copyToClipboard(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Show feedback for this specific field
      copyFeedback[field] = true;
      setTimeout(() => {
        copyFeedback[field] = false;
        copyFeedback = { ...copyFeedback }; // Trigger reactivity
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      copyFeedback[field] = true;
      setTimeout(() => {
        copyFeedback[field] = false;
        copyFeedback = { ...copyFeedback };
      }, 1500);
    }
  }
  
  function editItem() {
    console.log('[VaultItem] Edit clicked for item:', item.id, item.title);
    editingItem.set(item);
  }
  
  function togglePasswordVisibility() {
    if (showPassword) {
      // Hide password - no verification needed
      showPassword = false;
    } else {
      // Show password - require verification
      showVerifyPopup = true;
      verifyPassword = '';
      verifyError = '';
    }
  }
  
  async function verifyMasterPassword() {
    if (!verifyPassword.trim()) {
      verifyError = 'Please enter master password';
      return;
    }
    
    isVerifying = true;
    verifyError = '';
    
    try {
      // Verify by trying to load vault with the password
      await StorageEngine.loadVault(verifyPassword);
      
      // Success - show password
      showPassword = true;
      showVerifyPopup = false;
      verifyPassword = '';
      
      // Auto-hide after 30 seconds for security
      setTimeout(() => {
        showPassword = false;
      }, 30000);
    } catch (error) {
      verifyError = 'Incorrect master password';
      verifyPassword = '';
    } finally {
      isVerifying = false;
    }
  }
  
  function cancelVerify() {
    showVerifyPopup = false;
    verifyPassword = '';
    verifyError = '';
  }
  
  function handleVerifyKeydown(event) {
    if (event.key === 'Enter') {
      verifyMasterPassword();
    } else if (event.key === 'Escape') {
      cancelVerify();
    }
  }
</script>

<div class="glass-card animate-slide-up">
  <div class="flex justify-between items-start mb-3">
    <div class="flex-1 mr-2">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.375rem;">
        <h3 class="text-lg font-semibold text-glass truncate" style="margin: 0;">{item.title}</h3>
        {#if item.category}
          <span class="category-tag category-{item.category}" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">
            {categoryIcons[item.category]} {categoryLabels[item.category]}
          </span>
        {/if}
      </div>
    </div>
    <div class="flex space-x-2 flex-shrink-0">
      <button 
        class="glass-btn haptic-light hover:scale-110" 
        style="padding: 0.5rem; min-width: 40px; min-height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px;"
        on:click={editItem} 
        title="Edit"
      >
        <span style="font-size: 1.125rem;">✏️</span>
      </button>
      <button 
        class="glass-btn-danger haptic-heavy hover:scale-110" 
        style="padding: 0.5rem; min-width: 40px; min-height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px;"
        on:click={() => onDelete(item.id)} 
        title="Delete"
      >
        <span style="font-size: 1.125rem;">🗑️</span>
      </button>
    </div>
  </div>
  
  <div class="space-y-3">
    <div class="space-y-1">
      <span class="field-label text-xs font-medium text-glass-secondary uppercase tracking-wide">Username</span>
      <div class="flex items-center justify-between glass p-3 rounded-lg">
        <span class="text-glass font-mono text-sm flex-1 truncate">{item.username}</span>
        <button 
          class="glass-btn-primary haptic-medium ml-2" 
          style="padding: 0.5rem 0.875rem; font-size: 0.75rem; min-height: 36px;"
          on:click={() => copyToClipboard(item.username, 'username')}
        >
          {copyFeedback.username ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
    
    <div class="space-y-1">
      <span class="field-label text-xs font-medium text-glass-secondary uppercase tracking-wide">Password</span>
      <div class="flex items-center justify-between glass p-3 rounded-lg">
        <span class="text-glass font-mono text-sm flex-1 truncate">
          {showPassword ? item.password : '••••••••••••'}
        </span>
        <div class="flex space-x-2 ml-2">
          <button 
            class="glass-btn haptic-light hover:scale-110" 
            style="padding: 0.5rem; min-width: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;"
            on:click={togglePasswordVisibility}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            <span style="font-size: 1rem;">{showPassword ? '🙈' : '👁️'}</span>
          </button>
          <button 
            class="glass-btn-primary haptic-medium" 
            style="padding: 0.5rem 0.875rem; font-size: 0.75rem; min-height: 36px;"
            on:click={() => copyToClipboard(item.password, 'password')}
          >
            {copyFeedback.password ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
    
    {#if item.note}
      <div class="space-y-1">
        <span class="field-label text-xs font-medium text-glass-secondary uppercase tracking-wide">Note</span>
        <div class="glass p-3 rounded-lg">
          <span class="text-glass text-sm whitespace-pre-wrap">{item.note}</span>
        </div>
      </div>
    {/if}
  </div>
</div>


<!-- Master Password Verification Popup -->
{#if showVerifyPopup}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="verify-backdrop" on:click={cancelVerify}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="verify-popup glass" on:click|stopPropagation>
      <div class="verify-header">
        <div class="verify-icon">🔐</div>
        <h3 class="verify-title text-glass">Verify Master Password</h3>
        <p class="verify-subtitle text-glass-secondary">Enter your master password to view this password</p>
      </div>
      
      <div class="verify-body">
        <input
          type="password"
          bind:value={verifyPassword}
          on:keydown={handleVerifyKeydown}
          placeholder="Master password"
          class="glass-input verify-input"
          autofocus
          disabled={isVerifying}
        />
        
        {#if verifyError}
          <div class="verify-error">
            <span>⚠️</span>
            <span>{verifyError}</span>
          </div>
        {/if}
      </div>
      
      <div class="verify-actions">
        <button 
          class="glass-btn verify-btn-cancel haptic-light" 
          on:click={cancelVerify}
          disabled={isVerifying}
        >
          Cancel
        </button>
        <button 
          class="glass-btn-primary verify-btn-confirm haptic-medium" 
          on:click={verifyMasterPassword}
          disabled={isVerifying || !verifyPassword.trim()}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Verification Popup */
  .verify-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 2000;
    animation: fadeIn 0.15s ease-out;
  }

  .verify-popup {
    max-width: 400px;
    width: 100%;
    padding: 1.5rem;
    border-radius: 20px;
    animation: slideUp 0.2s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .verify-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .verify-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
    animation: pulse 0.5s ease-out;
  }

  .verify-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  .verify-subtitle {
    font-size: 0.875rem;
    margin: 0;
    opacity: 0.8;
  }

  .verify-body {
    margin-bottom: 1.5rem;
  }

  .verify-input {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .verify-input:focus {
    box-shadow: 0 0 0 3px rgba(91, 140, 255, 0.3);
  }

  .verify-error {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding: 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    color: #ef4444;
    font-size: 0.875rem;
    animation: shake 0.3s ease-out;
  }

  :global(.dark) .verify-error {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.4);
    color: #fca5a5;
  }

  .verify-actions {
    display: flex;
    gap: 0.75rem;
  }

  .verify-btn-cancel,
  .verify-btn-confirm {
    flex: 1;
    padding: 0.875rem;
    font-weight: 500;
    border-radius: 14px;
    min-height: 48px;
  }

  .verify-btn-confirm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-8px);
    }
    75% {
      transform: translateX(8px);
    }
  }

  /* Mobile optimization */
  @media (max-width: 480px) {
    .verify-popup {
      max-width: 100%;
      margin: 0 0.5rem;
    }

    .verify-icon {
      font-size: 2.5rem;
    }

    .verify-title {
      font-size: 1.125rem;
    }
  }
</style>
