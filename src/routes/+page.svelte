<script>
  import { onMount, onDestroy } from 'svelte';
  import UnlockScreen from '$lib/components/UnlockScreen.svelte';
  import VaultItemComponent from '$lib/components/VaultItem.svelte';
  import AddEditForm from '$lib/components/AddEditForm.svelte';
  import { StorageEngine } from '$lib/storage';
  import { 
    isUnlocked, vaultItems, searchQuery, darkMode, showAddForm, editingItem, 
    resetAutoLock, lock, biometricEnabled, appState,
    initializeAppStateMonitoring, initializeActivityTracking, cleanup
  } from '$lib/stores';
  import { CryptoEngine } from '$lib/crypto';
  import { BiometricAuth } from '$lib/biometric';
  
  let filteredItems = [];
  let fileInput;
  
  $: filteredItems = $vaultItems.filter(item => 
    !$searchQuery || 
    item.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
    item.username.toLowerCase().includes($searchQuery.toLowerCase())
  );
  
  async function saveItem(item) {
    const currentItems = $vaultItems;
    const existingIndex = currentItems.findIndex(i => i.id === item.id);
    
    let updatedItems;
    if (existingIndex >= 0) {
      updatedItems = [...currentItems];
      updatedItems[existingIndex] = item;
    } else {
      updatedItems = [...currentItems, item];
    }
    
    // Get master password from session (in real app, you'd handle this more securely)
    const masterPassword = prompt('Enter master password to save changes:');
    if (!masterPassword) return;
    
    try {
      await StorageEngine.saveVault(updatedItems, masterPassword);
      vaultItems.set(updatedItems);
      resetAutoLock();
    } catch (error) {
      alert('Failed to save: Invalid master password');
    }
  }
  
  async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const masterPassword = prompt('Enter master password to confirm deletion:');
    if (!masterPassword) return;
    
    try {
      const updatedItems = $vaultItems.filter(item => item.id !== id);
      await StorageEngine.saveVault(updatedItems, masterPassword);
      vaultItems.set(updatedItems);
      resetAutoLock();
    } catch (error) {
      alert('Failed to delete: Invalid master password');
    }
  }
  
  async function exportVault() {
    const masterPassword = prompt('Enter master password to export vault:');
    if (!masterPassword) return;
    
    try {
      const blob = await StorageEngine.exportVault(masterPassword);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pocketvault-backup-${new Date().toISOString().split('T')[0]}.vault`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Export failed: Invalid master password');
    }
  }
  
  async function importVault() {
    fileInput.click();
  }
  
  async function handleFileImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    
    const masterPassword = prompt('Enter master password for the vault file:');
    if (!masterPassword) return;
    
    try {
      const importedItems = await StorageEngine.importVault(file, masterPassword);
      
      // Merge with existing items
      const existingItems = $vaultItems;
      const mergedItems = [...existingItems];
      
      for (const item of importedItems) {
        const existingIndex = mergedItems.findIndex(i => i.id === item.id);
        if (existingIndex >= 0) {
          mergedItems[existingIndex] = item;
        } else {
          mergedItems.push(item);
        }
      }
      
      const savePassword = prompt('Enter master password to save merged vault:');
      if (!savePassword) return;
      
      await StorageEngine.saveVault(mergedItems, savePassword);
      vaultItems.set(mergedItems);
      alert(`Imported ${importedItems.length} items successfully`);
    } catch (error) {
      alert('Import failed: Invalid file or password');
    }
    
    // Reset file input
    fileInput.value = '';
  }
  
  function addNew() {
    showAddForm.set(true);
  }
  
  function toggleTheme() {
    darkMode.update(d => !d);
  }
  
  function toggleBiometric() {
    if ($biometricEnabled) {
      BiometricAuth.disable();
      biometricEnabled.set(false);
    } else {
      // Would trigger biometric setup flow
      alert('Biometric setup would be triggered here');
    }
  }
  
  // Initialize enhanced monitoring and activity tracking
  onMount(() => {
    initializeAppStateMonitoring();
    initializeActivityTracking();
  });
  
  onDestroy(() => {
    cleanup();
  });
</script>

<svelte:head>
  <title>PocketVault - Secure Password Manager</title>
</svelte:head>

{#if !$isUnlocked}
  <UnlockScreen />
{:else}
  <div class="app">
    <header class="header">
      <div class="header-content">
        <h1 class="app-title">🔒 PocketVault</h1>
        <div class="header-actions">
          <button class="icon-btn" on:click={toggleTheme} title="Toggle theme">
            {$darkMode ? '☀️' : '🌙'}
          </button>
          {#if $biometricEnabled}
            <button class="icon-btn biometric-enabled" on:click={toggleBiometric} title="Biometric enabled">
              {BiometricAuth.getBiometricType() === 'FaceID' ? '👤' : '👆'}
            </button>
          {/if}
          <button class="icon-btn" on:click={exportVault} title="Export vault">
            📤
          </button>
          <button class="icon-btn" on:click={importVault} title="Import vault">
            📥
          </button>
          <button class="icon-btn" on:click={lock} title="Lock vault">
            🔒
          </button>
        </div>
      </div>
      
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search passwords..."
          bind:value={$searchQuery}
          class="search-input"
        />
      </div>
    </header>
    
    <main class="main">
      <div class="container">
        {#if filteredItems.length === 0}
          <div class="empty-state">
            {#if $vaultItems.length === 0}
              <div class="empty-icon">🔐</div>
              <h2>Your vault is empty</h2>
              <p>Add your first password to get started</p>
            {:else}
              <div class="empty-icon">🔍</div>
              <h2>No matches found</h2>
              <p>Try a different search term</p>
            {/if}
          </div>
        {:else}
          <div class="items-list">
            {#each filteredItems as item (item.id)}
              <VaultItemComponent {item} onDelete={deleteItem} />
            {/each}
          </div>
        {/if}
      </div>
    </main>
    
    <div class="fab">
      <button class="fab-btn" on:click={addNew} title="Add password">
        +
      </button>
    </div>
    
    <AddEditForm onSave={saveItem} />
    
    <input
      type="file"
      accept=".vault"
      bind:this={fileInput}
      on:change={handleFileImport}
      style="display: none;"
    />
  </div>
{/if}

<style>
  .app {
    min-height: 100vh;
    background: var(--bg-primary);
  }
  
  .header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .app-title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .icon-btn {
    background: var(--bg-tertiary);
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .icon-btn:hover {
    background: var(--bg-hover);
  }
  
  .biometric-enabled {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .biometric-enabled:hover {
    opacity: 0.9;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    font-size: 1rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: border-color 0.2s;
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  .main {
    padding: 1rem;
    padding-bottom: 5rem;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--text-secondary);
  }
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h2 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }
  
  .empty-state p {
    margin: 0;
  }
  
  .items-list {
    display: flex;
    flex-direction: column;
  }
  
  .fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
  }
  
  .fab-btn {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    font-size: 1.5rem;
    font-weight: 300;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .fab-btn:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
  }
  
  .fab-btn:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    .header {
      padding: 0.75rem;
    }
    
    .main {
      padding: 0.75rem;
      padding-bottom: 5rem;
    }
    
    .fab {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
</style>