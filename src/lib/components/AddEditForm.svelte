<script>
  import { onMount } from 'svelte';
  import { CryptoEngine } from '../crypto';
  import { showAddForm, editingItem } from '../stores';
  
  export let onSave;
  
  let title = '';
  let username = '';
  let password = '';
  let note = '';
  let isEditing = false;
  let editId = '';
  let lastEditingId = null; // Track last editing ID to prevent loops
  
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
      note: note.trim() || undefined
    };
    
    console.log('[AddEditForm] Saving item:', {
      id: item.id,
      isEditing,
      title: item.title
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
        <button class="glass-btn" style="padding: 0; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;" on:click={cancel}>×</button>
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
            <button type="button" class="glass-btn" style="padding: 0.75rem 1rem; white-space: nowrap;" on:click={generatePassword}>
              Generate
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
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
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
</style>