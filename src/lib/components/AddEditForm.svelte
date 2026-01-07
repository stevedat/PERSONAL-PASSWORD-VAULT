<script>
  import { CryptoEngine } from '../crypto';
  import { showAddForm, editingItem } from '../stores';
  
  export let onSave;
  
  let title = '';
  let username = '';
  let password = '';
  let note = '';
  let category = 'other';
  let isEditing = false;
  let editId = '';
  let lastEditingId = null; // Track last editing ID to prevent loops
  
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
    } else if (!$editingItem && lastEditingId !== null) {
      // Reset when editingItem is cleared
      lastEditingId = null;
    }
  }
  
  // Watch for changes in showAddForm - only when not editing
  $: {
    if ($showAddForm && !$editingItem && !isEditing) {
      console.log('[AddEditForm] Adding new item');
      isEditing = false;
      editId = '';
      title = '';
      username = '';
      password = '';
      note = '';
      category = 'other';
      lastEditingId = null;
    }
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
    console.log('[AddEditForm] Cancelled');
    lastEditingId = null;
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
            <input
              id="password"
              type="text"
              bind:value={password}
              placeholder="Password"
              class="glass-input"
              style="flex: 1;"
              required
            />
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
</style>