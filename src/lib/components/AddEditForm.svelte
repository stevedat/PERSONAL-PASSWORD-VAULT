<script>
  import { CryptoEngine } from '../crypto';
  import { showAddForm, editingItem } from '../stores';
  import { StorageEngine } from '../storage';
  
  export let onSave;
  
  let title = '';
  let username = '';
  let password = '';
  let note = '';
  let category = 'other';
  let isEditing = false;
  let editId = '';
  let lastEditingId = null; // Track last editing ID to prevent loops
  
  // Password masking for edit mode
  let showPassword = false;
  let showVerifyPopup = false;
  let verifyPassword = '';
  let verifyError = '';
  let isVerifying = false;
  let passwordUnlocked = false;
  
  const categories = [
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'banking', label: 'Banking', icon: '🏦' },
    { value: 'app', label: 'App', icon: '📱' },
    { value: 'website', label: 'Website', icon: '🌐' },
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'games', label: 'Games', icon: '🎮' },
    { value: 'other', label: 'Other', icon: '📌' }
  ];
  
  // Watch for changes in editingItem - only update if ID changed
  $: {
    if ($editingItem && $editingItem.id !== lastEditingId) {
      console.log('[AddEditForm] Editing item:', $editingItem.id);
      lastEditingId = $editingItem.id;
      isEditing = true;
      editId = $editingItem.id;
      title = $editingItem.title;
      username = $editingItem.username;
      password = $editingItem.password;
      note = $editingItem.note || '';
      category = $editingItem.category || 'other';
      
      // Reset password security state
      showPassword = false;
      passwordUnlocked = false;
    } else if (!$editingItem && lastEditingId !== null) {
      // Reset when editingItem is cleared
      console.log('[AddEditForm] Clearing edit state');
      lastEditingId = null;
      isEditing = false;
      editId = '';
    }
  }
  
  // Watch for changes in showAddForm - reset form for new item
  $: {
    if ($showAddForm && !$editingItem) {
      console.log('[AddEditForm] Opening add form, resetting all fields');
      // Force reset all fields
      isEditing = false;
      editId = '';
      title = '';
      username = '';
      password = '';
      note = '';
      category = 'other';
      lastEditingId = null;
      showPassword = false;
      passwordUnlocked = false;
    }
  }
  
  function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    password = result;
    showPassword = true; // Show generated password
  }
  
  function togglePasswordVisibility() {
    if (isEditing && !passwordUnlocked) {
      // Editing mode - require master password verification
      showVerifyPopup = true;
      verifyPassword = '';
      verifyError = '';
    } else {
      // Add mode or already unlocked - just toggle
      showPassword = !showPassword;
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
      
      // Success - unlock password field
      passwordUnlocked = true;
      showPassword = true;
      showVerifyPopup = false;
      verifyPassword = '';
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
  
  function handlePasswordInput(event) {
    if (isEditing && !passwordUnlocked) {
      // Prevent editing password in edit mode without verification
      event.preventDefault();
      showVerifyPopup = true;
      verifyPassword = '';
      verifyError = '';
    }
  }
  
  function save() {
    if (!title.trim() || !username.trim() || !password.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    const item = {
      id: isEditing ? editId : CryptoEngine.generateId(),
      title: title.trim(),
      username: username.trim(),
      password: password.trim(),
      note: note.trim() || undefined,
      category: category
    };
    
    console.log('[AddEditForm] Saving item:', {
      id: item.id,
      isEditing,
      title: item.title,
      category: item.category
    });
    
    onSave(item);
    cancel();
  }
  
  function cancel() {
    console.log('[AddEditForm] Cancelled, resetting all state');
    
    // Reset all form fields
    title = '';
    username = '';
    password = '';
    note = '';
    category = 'other';
    isEditing = false;
    editId = '';
    lastEditingId = null;
    showPassword = false;
    passwordUnlocked = false;
    showVerifyPopup = false;
    verifyPassword = '';
    verifyError = '';
    
    // Clear stores
    showAddForm.set(false);
    editingItem.set(null);
  }
</script>

{#if $showAddForm || $editingItem}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div 
    class="modal-backdrop"
    on:click={cancel}
    role="dialog"
    aria-modal="true"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="glass-modal" on:click|stopPropagation role="document">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="margin: 0; font-size: 1.25rem;" class="text-glass">{isEditing ? 'Edit' : 'Add'} Password</h2>
        <button 
          class="close-btn haptic-light" 
          on:click={cancel}
          type="button"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      
      <form on:submit|preventDefault={save} style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label for="title" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary">Title *</label>
          <input
            id="title"
            type="text"
            bind:value={title}
            placeholder="e.g., Gmail, Facebook"
            class="glass-input"
            required
          />
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary">Category</label>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            {#each categories as cat}
              <button
                type="button"
                class="category-tag category-{cat.value} haptic-light {category === cat.value ? 'selected' : ''}"
                on:click={() => category = cat.value}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            {/each}
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label for="username" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary">Username *</label>
          <input
            id="username"
            type="text"
            bind:value={username}
            placeholder="Username or email"
            class="glass-input"
            required
          />
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label for="password" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary">Password *</label>
          <div style="display: flex; gap: 0.5rem;">
            <div style="position: relative; flex: 1;">
              {#if showPassword}
                <input
                  id="password"
                  type="text"
                  bind:value={password}
                  placeholder="Password"
                  class="glass-input"
                  style="width: 100%; padding-right: 3rem;"
                  required
                  readonly={isEditing && !passwordUnlocked}
                  on:focus={handlePasswordInput}
                />
              {:else}
                <input
                  id="password"
                  type="password"
                  bind:value={password}
                  placeholder="Password"
                  class="glass-input"
                  style="width: 100%; padding-right: 3rem;"
                  required
                  readonly={isEditing && !passwordUnlocked}
                  on:focus={handlePasswordInput}
                />
              {/if}
              <button
                type="button"
                class="password-toggle-btn haptic-light"
                on:click={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button 
              type="button" 
              class="generate-btn haptic-medium" 
              on:click={generatePassword}
              aria-label="Generate password"
            >
              <span class="generate-icon">⚡</span>
              <span class="generate-text">Generate</span>
            </button>
          </div>
          {#if isEditing && !passwordUnlocked}
            <p style="font-size: 0.75rem; margin: 0; opacity: 0.7;" class="text-glass-secondary">
              🔒 Click 👁️ to verify master password and edit
            </p>
          {/if}
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label for="note" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary">Note</label>
          <textarea
            id="note"
            bind:value={note}
            placeholder="Optional note"
            rows="3"
            class="glass-input"
            style="resize: vertical; min-height: 4rem;"
          ></textarea>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button type="button" class="glass-btn haptic-light" style="flex: 1; padding: 0.75rem;" on:click={cancel}>
            Cancel
          </button>
          <button type="submit" class="glass-btn-primary haptic-medium" style="flex: 1; padding: 0.75rem; font-weight: 600;" disabled={!title.trim() || !username.trim() || !password.trim()}>
            {isEditing ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

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
        <p class="verify-subtitle text-glass-secondary">Enter your master password to edit this password</p>
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
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
  }
  
  /* Tablet/iPad - center modal */
  @media (min-width: 768px) {
    .modal-backdrop {
      align-items: center;
      padding: 1rem;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  /* Close button with better contrast */
  .close-btn {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 300;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.7);
  }

  .close-btn:hover {
    background: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  .close-btn:active {
    transform: scale(0.95);
  }

  :global(.dark) .close-btn {
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.8);
  }

  :global(.dark) .close-btn:hover {
    background: rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.95);
  }

  /* Generate button with icon */
  .generate-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    font-weight: 500;
    font-size: 0.875rem;
    min-height: 44px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  .generate-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .generate-btn:active {
    transform: scale(0.95);
  }

  :global(.dark) .generate-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  }

  :global(.dark) .generate-btn:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
  }

  .generate-icon {
    font-size: 1.125rem;
    line-height: 1;
  }

  .generate-text {
    line-height: 1;
  }

  /* Mobile - hide text, show icon only */
  @media (max-width: 480px) {
    .generate-text {
      display: none;
    }
    
    .generate-btn {
      padding: 0.75rem;
      min-width: 44px;
    }
  }

  /* Password toggle button */
  .password-toggle-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.05);
  }

  .password-toggle-btn:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(-50%) scale(1.05);
  }

  .password-toggle-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  :global(.dark) .password-toggle-btn {
    background: rgba(255, 255, 255, 0.1);
  }

  :global(.dark) .password-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

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