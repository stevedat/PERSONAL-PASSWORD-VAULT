<script>
  import { onMount } from 'svelte';
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
  let usernameId, passwordId, noteId, verifyId;

  onMount(() => {
    const uniqueId = `item-${item.id}`;
    usernameId = `${uniqueId}-username`;
    passwordId = `${uniqueId}-password`;
    noteId = `${uniqueId}-note`;
    verifyId = `${uniqueId}-verify`;
  });

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
      copyFeedback[field] = true;
      setTimeout(() => {
        copyFeedback[field] = false;
        copyFeedback = { ...copyFeedback };
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function editItem() {
    editingItem.set(item);
  }

  function togglePasswordVisibility() {
    if (showPassword) {
      showPassword = false;
    } else {
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
      await StorageEngine.loadVault(verifyPassword);
      showPassword = true;
      showVerifyPopup = false;
      verifyPassword = '';
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
    }
  }

  function handleGlobalKeydown(event) {
    if (event.key === 'Escape' && showVerifyPopup) {
      cancelVerify();
    }
  }
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

<div class="vault-card glass animate-slide-up">
  <div class="card-header">
    <div class="card-title-section">
      <h3 class="card-title text-glass">{item.title}</h3>
      {#if item.category}
        <span class="category-tag category-{item.category}">
          {categoryIcons[item.category]} {categoryLabels[item.category]}
        </span>
      {/if}
    </div>
    <div class="card-actions">
      <button class="action-btn action-btn-edit haptic-light" on:click={editItem} title="Edit" aria-label="Edit password for {item.title}">
        <span class="action-icon">✏️</span>
      </button>
      <button class="action-btn action-btn-delete haptic-heavy" on:click={() => onDelete(item.id)} title="Delete" aria-label="Delete password for {item.title}">
        <span class="action-icon">🗑️</span>
      </button>
    </div>
  </div>

  <div class="card-body">
    <div class="field-group">
      <label for={usernameId} class="field-label text-glass-secondary">Username</label>
      <div class="field-content glass-field">
        <span id={usernameId} class="field-value text-glass">{item.username}</span>
        <button class="field-btn glass-btn-primary haptic-medium" on:click={() => copyToClipboard(item.username, 'username')} aria-label="Copy username for {item.title}">
          {copyFeedback.username ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>

    <div class="field-group">
      <label for={passwordId} class="field-label text-glass-secondary">Password</label>
      <div class="field-content glass-field">
        <span id={passwordId} class="field-value text-glass">
          {showPassword ? item.password : '••••••••••••'}
        </span>
        <div class="field-actions">
          <button class="field-btn-icon glass-btn haptic-light" on:click={togglePasswordVisibility} title={showPassword ? 'Hide password' : 'Show password'} aria-label="{showPassword ? 'Hide' : 'Show'} password for {item.title}">
            <span class="action-icon">{showPassword ? '🙈' : '👁️'}</span>
          </button>
          <button class="field-btn glass-btn-primary haptic-medium" on:click={() => copyToClipboard(item.password, 'password')} aria-label="Copy password for {item.title}">
            {copyFeedback.password ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>

    {#if item.note}
      <div class="field-group">
        <label for={noteId} class="field-label text-glass-secondary">Note</label>
        <div class="field-content glass-field field-note">
          <span id={noteId} class="field-value text-glass">{item.note}</span>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- Master Password Verification Popup -->
{#if showVerifyPopup}
  <!-- svelte-ignore a11y-warnings -->
  <div class="verify-backdrop" on:click={cancelVerify} role="dialog" aria-modal="true" aria-labelledby="verify-title">
    <!-- svelte-ignore a11y-warnings -->
    <div class="verify-popup glass" on:click|stopPropagation role="document">
      <div class="verify-header">
        <div class="verify-icon">🔐</div>
        <h3 id="verify-title" class="verify-title text-glass">Verify Master Password</h3>
        <p class="verify-subtitle text-glass-secondary">Enter your master password to view this password</p>
      </div>
      <div class="verify-body">
        <label for={verifyId} class="sr-only">Master password</label>
        <input id={verifyId} type="password" bind:value={verifyPassword} on:keydown={handleVerifyKeydown} placeholder="Master password" class="glass-input verify-input" aria-label="Master password for verification" disabled={isVerifying} />
        {#if verifyError}
          <div class="verify-error" role="alert">
            <span>⚠️</span>
            <span>{verifyError}</span>
          </div>
        {/if}
      </div>
      <div class="verify-actions">
        <button class="glass-btn verify-btn-cancel haptic-light" on:click={cancelVerify} disabled={isVerifying}>Cancel</button>
        <button class="glass-btn-primary verify-btn-confirm haptic-medium" on:click={verifyMasterPassword} disabled={isVerifying || !verifyPassword.trim()}>
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
  .vault-card { padding: 1.25rem; border-radius: 20px; cursor: default; transition: all 0.3s ease-out; }
  .vault-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12); }
  :global(.dark) .vault-card:hover { box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4); }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; gap: 1rem; }
  .card-title-section { flex: 1; min-width: 0; }
  .card-title { font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .card-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
  .action-btn { width: 2.75rem; height: 2.75rem; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 14px; cursor: pointer; transition: all 0.2s; }
  .action-btn-edit { background: rgba(91, 140, 255, 0.1); color: #5b8cff; }
  .action-btn-edit:hover { background: rgba(91, 140, 255, 0.2); transform: scale(1.05); }
  :global(.dark) .action-btn-edit { background: rgba(91, 140, 255, 0.15); color: #60a5fa; }
  :global(.dark) .action-btn-edit:hover { background: rgba(91, 140, 255, 0.25); }
  .action-btn-delete { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
  .action-btn-delete:hover { background: rgba(239, 68, 68, 0.2); transform: scale(1.05); }
  :global(.dark) .action-btn-delete { background: rgba(239, 68, 68, 0.15); color: #fca5a5; }
  :global(.dark) .action-btn-delete:hover { background: rgba(239, 68, 68, 0.25); }
  .action-icon { font-size: 1.125rem; }
  .card-body { display: flex; flex-direction: column; gap: 0.875rem; }
  .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .field-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8; }
  .glass-field { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.875rem 1rem; border-radius: 16px; background: rgba(255, 255, 255, 0.5); border: 1px solid rgba(255, 255, 255, 0.3); transition: all 0.2s; }
  :global(.dark) .glass-field { background: rgba(0, 0, 0, 0.2); border-color: rgba(255, 255, 255, 0.1); }
  .glass-field:hover { background: rgba(255, 255, 255, 0.6); border-color: rgba(255, 255, 255, 0.4); }
  :global(.dark) .glass-field:hover { background: rgba(0, 0, 0, 0.3); border-color: rgba(255, 255, 255, 0.15); }
  .field-note { align-items: flex-start; }
  .field-value { flex: 1; font-family: 'SF Mono', 'Monaco', 'Consolas', monospace; font-size: 0.875rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1.5; }
  .field-note .field-value { white-space: pre-wrap; word-break: break-word; }
  .field-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
  .field-btn, .field-btn-icon { padding: 0.5rem 0.875rem; font-size: 0.75rem; font-weight: 500; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; min-height: 36px; white-space: nowrap; }
  .field-btn-icon { padding: 0.5rem; min-width: 36px; display: flex; align-items: center; justify-content: center; }
  .field-btn-icon .action-icon { font-size: 1rem; }
  @media (max-width: 480px) { .vault-card { padding: 1rem; border-radius: 18px; } .card-title { font-size: 1rem; } .action-btn { width: 2.5rem; height: 2.5rem; } .action-icon { font-size: 1rem; } .glass-field { padding: 0.75rem 0.875rem; border-radius: 14px; } .field-value { font-size: 0.8125rem; } .field-btn { padding: 0.5rem 0.75rem; font-size: 0.7rem; } }
  .verify-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; z-index: 2000; animation: fadeIn 0.15s ease-out; }
  .verify-popup { max-width: 400px; width: 100%; padding: 1.5rem; border-radius: 20px; animation: slideUp 0.2s ease-out; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
  .verify-header { text-align: center; margin-bottom: 1.5rem; }
  .verify-icon { font-size: 3rem; margin-bottom: 0.75rem; animation: pulse 0.5s ease-out; }
  .verify-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0; }
  .verify-subtitle { font-size: 0.875rem; margin: 0; opacity: 0.8; }
  .verify-body { margin-bottom: 1.5rem; }
  .verify-input { width: 100%; padding: 0.875rem 1rem; font-size: 1rem; text-align: center; letter-spacing: 0.05em; }
  .verify-input:focus { box-shadow: 0 0 0 3px rgba(91, 140, 255, 0.3); }
  .verify-error { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.75rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; color: #ef4444; font-size: 0.875rem; animation: shake 0.3s ease-out; }
  :global(.dark) .verify-error { background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.4); color: #fca5a5; }
  .verify-actions { display: flex; gap: 0.75rem; }
  .verify-btn-cancel, .verify-btn-confirm { flex: 1; padding: 0.875rem; font-weight: 500; border-radius: 14px; min-height: 48px; }
  .verify-btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
  @media (max-width: 480px) { .verify-popup { max-width: 100%; margin: 0 0.5rem; } .verify-icon { font-size: 2.5rem; } .verify-title { font-size: 1.125rem; } }
</style>
