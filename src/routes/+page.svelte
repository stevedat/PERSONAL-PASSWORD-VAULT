<script>
  import { onMount, onDestroy } from 'svelte';
  import UnlockScreen from '$lib/components/UnlockScreen.svelte';
  import VaultItemComponent from '$lib/components/VaultItem.svelte';
  import AddEditForm from '$lib/components/AddEditForm.svelte';
  import ReminderBanner from '$lib/components/ReminderBanner.svelte';
  import { StorageEngine } from '$lib/storage';
  import { 
    isUnlocked, vaultItems, searchQuery, darkMode, showAddForm, editingItem, 
    resetAutoLock, lock, biometricEnabled, appState, showReminder,
    initializeAppStateMonitoring, initializeActivityTracking, cleanup
  } from '$lib/stores';
  import { CryptoEngine } from '$lib/crypto';
  import { BiometricAuth } from '$lib/biometric';
  import { BackupManager } from '$lib/backup';
  import { RestoreManager } from '$lib/restore';
  import { ReminderSystem } from '$lib/reminders';
  import { AutoBackupService } from '$lib/auto-backup';
  
  let filteredItems = [];
  let fileInput;
  let successMessage = '';
  let successTimeout;
  
  $: filteredItems = $vaultItems.filter(item => 
    !$searchQuery || 
    item.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
    item.username.toLowerCase().includes($searchQuery.toLowerCase())
  );
  
  async function saveItem(item) {
    const currentItems = $vaultItems;
    const existingIndex = currentItems.findIndex(i => i.id === item.id);
    
    let updatedItems;
    const isNewItem = existingIndex < 0;
    
    if (existingIndex >= 0) {
      updatedItems = [...currentItems];
      updatedItems[existingIndex] = item;
    } else {
      updatedItems = [...currentItems, item];
    }
    
    // Use cached master password from session
    const masterPassword = sessionStorage.getItem('pv_master_key');
    if (!masterPassword) {
      const inputPassword = prompt('Enter master password to save changes:');
      if (!inputPassword) return;
      
      try {
        // Test password by trying to decrypt current vault
        await StorageEngine.loadVault(inputPassword);
        sessionStorage.setItem('pv_master_key', inputPassword);
        await StorageEngine.saveVault(updatedItems, inputPassword);
        
        // Create auto-backup
        await AutoBackupService.createBackup(updatedItems, inputPassword);
      } catch (error) {
        alert('Failed to save: Invalid master password');
        return;
      }
    } else {
      try {
        await StorageEngine.saveVault(updatedItems, masterPassword);
        
        // Create auto-backup
        await AutoBackupService.createBackup(updatedItems, masterPassword);
      } catch (error) {
        // Master password might have changed, ask for new one
        sessionStorage.removeItem('pv_master_key');
        const inputPassword = prompt('Master password expired. Enter password to save:');
        if (!inputPassword) return;
        
        try {
          await StorageEngine.saveVault(updatedItems, inputPassword);
          sessionStorage.setItem('pv_master_key', inputPassword);
          
          // Create auto-backup
          await AutoBackupService.createBackup(updatedItems, inputPassword);
        } catch (error) {
          alert('Failed to save: Invalid master password');
          return;
        }
      }
    }
    
    vaultItems.set(updatedItems);
    resetAutoLock();
    
    // Track password addition for reminders
    if (isNewItem) {
      ReminderSystem.recordPasswordAdd();
      checkReminders();
    }
    
    // Show success feedback
    showSuccessMessage('Password saved successfully');
  }
  
  async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    // Use cached master password from session
    const masterPassword = sessionStorage.getItem('pv_master_key');
    if (!masterPassword) {
      const inputPassword = prompt('Enter master password to confirm deletion:');
      if (!inputPassword) return;
      
      try {
        // Test password by trying to decrypt current vault
        await StorageEngine.loadVault(inputPassword);
        sessionStorage.setItem('pv_master_key', inputPassword);
        const updatedItems = $vaultItems.filter(item => item.id !== id);
        await StorageEngine.saveVault(updatedItems, inputPassword);
      } catch (error) {
        alert('Failed to delete: Invalid master password');
        return;
      }
    } else {
      try {
        const updatedItems = $vaultItems.filter(item => item.id !== id);
        await StorageEngine.saveVault(updatedItems, masterPassword);
      } catch (error) {
        // Master password might have changed, ask for new one
        sessionStorage.removeItem('pv_master_key');
        const inputPassword = prompt('Master password expired. Enter password to delete:');
        if (!inputPassword) return;
        
        try {
          const updatedItems = $vaultItems.filter(item => item.id !== id);
          await StorageEngine.saveVault(updatedItems, inputPassword);
          sessionStorage.setItem('pv_master_key', inputPassword);
        } catch (error) {
          alert('Failed to delete: Invalid master password');
          return;
        }
      }
    }
    
    const updatedItems = $vaultItems.filter(item => item.id !== id);
    vaultItems.set(updatedItems);
    resetAutoLock();
    
    // Show success feedback
    showSuccessMessage('Password deleted successfully');
  }
  
  async function exportVault() {
    const masterPassword = sessionStorage.getItem('pv_master_key');
    if (!masterPassword) {
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
      } catch (error) {
        alert('Export failed: Invalid master password');
      }
    } else {
      try {
        const blob = await BackupManager.quickExport($vaultItems, masterPassword);
        const filename = BackupManager.generateFileName();
        BackupManager.triggerDownload(blob, filename);
        
        // Record backup for reminders
        ReminderSystem.recordBackup();
        showReminder.set(null);
        
        showSuccessMessage('Vault exported successfully');
      } catch (error) {
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
        } catch (error) {
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
    
    // Validate file first
    const validation = await RestoreManager.validateVaultFile(file);
    if (!validation.valid) {
      alert(`Import failed: ${validation.error}`);
      fileInput.value = '';
      return;
    }
    
    const masterPassword = prompt('Enter master password for the vault file:');
    if (!masterPassword) return;
    
    try {
      const result = await RestoreManager.importVault(file, masterPassword, $vaultItems);
      
      // Use cached master password for saving
      const currentMasterPassword = sessionStorage.getItem('pv_master_key');
      if (!currentMasterPassword) {
        const savePassword = prompt('Enter master password to save merged vault:');
        if (!savePassword) return;
        
        try {
          await StorageEngine.saveVault(result.items, savePassword);
          sessionStorage.setItem('pv_master_key', savePassword);
          
          // Create auto-backup
          await AutoBackupService.createBackup(result.items, savePassword);
        } catch (error) {
          alert('Failed to save merged vault: Invalid master password');
          return;
        }
      } else {
        try {
          await StorageEngine.saveVault(result.items, currentMasterPassword);
          
          // Create auto-backup
          await AutoBackupService.createBackup(result.items, currentMasterPassword);
        } catch (error) {
          sessionStorage.removeItem('pv_master_key');
          const savePassword = prompt('Master password expired. Enter password to save:');
          if (!savePassword) return;
          
          try {
            await StorageEngine.saveVault(result.items, savePassword);
            sessionStorage.setItem('pv_master_key', savePassword);
            
            // Create auto-backup
            await AutoBackupService.createBackup(result.items, savePassword);
          } catch (error) {
            alert('Failed to save merged vault: Invalid master password');
            return;
          }
        }
      }
      
      vaultItems.set(result.items);
      showSuccessMessage(
        `Import successful: ${result.stats.newCount} new, ${result.stats.updatedCount} updated, ${result.stats.unchangedCount} unchanged`
      );
    } catch (error) {
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
    const reminderType = ReminderSystem.shouldShowReminder();
    if (reminderType) {
      showReminder.set(reminderType);
      ReminderSystem.markShownThisSession();
    }
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
    
    // Check for reminders on mount
    checkReminders();
    
    // Reset reminder session flag
    ReminderSystem.resetSession();
    
    // Add global error handler to suppress extension errors
    window.addEventListener('error', (event) => {
      if (event.error && event.error.message) {
        const message = event.error.message.toLowerCase();
        if (message.includes('extension') || 
            message.includes('frame') || 
            message.includes('dynamically imported module')) {
          event.preventDefault();
          return false;
        }
      }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && event.reason.message) {
        const message = event.reason.message.toLowerCase();
        if (message.includes('extension') || 
            message.includes('frame') || 
            message.includes('port closed') ||
            message.includes('dynamically imported module')) {
          event.preventDefault();
          return;
        }
      }
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
        <div class="glass animate-fade-in" style="background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; padding: 0.75rem; border-radius: 18px; font-size: 0.875rem; text-align: center; margin-bottom: 1rem;">
          {successMessage}
        </div>
      {/if}
      
      <ReminderBanner onBackupNow={exportVault} />
      
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

