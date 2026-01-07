<script>
  import { onMount, onDestroy } from 'svelte';
  import UnlockScreen from '$lib/components/UnlockScreen.svelte';
  import VaultItemComponent from '$lib/components/VaultItem.svelte';
  import AddEditForm from '$lib/components/AddEditForm.svelte';
  import ReminderBanner from '$lib/components/ReminderBanner.svelte';
  import InstallPrompt from '$lib/components/InstallPrompt.svelte';
  import { StorageEngine } from '$lib/storage';
  import { 
    isUnlocked, vaultItems, searchQuery, categoryFilter, darkMode, showAddForm, editingItem, 
    resetAutoLock, lock, biometricEnabled, appState, showReminder,
    initializeAppStateMonitoring, initializeActivityTracking, cleanup,
    startCriticalOperation, endCriticalOperation
  } from '$lib/stores';
  import { CryptoEngine } from '$lib/crypto';
  import { BiometricAuth } from '$lib/biometric';
  import { BackupManager } from '$lib/backup';
  import { RestoreManager } from '$lib/restore';
  import { ReminderSystem } from '$lib/reminders';
  import { AutoBackupService } from '$lib/auto-backup';
  import { logAppInit, suppressExtensionErrors } from '$lib/logger';
  
  let filteredItems = [];
  let successMessage = '';
  let successTimeout;
  
  const categoryFilters = [
    { value: 'all', label: 'All', icon: '🔐', count: 0 },
    { value: 'email', label: 'Email', icon: '📧', count: 0 },
    { value: 'banking', label: 'Banking', icon: '🏦', count: 0 },
    { value: 'app', label: 'App', icon: '📱', count: 0 },
    { value: 'website', label: 'Website', icon: '🌐', count: 0 },
    { value: 'work', label: 'Work', icon: '💼', count: 0 },
    { value: 'games', label: 'Games', icon: '🎮', count: 0 },
    { value: 'other', label: 'Other', icon: '📌', count: 0 }
  ];
  
  // Update category counts
  $: {
    categoryFilters.forEach(filter => {
      if (filter.value === 'all') {
        filter.count = $vaultItems.length;
      } else {
        filter.count = $vaultItems.filter(item => (item.category || 'other') === filter.value).length;
      }
    });
  }
  
  // Debounced search query
  let searchInput = '';
  let searchDebounceTimer;
  
  function handleSearchInput(event) {
    searchInput = event.target.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      searchQuery.set(searchInput);
    }, 300); // 300ms debounce
  }
  
  // Reactive statement to filter items by search and category
  $: {
    let items = $vaultItems;
    
    // Filter by category
    if ($categoryFilter !== 'all') {
      items = items.filter(item => (item.category || 'other') === $categoryFilter);
    }
    
    // Filter by search query
    if ($searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes($searchQuery.toLowerCase())
      );
    }
    
    filteredItems = items;
    
    console.log('[Main] Filtered items updated:', {
      total: $vaultItems.length,
      filtered: filteredItems.length,
      searchQuery: $searchQuery,
      categoryFilter: $categoryFilter
    });
  }
  let fileInput;
  
  async function saveItem(item) {
    console.log('[Main] saveItem called:', {
      id: item.id,
      title: item.title,
      isNew: !$vaultItems.find(i => i.id === item.id)
    });
    
    // Start critical operation to prevent locking during save
    startCriticalOperation();
    
    try {
      const currentItems = $vaultItems;
      const existingIndex = currentItems.findIndex(i => i.id === item.id);
      
      let updatedItems;
      const isNewItem = existingIndex < 0;
      
      if (existingIndex >= 0) {
        console.log('[Main] Updating existing item at index:', existingIndex);
        updatedItems = [...currentItems];
        updatedItems[existingIndex] = item;
      } else {
        console.log('[Main] Adding new item');
        updatedItems = [...currentItems, item];
      }
      
      console.log('[Main] Updated items count:', updatedItems.length);
      
      // Use cached master password from session
      const masterPassword = sessionStorage.getItem('pv_master_key');
      if (!masterPassword) {
        console.log('[Main] No cached master password, prompting user');
        const inputPassword = prompt('Enter master password to save changes:');
        if (!inputPassword) {
          endCriticalOperation();
          return;
        }
        
        try {
          // Test password by trying to decrypt current vault
          await StorageEngine.loadVault(inputPassword);
          sessionStorage.setItem('pv_master_key', inputPassword);
          await StorageEngine.saveVault(updatedItems, inputPassword);
          console.log('[Main] Vault saved to storage');
          
          // CRITICAL: Update store IMMEDIATELY after successful save, BEFORE auto-backup
          console.log('[Main] Updating vaultItems store with', updatedItems.length, 'items');
          vaultItems.set(updatedItems);
          console.log('[Main] Store updated');
          
          // Create auto-backup (non-critical, can fail)
          try {
            await AutoBackupService.createBackup(updatedItems, inputPassword);
            console.log('[Main] Auto-backup created');
          } catch (backupError) {
            console.error('[Main] Auto-backup failed (non-critical):', backupError);
          }
          
          console.log('[Main] Vault saved successfully');
        } catch (error) {
          console.error('[Main] Save failed:', error);
          alert('Failed to save: Invalid master password');
          endCriticalOperation();
          return;
        }
      } else {
        try {
          console.log('[Main] Saving with cached password');
          await StorageEngine.saveVault(updatedItems, masterPassword);
          console.log('[Main] Vault saved to storage');
          
          // CRITICAL: Update store IMMEDIATELY after successful save, BEFORE auto-backup
          console.log('[Main] Updating vaultItems store with', updatedItems.length, 'items');
          vaultItems.set(updatedItems);
          console.log('[Main] Store updated');
          
          // Create auto-backup (non-critical, can fail)
          try {
            await AutoBackupService.createBackup(updatedItems, masterPassword);
            console.log('[Main] Auto-backup created');
          } catch (backupError) {
            console.error('[Main] Auto-backup failed (non-critical):', backupError);
            // Continue even if auto-backup fails
          }
          
          console.log('[Main] Vault saved successfully');
        } catch (error) {
          console.error('[Main] Save failed with cached password:', error);
          // Master password might have changed, ask for new one
          sessionStorage.removeItem('pv_master_key');
          const inputPassword = prompt('Master password expired. Enter password to save:');
          if (!inputPassword) {
            console.log('[Main] User cancelled password prompt');
            endCriticalOperation();
            return;
          }
          
          try {
            await StorageEngine.saveVault(updatedItems, inputPassword);
            sessionStorage.setItem('pv_master_key', inputPassword);
            console.log('[Main] Vault saved to storage');
            
            // CRITICAL: Update store IMMEDIATELY after successful save, BEFORE auto-backup
            console.log('[Main] Updating vaultItems store with', updatedItems.length, 'items');
            vaultItems.set(updatedItems);
            console.log('[Main] Store updated');
            
            // Create auto-backup (non-critical, can fail)
            try {
              await AutoBackupService.createBackup(updatedItems, inputPassword);
              console.log('[Main] Auto-backup created');
            } catch (backupError) {
              console.error('[Main] Auto-backup failed (non-critical):', backupError);
            }
            
            console.log('[Main] Vault saved successfully after password refresh');
          } catch (error) {
            console.error('[Main] Save failed after password refresh:', error);
            alert('Failed to save: Invalid master password');
            endCriticalOperation();
            return;
          }
        }
      }
      
      resetAutoLock();
      
      // Track password addition for reminders
      if (isNewItem) {
        ReminderSystem.recordPasswordAdd();
        checkReminders();
      }
      
      // Show success feedback
      showSuccessMessage(isNewItem ? 'Password added successfully' : 'Password updated successfully');
      console.log('[Main] Save complete, store updated');
    } finally {
      // Always end critical operation, even if there's an error
      endCriticalOperation();
    }
  }
  
  async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    console.log('[Main] Delete item:', id);
    
    // Start critical operation to prevent locking during delete
    startCriticalOperation();
    
    try {
      // Use cached master password from session
      const masterPassword = sessionStorage.getItem('pv_master_key');
      if (!masterPassword) {
        const inputPassword = prompt('Enter master password to confirm deletion:');
        if (!inputPassword) {
          endCriticalOperation();
          return;
        }
        
        try {
          // Test password by trying to decrypt current vault
          await StorageEngine.loadVault(inputPassword);
          sessionStorage.setItem('pv_master_key', inputPassword);
          const updatedItems = $vaultItems.filter(item => item.id !== id);
          await StorageEngine.saveVault(updatedItems, inputPassword);
          vaultItems.set(updatedItems);
          console.log('[Main] Item deleted, vault updated');
        } catch (error) {
          console.error('[Main] Delete failed:', error);
          alert('Failed to delete: Invalid master password');
          endCriticalOperation();
          return;
        }
      } else {
        try {
          const updatedItems = $vaultItems.filter(item => item.id !== id);
          console.log('[Main] Deleting item, new count:', updatedItems.length);
          await StorageEngine.saveVault(updatedItems, masterPassword);
          vaultItems.set(updatedItems);
          console.log('[Main] Item deleted, vault updated');
        } catch (error) {
          console.error('[Main] Delete failed:', error);
          // Master password might have changed, ask for new one
          sessionStorage.removeItem('pv_master_key');
          const inputPassword = prompt('Master password expired. Enter password to delete:');
          if (!inputPassword) {
            endCriticalOperation();
            return;
          }
          
          try {
            const updatedItems = $vaultItems.filter(item => item.id !== id);
            await StorageEngine.saveVault(updatedItems, inputPassword);
            sessionStorage.setItem('pv_master_key', inputPassword);
            vaultItems.set(updatedItems);
            console.log('[Main] Item deleted after password refresh');
          } catch (error) {
            console.error('[Main] Delete failed after password refresh:', error);
            alert('Failed to delete: Invalid master password');
            endCriticalOperation();
            return;
          }
        }
      }
      
      resetAutoLock();
      
      // Show success feedback
      showSuccessMessage('Password deleted successfully');
    } finally {
      // Always end critical operation
      endCriticalOperation();
    }
  }
  
  async function exportVault() {
    console.log('[Main] Export vault initiated');
    
    const masterPassword = sessionStorage.getItem('pv_master_key');
    if (!masterPassword) {
      console.log('[Main] No cached master password, prompting user');
      const inputPassword = prompt('Enter master password to export vault:');
      if (!inputPassword) return;
      
      try {
        // Test password first
        await StorageEngine.loadVault(inputPassword);
        sessionStorage.setItem('pv_master_key', inputPassword);
        const blob = await BackupManager.quickExport($vaultItems, inputPassword);
        const filename = BackupManager.generateFileName();
        BackupManager.triggerDownload(blob, filename);
        
        // Record backup for reminders
        ReminderSystem.recordBackup();
        showReminder.set(null);
        
        showSuccessMessage('Vault exported successfully');
        console.log('[Main] Export successful:', filename);
      } catch (error) {
        console.error('[Main] Export failed:', error);
        alert('Export failed: Invalid master password');
      }
    } else {
      try {
        console.log('[Main] Using cached master password');
        const blob = await BackupManager.quickExport($vaultItems, masterPassword);
        const filename = BackupManager.generateFileName();
        BackupManager.triggerDownload(blob, filename);
        
        // Record backup for reminders
        ReminderSystem.recordBackup();
        showReminder.set(null);
        
        showSuccessMessage('Vault exported successfully');
        console.log('[Main] Export successful:', filename);
      } catch (error) {
        console.error('[Main] Export failed with cached password:', error);
        sessionStorage.removeItem('pv_master_key');
        const inputPassword = prompt('Master password expired. Enter password to export:');
        if (!inputPassword) return;
        
        try {
          const blob = await BackupManager.quickExport($vaultItems, inputPassword);
          const filename = BackupManager.generateFileName();
          sessionStorage.setItem('pv_master_key', inputPassword);
          BackupManager.triggerDownload(blob, filename);
          
          // Record backup for reminders
          ReminderSystem.recordBackup();
          showReminder.set(null);
          
          showSuccessMessage('Vault exported successfully');
          console.log('[Main] Export successful after password refresh:', filename);
        } catch (error) {
          console.error('[Main] Export failed after password refresh:', error);
          alert('Export failed: Invalid master password');
        }
      }
    }
  }
  
  function downloadVaultFile(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pocketvault-backup-${new Date().toISOString().split('T')[0]}.vault`;
    a.click();
    URL.revokeObjectURL(url);
    showSuccessMessage('Vault exported successfully');
  }
  
  async function importVault() {
    fileInput.click();
  }
  
  async function handleFileImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    
    console.log('[Main] Import initiated:', file.name);
    
    // Validate file first
    const validation = await RestoreManager.validateVaultFile(file);
    if (!validation.valid) {
      console.error('[Main] Import validation failed:', validation.error);
      alert(`Import failed: ${validation.error}`);
      fileInput.value = '';
      return;
    }
    
    console.log('[Main] File validation passed');
    
    const masterPassword = prompt('Enter master password for the vault file:');
    if (!masterPassword) return;
    
    try {
      const result = await RestoreManager.importVault(file, masterPassword, $vaultItems);
      
      console.log('[Main] Import successful, merge stats:', result.stats);
      
      // Use cached master password for saving
      const currentMasterPassword = sessionStorage.getItem('pv_master_key');
      if (!currentMasterPassword) {
        console.log('[Main] No cached password, prompting for save');
        const savePassword = prompt('Enter master password to save merged vault:');
        if (!savePassword) return;
        
        try {
          await StorageEngine.saveVault(result.items, savePassword);
          sessionStorage.setItem('pv_master_key', savePassword);
          
          // Create auto-backup
          await AutoBackupService.createBackup(result.items, savePassword);
        } catch (error) {
          console.error('[Main] Save failed:', error);
          alert('Failed to save merged vault: Invalid master password');
          return;
        }
      } else {
        try {
          console.log('[Main] Saving with cached password');
          await StorageEngine.saveVault(result.items, currentMasterPassword);
          
          // Create auto-backup
          await AutoBackupService.createBackup(result.items, currentMasterPassword);
        } catch (error) {
          console.error('[Main] Save failed with cached password:', error);
          sessionStorage.removeItem('pv_master_key');
          const savePassword = prompt('Master password expired. Enter password to save:');
          if (!savePassword) return;
          
          try {
            await StorageEngine.saveVault(result.items, savePassword);
            sessionStorage.setItem('pv_master_key', savePassword);
            
            // Create auto-backup
            await AutoBackupService.createBackup(result.items, savePassword);
          } catch (error) {
            console.error('[Main] Save failed after password refresh:', error);
            alert('Failed to save merged vault: Invalid master password');
            return;
          }
        }
      }
      
      vaultItems.set(result.items);
      showSuccessMessage(
        `Import successful: ${result.stats.newCount} new, ${result.stats.updatedCount} updated, ${result.stats.unchangedCount} unchanged`
      );
      console.log('[Main] Import complete, vault updated');
    } catch (error) {
      console.error('[Main] Import failed:', error);
      alert(`Import failed: ${error.message}`);
    }
    
    // Reset file input
    fileInput.value = '';
  }
  
  function showSuccessMessage(message) {
    successMessage = message;
    clearTimeout(successTimeout);
    successTimeout = setTimeout(() => {
      successMessage = '';
    }, 3000);
  }
  
  function checkReminders() {
    console.log('[Main] Checking reminders...');
    const reminderType = ReminderSystem.shouldShowReminder();
    if (reminderType) {
      console.log('[Main] Showing reminder:', reminderType);
      showReminder.set(reminderType);
      ReminderSystem.markShownThisSession();
    } else {
      console.log('[Main] No reminder needed');
    }
  }
  
  function addNew() {
    console.log('[Main] Add new password clicked');
    showAddForm.set(true);
    editingItem.set(null); // Clear any editing state
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
    // Initialize logging
    logAppInit();
    suppressExtensionErrors();
    
    initializeAppStateMonitoring();
    initializeActivityTracking();
    
    // Check for reminders on mount
    checkReminders();
    
    // Reset reminder session flag
    ReminderSystem.resetSession();
    
    // Debug: Watch vaultItems changes
    vaultItems.subscribe(items => {
      console.log('[Main] vaultItems store changed:', {
        count: items.length,
        items: items.map(i => ({ id: i.id, title: i.title }))
      });
    });
    
    // Debug: Watch editingItem changes
    editingItem.subscribe(item => {
      console.log('[Main] editingItem store changed:', item ? { id: item.id, title: item.title } : null);
    });
    
    // Debug: Watch showAddForm changes
    showAddForm.subscribe(show => {
      console.log('[Main] showAddForm store changed:', show);
    });
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
      {#if successMessage}
        <div class="glass animate-fade-in" style="background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; padding: 0.875rem; border-radius: 12px; font-size: 0.875rem; text-align: center; margin-bottom: 1rem;">
          {successMessage}
        </div>
      {/if}
      
      <ReminderBanner onBackupNow={exportVault} />
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 0.75rem;">
        <h1 style="margin: 0; font-size: 1.5rem; font-weight: 600; flex-shrink: 0;" class="text-glass">🔒 PocketVault</h1>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: flex-end;">
          <button class="glass-btn haptic-light" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" on:click={toggleTheme} title="Toggle theme">
            <span style="font-size: 1.25rem;">{$darkMode ? '☀️' : '🌙'}</span>
          </button>
          {#if $biometricEnabled}
            <button class="glass-btn-primary" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" on:click={toggleBiometric} title="Biometric enabled">
              <span style="font-size: 1.25rem;">{BiometricAuth.getBiometricType() === 'FaceID' ? '👤' : '👆'}</span>
            </button>
          {/if}
          <button class="glass-btn haptic-light" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" on:click={exportVault} title="Export vault">
            <span style="font-size: 1.25rem;">📤</span>
          </button>
          <button class="glass-btn haptic-light" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" on:click={importVault} title="Import vault">
            <span style="font-size: 1.25rem;">📥</span>
          </button>
          <button class="glass-btn haptic-medium" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" on:click={lock} title="Lock vault">
            <span style="font-size: 1.25rem;">🔒</span>
          </button>
        </div>
      </div>
      
      <div>
        <input
          type="text"
          placeholder="Search passwords..."
          value={searchInput}
          on:input={handleSearchInput}
          class="glass-input"
          style="width: 100%; padding: 0.875rem; border-radius: 14px;"
        />
      </div>
    </header>
    
    <main style="padding: 1rem; padding-bottom: 7rem;">
      <div style="max-width: 100%; margin: 0 auto;">
        {#if filteredItems.length === 0}
          <div style="text-align: center; padding: 3rem 1rem;" class="text-glass-secondary">
            {#if $vaultItems.length === 0}
              <div style="font-size: 4rem; margin-bottom: 1rem;">🔐</div>
              <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;" class="text-glass">Your vault is empty</h2>
              <p style="margin: 0; font-size: 1rem;">Add your first password to get started</p>
            {:else if $searchQuery || $categoryFilter !== 'all'}
              <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
              <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;" class="text-glass">No matches found</h2>
              <p style="margin: 0; font-size: 1rem;">Try a different search or filter</p>
            {:else}
              <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
              <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;" class="text-glass">No matches found</h2>
              <p style="margin: 0; font-size: 1rem;">Try a different search term</p>
            {/if}
          </div>
        {:else}
          <div style="display: flex; flex-direction: column; gap: 0.875rem;">
            {#each filteredItems as item (item.id)}
              <VaultItemComponent {item} onDelete={deleteItem} />
            {/each}
          </div>
        {/if}
      </div>
    </main>
    
    <!-- Bottom Navigation with Category Filters -->
    <nav class="bottom-nav">
      <div class="bottom-nav-scroll">
        {#each categoryFilters as filter}
          <button
            class="filter-chip haptic-light filter-{filter.value} {$categoryFilter === filter.value ? 'active' : ''}"
            on:click={() => categoryFilter.set(filter.value)}
          >
            <span>{filter.icon}</span>
            <span>#{filter.label}</span>
            {#if filter.count > 0}
              <span style="opacity: 0.7; font-size: 0.75rem;">({filter.count})</span>
            {/if}
          </button>
        {/each}
      </div>
    </nav>
    
    <div style="position: fixed; bottom: 6.5rem; right: 1.5rem; z-index: 100;">
      <button class="glass-fab haptic-heavy" on:click={addNew} title="Add password">
        +
      </button>
    </div>
    
    <AddEditForm onSave={saveItem} />
    
    <!-- PWA Install Prompt -->
    <InstallPrompt />
    
    <input
      type="file"
      accept=".vault"
      bind:this={fileInput}
      on:change={handleFileImport}
      style="display: none;"
    />
  </div>
{/if}

