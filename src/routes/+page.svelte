<script>
  import { onMount, onDestroy } from 'svelte';
  import UnlockScreen from '$lib/components/UnlockScreen.svelte';
  import VaultItemComponent from '$lib/components/VaultItem.svelte';
  import AddEditForm from '$lib/components/AddEditForm.svelte';
  import { StorageEngine } from '$lib/storage';
  import {
    isUnlocked,
    vaultItems,
    searchQuery,
    categoryFilter,
    darkMode,
    showAddForm,
    editingItem,
    startAutoLock,
    resetAutoLock,
    lock,
    startCriticalOperation,
    endCriticalOperation
  } from '$lib/stores';
  import { suppressExtensionErrors } from '$lib/logger';

  let filteredItems = [];
  const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  $: {
    let items = $vaultItems;
    if ($searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes($searchQuery.toLowerCase())
      );
    }
    if ($categoryFilter !== 'all') {
      items = items.filter(item => (item.category || 'other') === $categoryFilter);
    }
    filteredItems = items;
  }

  async function saveItem(item) {
    startCriticalOperation();
    try {
      const currentItems = $vaultItems;
      const masterPassword = prompt('Enter master password to save:');
      if (!masterPassword) return;

      const existingIndex = currentItems.findIndex(i => i.id === item.id);
      let updatedItems;
      if (existingIndex >= 0) {
        updatedItems = [...currentItems];
        updatedItems[existingIndex] = item;
      } else {
        updatedItems = [...currentItems, item];
      }

      await StorageEngine.saveVault(updatedItems, masterPassword);
      vaultItems.set(updatedItems);
      resetAutoLock(LOCK_TIMEOUT);
    } finally {
      endCriticalOperation();
    }
  }

  async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    startCriticalOperation();
    try {
      const masterPassword = prompt('Enter master password to delete:');
      if (!masterPassword) return;

      const updatedItems = $vaultItems.filter(item => item.id !== id);
      await StorageEngine.saveVault(updatedItems, masterPassword);
      vaultItems.set(updatedItems);
      resetAutoLock(LOCK_TIMEOUT);
    } finally {
      endCriticalOperation();
    }
  }

  function addNew() {
    editingItem.set(null);
    showAddForm.set(true);
  }

  function toggleTheme() {
    darkMode.update(d => !d);
  }

  onMount(() => {
    suppressExtensionErrors();
    startAutoLock(LOCK_TIMEOUT);
    document.addEventListener('mousemove', () => resetAutoLock(LOCK_TIMEOUT));
    document.addEventListener('keypress', () => resetAutoLock(LOCK_TIMEOUT));
  });
</script>

<svelte:head>
  <title>PocketVault</title>
</svelte:head>

{#if !$isUnlocked}
  <UnlockScreen />
{:else}
  <div>
    <header>
      <h1>PocketVault</h1>
      <div class="controls">
        <input type="search" placeholder="Search..." bind:value={$searchQuery} />
        <select bind:value={$categoryFilter}>
          <option value="all">All</option>
          <option value="website">Website</option>
          <option value="app">App</option>
          <option value="other">Other</option>
        </select>
        <button on:click={addNew}>Add New</button>
        <button on:click={toggleTheme}>{$darkMode ? '☀️' : '🌙'}</button>
        <button on:click={lock}>Lock</button>
      </div>
    </header>

    <main>
      {#if filteredItems.length === 0}
        <p>No items to display.</p>
      {:else}
        <div class="items-grid">
          {#each filteredItems as item (item.id)}
            <VaultItemComponent {item} onDelete={deleteItem} />
          {/each}
        </div>
      {/if}
    </main>

    <AddEditForm onSave={saveItem} />
  </div>
{/if}
