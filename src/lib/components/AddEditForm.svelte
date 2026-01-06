<script>
  import { CryptoEngine } from '../crypto';
  import { showAddForm, editingItem } from '../stores';
  
  export let onSave;
  
  let title = '';
  let username = '';
  let password = '';
  let note = '';
  let isEditing = false;
  let editId = '';
  
  $: if ($editingItem) {
    isEditing = true;
    editId = $editingItem.id;
    title = $editingItem.title;
    username = $editingItem.username;
    password = $editingItem.password;
    note = $editingItem.note || '';
  } else if ($showAddForm) {
    isEditing = false;
    editId = '';
    title = '';
    username = '';
    password = '';
    note = '';
  }
  
  function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    password = result;
  }
  
  function save() {
    if (!title.trim() || !username.trim() || !password.trim()) {
      return;
    }
    
    const item = {
      id: isEditing ? editId : CryptoEngine.generateId(),
      title: title.trim(),
      username: username.trim(),
      password: password.trim(),
      note: note.trim() || undefined
    };
    
    onSave(item);
    cancel();
  }
  
  function cancel() {
    showAddForm.set(false);
    editingItem.set(null);
  }
</script>

{#if $showAddForm || $editingItem}
  <button class="modal-overlay" on:click={cancel} aria-label="Close modal">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="modal" role="dialog" aria-modal="true" on:click|stopPropagation>
      <div class="modal-header">
        <h2>{isEditing ? 'Edit' : 'Add'} Password</h2>
        <button class="close-btn" on:click={cancel}>×</button>
      </div>
      
      <form class="form" on:submit|preventDefault={save}>
        <div class="field">
          <label for="title">Title *</label>
          <input
            id="title"
            type="text"
            bind:value={title}
            placeholder="e.g., Gmail, Facebook"
            required
          />
        </div>
        
        <div class="field">
          <label for="username">Username *</label>
          <input
            id="username"
            type="text"
            bind:value={username}
            placeholder="Username or email"
            required
          />
        </div>
        
        <div class="field">
          <label for="password">Password *</label>
          <div class="password-field">
            <input
              id="password"
              type="text"
              bind:value={password}
              placeholder="Password"
              required
            />
            <button type="button" class="generate-btn" on:click={generatePassword}>
              Generate
            </button>
          </div>
        </div>
        
        <div class="field">
          <label for="note">Note</label>
          <textarea
            id="note"
            bind:value={note}
            placeholder="Optional note"
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-btn" on:click={cancel}>
            Cancel
          </button>
          <button type="submit" class="save-btn" disabled={!title.trim() || !username.trim() || !password.trim()}>
            {isEditing ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  </button>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1000;
    border: none;
    cursor: pointer;
  }
  
  .modal {
    background: var(--bg-primary);
    border-radius: 1rem;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    cursor: default;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  
  h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.3rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
  }
  
  .close-btn:hover {
    background: var(--bg-hover);
  }
  
  .form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  input, textarea {
    padding: 0.75rem;
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    font-size: 1rem;
    background: var(--bg-secondary);
    color: var(--text-primary);
    transition: border-color 0.2s;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  .password-field {
    display: flex;
    gap: 0.5rem;
  }
  
  .password-field input {
    flex: 1;
  }
  
  .generate-btn {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: background-color 0.2s;
  }
  
  .generate-btn:hover {
    background: var(--bg-hover);
  }
  
  textarea {
    resize: vertical;
    min-height: 4rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .cancel-btn, .save-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-btn {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
  
  .cancel-btn:hover {
    background: var(--bg-hover);
  }
  
  .save-btn {
    background: var(--primary);
    color: white;
    font-weight: 600;
  }
  
  .save-btn:hover:not(:disabled) {
    background: var(--primary-dark);
  }
  
  .save-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>