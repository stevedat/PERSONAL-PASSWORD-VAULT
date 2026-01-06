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
  <div style="min-height: 100vh;">
    <header class="glass-header">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h1 style="margin: 0; font-size: 1.25rem; font-weight: 600;" class="text-glass">🔒 PocketVault</h1>
        <div style="display: flex; gap: 0.5rem;">
          <button class="glass-btn haptic-light" style="padding: 0.5rem; border-radius: 0.5rem;" on:click={toggleTheme} title="Toggle theme">
            {$darkMode ? '☀️' : '🌙'}
          </button>
          {#if $biometricEnabled}
            <button class="glass-btn-primary" style="padding: 0.5rem; border-radius: 0.5rem;" on:click={toggleBiometric} title="Biometric enabled">
              {BiometricAuth.getBiometricType() === 'FaceID' ? '👤' : '👆'}
            </button>
          {/if}
          <button class="glass-btn haptic-light" style="padding: 0.5rem; border-radius: 0.5rem;" on:click={exportVault} title="Export vault">
            📤
          </button>
          <button class="glass-btn haptic-light" style="padding: 0.5rem; border-radius: 0.5rem;" on:click={importVault} title="Import vault">
            📥
          </button>
          <button class="glass-btn haptic-medium" style="padding: 0.5rem; border-radius: 0.5rem;" on:click={lock} title="Lock vault">
            🔒
          </button>
        </div>
      </div>
      
      <div>
        <input
          type="text"
          placeholder="Search passwords..."
          bind:value={$searchQuery}
          class="glass-input"
          style="width: 100%; padding: 0.75rem;"
        />
      </div>
    </header>
    
    <main style="padding: 1rem; padding-bottom: 5rem;">
      <div style="max-width: 600px; margin: 0 auto;">
        {#if filteredItems.length === 0}
          <div style="text-align: center; padding: 3rem 1rem;" class="text-glass-secondary">
            {#if $vaultItems.length === 0}
              <div style="font-size: 3rem; margin-bottom: 1rem;">🔐</div>
              <h2 style="margin: 0 0 0.5rem 0;" class="text-glass">Your vault is empty</h2>
              <p style="margin: 0;">Add your first password to get started</p>
            {:else}
              <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
              <h2 style="margin: 0 0 0.5rem 0;" class="text-glass">No matches found</h2>
              <p style="margin: 0;">Try a different search term</p>
            {/if}
          </div>
        {:else}
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            {#each filteredItems as item (item.id)}
              <VaultItemComponent {item} onDelete={deleteItem} />
            {/each}
          </div>
        {/if}
      </div>
    </main>
    
    <div style="position: fixed; bottom: 2rem; right: 2rem; z-index: 100;">
      <button class="glass-fab haptic-heavy" on:click={addNew} title="Add password">
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

