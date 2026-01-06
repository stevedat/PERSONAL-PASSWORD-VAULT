<script>
  import { editingItem } from '../stores';
  
  export let item;
  export let onDelete;
  
  let showPassword = false;
  
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      // Simple feedback - could be enhanced with toast notifications
      const button = event && event.target;
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  
  function editItem() {
    editingItem.set(item);
  }
</script>

<div class="vault-item">
  <div class="item-header">
    <h3 class="item-title">{item.title}</h3>
    <div class="item-actions">
      <button class="action-btn" on:click={editItem} title="Edit">
        ✏️
      </button>
      <button class="action-btn delete" on:click={() => onDelete(item.id)} title="Delete">
        🗑️
      </button>
    </div>
  </div>
  
  <div class="item-content">
    <div class="field">
      <span class="field-label">Username</span>
      <div class="field-value">
        <span class="value">{item.username}</span>
        <button class="copy-btn" on:click={() => copyToClipboard(item.username)}>
          Copy
        </button>
      </div>
    </div>
    
    <div class="field">
      <span class="field-label">Password</span>
      <div class="field-value">
        <span class="value password">
          {showPassword ? item.password : '••••••••'}
        </span>
        <div class="password-actions">
          <button class="toggle-btn" on:click={() => showPassword = !showPassword}>
            {showPassword ? '🙈' : '👁️'}
          </button>
          <button class="copy-btn" on:click={() => copyToClipboard(item.password)}>
            Copy
          </button>
        </div>
      </div>
    </div>
    
    {#if item.note}
      <div class="field">
        <span class="field-label">Note</span>
        <div class="field-value">
          <span class="value note">{item.note}</span>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .vault-item {
    background: var(--bg-secondary);
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid var(--border);
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .item-title {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .item-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-btn {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
  }
  
  .action-btn:hover {
    background: var(--bg-hover);
  }
  
  .action-btn.delete:hover {
    background: var(--error-light);
  }
  
  .item-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .field-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  .field-value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  
  .value {
    color: var(--text-primary);
    font-family: monospace;
    font-size: 0.9rem;
    flex: 1;
    word-break: break-all;
  }
  
  .value.note {
    font-family: inherit;
    white-space: pre-wrap;
  }
  
  .password-actions {
    display: flex;
    gap: 0.25rem;
  }
  
  .copy-btn, .toggle-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
  }
  
  .copy-btn:hover, .toggle-btn:hover {
    background: var(--primary-dark);
  }
  
  .toggle-btn {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
  
  .toggle-btn:hover {
    background: var(--bg-hover);
  }
</style>