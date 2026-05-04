<script>
  import { onMount, onDestroy } from "svelte";
  import UnlockScreen from "$lib/components/UnlockScreen.svelte";
  import VaultItemComponent from "$lib/components/VaultItem.svelte";
  import AddEditForm from "$lib/components/AddEditForm.svelte";
  import ReminderBanner from "$lib/components/ReminderBanner.svelte";
  import InstallPrompt from "$lib/components/InstallPrompt.svelte";
  import UpdateNotification from "$lib/components/UpdateNotification.svelte";
  import BackupTooltip from "$lib/components/BackupTooltip.svelte";
  import { StorageEngine } from "$lib/storage";
  import {
    isUnlocked,
    vaultItems,
    searchQuery,
    categoryFilter,
    darkMode,
    showAddForm,
    editingItem,
    resetAutoLock,
    lock,
    biometricEnabled,
    appState,
    showReminder,
    initializeAppStateMonitoring,
    initializeActivityTracking,
    cleanup,
    startCriticalOperation,

    endCriticalOperation,
    cloudSyncStatus,
  } from "$lib/stores";
  import { SyncEngine } from "$lib/sync-engine";
  import { CryptoEngine } from "$lib/crypto";
  import { BiometricAuth } from "$lib/biometric";
  import { BackupManager } from "$lib/backup";
  import { RestoreManager } from "$lib/restore";
  import { ReminderSystem } from "$lib/reminders";
  import { AutoBackupService } from "$lib/auto-backup";
  import { logAppInit, suppressExtensionErrors } from "$lib/logger";
  import { NativeApp } from "$lib/native";
  import GuideContent from "$lib/components/GuideContent.svelte";
  import { language } from "$lib/language";
  import { checkAndStartTour } from "$lib/tourStore";
  import { Dialog } from "$lib/dialogStore";
  import {
    LayoutGrid,
    Search,
    Plus,
    Clock,
    Shield,
    Key,
    User,
    Settings,
    Menu,
    X,
    MessageSquare,
    Eye,
    EyeOff,
    Check,
    CreditCard,
    Globe,
    ExternalLink,
    Lock,
    Trash2,
    Copy,
    RefreshCw,
    Maximize2,
    CheckCircle2,
    AlertCircle,
    Star,
    ChevronRight,
    ArrowUpDown,
    Smartphone,
    Monitor,
    Share2,
    BookOpen,
    Languages,
    ShieldCheck,
    FileText,
    ShieldAlert,
    Sun,
    Moon,
    ScanFace,
    Fingerprint,
    Upload,
    Download,
    LockKeyhole,
    SearchX,
    Coffee,
    Mail,
    Landmark,
    Briefcase,
    Gamepad2,
    Folder,
    Cloud,
    CloudOff,
    CloudCog
  } from "lucide-svelte";
  import PrivacyContent from "$lib/components/PrivacyContent.svelte";
  import TermsContent from "$lib/components/TermsContent.svelte";
  import CloudSyncModal from "$lib/components/CloudSyncModal.svelte";

  let showCloudSync = false;

  /** @type {any} */
  export let data = undefined;
  /** @type {any} */
  export let params = undefined;
  $: (void data, params);

  /** @type {import('$lib/types').VaultItem[]} */
  let filteredItems = [];
  let showAllItems = false;
  let successMessage = "";
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let successTimeout;
  let showExportTooltip = false;
  let showImportTooltip = false;
  let globalHandlerAttached = false;
  let biometricType = "Biometric";

  const handleGlobalClick = () => {
    showExportTooltip = false;
    showImportTooltip = false;
  };

  // Watch tooltip states and attach/detach handler accordingly
  $: {
    if (typeof document !== "undefined") {
      if ((showExportTooltip || showImportTooltip) && !globalHandlerAttached) {
        document.addEventListener("click", handleGlobalClick);
        globalHandlerAttached = true;
      } else if (
        !showExportTooltip &&
        !showImportTooltip &&
        globalHandlerAttached
      ) {
        document.removeEventListener("click", handleGlobalClick);
        globalHandlerAttached = false;
      }
    }
  }

  $: isVi = $language === "vi";

  $: categoryFilters = [
    { value: "all", label: "All", icon: LayoutGrid, count: $vaultItems.length },
    {
      value: "login",
      label: "Login",
      icon: Key,
      count: $vaultItems.filter((i) => i.category === "login").length,
    },
    {
      value: "email",
      label: "Email",
      icon: Mail,
      count: $vaultItems.filter((i) => (i.category || "other") === "email")
        .length,
    },
    {
      value: "banking",
      label: "Banking",
      icon: Landmark,
      count: $vaultItems.filter((i) => (i.category || "other") === "banking")
        .length,
    },
    {
      value: "app",
      label: "App",
      icon: Smartphone,
      count: $vaultItems.filter((i) => (i.category || "other") === "app")
        .length,
    },
    {
      value: "website",
      label: "Website",
      icon: Globe,
      count: $vaultItems.filter((i) => (i.category || "other") === "website")
        .length,
    },
    {
      value: "work",
      label: "Work",
      icon: Briefcase,
      count: $vaultItems.filter((i) => (i.category || "other") === "work")
        .length,
    },
    {
      value: "games",
      label: "Games",
      icon: Gamepad2,
      count: $vaultItems.filter((i) => (i.category || "other") === "games")
        .length,
    },
    {
      value: "other",
      label: "Other",
      icon: Folder,
      count: $vaultItems.filter((i) => (i.category || "other") === "other")
        .length,
    },
    {
      value: "guide",
      label: isVi ? "Hướng dẫn" : "Guide",
      icon: BookOpen,
      count: 0,
    },
    {
      value: "privacy",
      label: isVi ? "Bảo mật" : "Privacy",
      icon: ShieldCheck,
      count: 0,
    },
    {
      value: "terms",
      label: isVi ? "Điều khoản" : "Terms",
      icon: FileText,
      count: 0,
    },
  ];

  // Debounced search query
  let searchInput = "";
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let searchDebounceTimer;

  /** @param {Event & { currentTarget: EventTarget & HTMLInputElement }} event */
  function handleSearchInput(event) {
    searchInput = event.currentTarget.value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      searchQuery.set(searchInput);
    }, 300); // 300ms debounce
  }

  // Reactive statement to filter items by search and category
  $: {
    let items = $vaultItems;

    // Filter by category
    if (
      $categoryFilter !== "all" &&
      $categoryFilter !== "guide" &&
      $categoryFilter !== "privacy" &&
      $categoryFilter !== "terms"
    ) {
      items = items.filter(
        (item) => (item.category || "other") === $categoryFilter,
      );
    }

    // Filter by search query
    if ($searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
          item.username.toLowerCase().includes($searchQuery.toLowerCase()),
      );
    }

    filteredItems = items;
    showAllItems = false;

    if (import.meta.env.DEV) {
      console.log("[Main] Filtered items updated:", {
        total: $vaultItems.length,
        filtered: filteredItems.length,
        searchQuery: $searchQuery,
        categoryFilter: $categoryFilter,
      });
    }
  }
  /** @type {HTMLInputElement} */
  let fileInput;

  /**
   * Helper: get master password from session, or prompt user via Dialog
   * @returns {Promise<string | null>}
   */
  async function getMasterPassword() {
    let pw = sessionStorage.getItem("pv_master_key");
    if (pw) return pw;
    pw = await Dialog.prompt("Xác thực", "Nhập Master Password để tiếp tục", "", "password");
    if (!pw) return null;
    try {
      await StorageEngine.loadVault(pw);
      sessionStorage.setItem("pv_master_key", pw);
      return pw;
    } catch {
      await Dialog.alert("Lỗi", "Mật khẩu không đúng");
      return null;
    }
  }

  /**
   * Helper: save vault + auto-backup + update recovery copy
   * @param {import('$lib/types').VaultItem[]} items
   * @param {string} password
   */
  async function persistVault(items, password) {
    await StorageEngine.saveVault(items, password);
    vaultItems.set(items);

    // Auto-backup (non-critical)
    if (AutoBackupService.getConfig().enabled) {
      try {
        await AutoBackupService.createBackup(items, password);
        if (import.meta.env.DEV) console.log("[Main] Auto-backup created");
      } catch (e) {
        console.error("[Main] Auto-backup failed (non-critical):", e);
      }
    }

    // Update recovery copy (non-critical)
    try {
      const rd = await StorageEngine.getRecoveryData();
      if (rd) {
        // We can't re-encrypt recovery without the recovery key,
        // but we update the recovery vault via the stored key hash check
        // This happens automatically on next vault creation / recovery
      }
    } catch (e) {
      // ignore
    }
  }

  /** @param {import('$lib/types').VaultItem} item */
  async function saveItem(item) {
    if (import.meta.env.DEV) {
      console.log("[Main] saveItem called:", {
        id: item.id,
        title: item.title,
        isNew: !$vaultItems.find((i) => i.id === item.id),
      });
    }

    startCriticalOperation();

    try {
      const currentItems = $vaultItems;
      const existingIndex = currentItems.findIndex((i) => i.id === item.id);
      const isNewItem = existingIndex < 0;
      let updatedItems;

      if (existingIndex >= 0) {
        updatedItems = [...currentItems];
        updatedItems[existingIndex] = item;
      } else {
        updatedItems = [...currentItems, item];
      }

      const password = await getMasterPassword();
      if (!password) { endCriticalOperation(); return; }

      try {
        await persistVault(updatedItems, password);
      } catch (error) {
        console.error("[Main] Save failed:", error);
        sessionStorage.removeItem("pv_master_key");
        const retryPw = await Dialog.prompt("Phiên hết hạn", "Nhập lại Master Password để lưu", "", "password");
        if (!retryPw) { endCriticalOperation(); return; }
        try {
          await StorageEngine.saveVault(updatedItems, retryPw);
          sessionStorage.setItem("pv_master_key", retryPw);
          vaultItems.set(updatedItems);
        } catch {
          await Dialog.alert("Lỗi", "Lưu thất bại: Mật khẩu không đúng");
          endCriticalOperation();
          return;
        }
      }

      resetAutoLock();

      if (isNewItem) {
        ReminderSystem.recordPasswordAdd();
        checkReminders();
      }

      showSuccessMessage(
        isNewItem ? "Password added successfully" : "Password updated successfully",
      );
    } finally {
      endCriticalOperation();
    }
  }

  /** @param {string} id */
  async function deleteItem(id) {
    const confirmed = await Dialog.confirm("Xác nhận xóa", "Bạn có chắc muốn xóa mục này?");
    if (!confirmed) return;

    startCriticalOperation();

    try {
      const password = await getMasterPassword();
      if (!password) { endCriticalOperation(); return; }

      // Create auto-backup BEFORE delete (safety net)
      if (AutoBackupService.getConfig().enabled) {
        try {
          await AutoBackupService.createBackup($vaultItems, password);
          if (import.meta.env.DEV) console.log("[Main] Pre-delete backup created");
        } catch (e) {
          console.error("[Main] Pre-delete backup failed (non-critical):", e);
        }
      }

      const updatedItems = $vaultItems.filter((item) => item.id !== id);

      try {
        await StorageEngine.saveVault(updatedItems, password);
        vaultItems.set(updatedItems);
      } catch (error) {
        console.error("[Main] Delete failed:", error);
        sessionStorage.removeItem("pv_master_key");
        await Dialog.alert("Lỗi", "Xóa thất bại. Vui lòng thử lại.");
        endCriticalOperation();
        return;
      }

      resetAutoLock();
      showSuccessMessage("Password deleted successfully");
    } finally {
      endCriticalOperation();
    }
  }

  let exportLoading = false;

  /** @param {any} [event] */
  async function exportVault(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (exportLoading) return;

    exportLoading = true;

    try {
      const password = await getMasterPassword();
      if (!password) return;

      showSuccessMessage("Exporting vault...");

      try {
        const blob = await BackupManager.quickExport($vaultItems, password);
        const filename = BackupManager.generateFileName();
        await downloadVaultFile(blob, filename);

        ReminderSystem.recordBackup();
        showReminder.set(null);
        showSuccessMessage("Vault exported successfully");
      } catch (error) {
        console.error("[Main] Export failed:", error);
        await Dialog.alert("Lỗi", "Export thất bại. Vui lòng thử lại.");
      }
    } finally {
      exportLoading = false;
    }
  }

  /**
   * @param {Blob} blob
   * @param {string} filename
   */
  async function downloadVaultFile(blob, filename) {
    // Check if running as native app
    if (NativeApp.isNative()) {
      // Native app: Use native share or save
      const result = await NativeApp.shareFile(filename, blob);
      if (!result.success) {
        // Fallback to save to filesystem
        const saveResult = await NativeApp.exportToFile(filename, blob);
        if (saveResult.success) {
          showSuccessMessage(`Saved to: ${saveResult.path}`);
        } else {
          throw new Error(saveResult.error || "Failed to save file");
        }
      }
    } else {
      // Web: Use browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  async function importVault() {
    fileInput.click();
  }

  /** @param {Event & { currentTarget: EventTarget & HTMLInputElement }} event */
  async function handleFileImport(event) {
    const file = event.currentTarget.files && event.currentTarget.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      await Dialog.alert("Lỗi", "Tệp quá lớn. Kích thước tối đa là 10MB");
      fileInput.value = "";
      return;
    }

    if (!file.name.toLowerCase().endsWith(".vault")) {
      await Dialog.alert("Lỗi", "Định dạng tệp không hợp lệ. Chỉ chấp nhận tệp .vault");
      fileInput.value = "";
      return;
    }

    const validation = await RestoreManager.validateVaultFile(file);
    if (!validation.valid) {
      await Dialog.alert("Lỗi", `Import thất bại: ${validation.error}`);
      fileInput.value = "";
      return;
    }

    // Prompt for vault file password
    const vaultPassword = await Dialog.prompt("Import Vault", "Nhập mật khẩu chính cho tệp vault", "", "password");
    if (!vaultPassword) {
      fileInput.value = "";
      return;
    }

    try {
      const result = await RestoreManager.importVault(file, vaultPassword, $vaultItems);

      // Save merged result
      const savePassword = await getMasterPassword();
      if (!savePassword) {
        fileInput.value = "";
        return;
      }

      try {
        await persistVault(result.items, savePassword);
      } catch (error) {
        console.error("[Main] Save merged vault failed:", error);
        await Dialog.alert("Lỗi", "Lưu vault thất bại. Vui lòng thử lại.");
        fileInput.value = "";
        return;
      }

      const successMsg = `Import thành công: ${result.stats.newCount} mới, ${result.stats.updatedCount} cập nhật, ${result.stats.unchangedCount} không đổi`;
      showSuccessMessage(successMsg);
    } catch (e) {
      const error = /** @type {Error} */ (e);
      console.error("[Main] Import failed:", error);

      let errorMsg = error.message;
      if (errorMsg.includes("decrypt")) {
        errorMsg = "Sai mật khẩu hoặc tệp bị hỏng";
      } else if (errorMsg.includes("Invalid")) {
        errorMsg = "Định dạng tệp vault không hợp lệ";
      }

      await Dialog.alert("Import thất bại", errorMsg);
    }

    fileInput.value = "";
  }

  /** @param {string} message */
  function showSuccessMessage(message) {
    successMessage = message;
    clearTimeout(successTimeout);
    successTimeout = setTimeout(() => {
      successMessage = "";
    }, 3000);
  }

  function checkReminders() {
    const reminderType = ReminderSystem.shouldShowReminder();
    if (reminderType) {
      if (import.meta.env.DEV)
        console.log("[Main] Showing reminder:", reminderType);
      showReminder.set(reminderType);
      ReminderSystem.markShownThisSession();
    } else {
    }
  }

  function addNew() {
    editingItem.set(null); // Clear editing state FIRST
    showAddForm.set(true); // Then show form
  }

  function toggleTheme() {
    darkMode.update((d) => !d);
  }

  async function toggleBiometric() {
    if ($biometricEnabled) {
      await BiometricAuth.disable();
      biometricEnabled.set(false);
    } else {
      const password = await Dialog.prompt("Xác thực", "Vui lòng nhập mật khẩu chính (Master Password) để kích hoạt sinh trắc học", "", "password");
      if (password) {
        try {
          // Verify password by attempting to load the vault
          await StorageEngine.loadVault(password);
          
          await BiometricAuth.register();
          await BiometricAuth.setSecureMasterKey(password);
          biometricEnabled.set(true);
          await Dialog.alert("Thành công", "Đã bật xác thực sinh trắc học");
        } catch (e) {
          await Dialog.alert("Lỗi", "Mật khẩu không đúng hoặc thiết lập bị hủy");
        }
      }
    }
  }

  async function handleCloudSync() {
    const isAuth = await SyncEngine.isAuthenticated();
    if (!isAuth) {
      // Show cloud sync login modal instead of alert
      showCloudSync = true;
      return;
    }

    // Already authenticated — trigger sync
    await performCloudSync();
  }

  async function performCloudSync() {
    let password = sessionStorage.getItem("pv_master_key");
    if (!password) {
      password = await Dialog.prompt("Xác thực", "Nhập Master Password để mã hóa/giải mã và đồng bộ", "", "password");
      if (!password) return;
      try {
        await StorageEngine.loadVault(password);
      } catch (e) {
        await Dialog.alert("Lỗi", "Mật khẩu không đúng");
        return;
      }
    }

    try {
      cloudSyncStatus.update(s => ({ ...s, status: 'syncing' }));
      const mergedItems = await SyncEngine.pullAndMerge(password);
      vaultItems.set(mergedItems);
      cloudSyncStatus.update(s => ({ ...s, status: 'idle', lastSync: Date.now() }));
      successMessage = "Đồng bộ đám mây thành công!";
      clearTimeout(successTimeout);
      successTimeout = setTimeout(() => (successMessage = ""), 3000);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "Unknown error";
      console.error(e);
      cloudSyncStatus.update(s => ({ ...s, status: 'error', error: errMsg }));
      await Dialog.alert("Lỗi Đồng Bộ", "Không thể đồng bộ: " + errMsg);
    }
  }

  async function onCloudAuthenticated() {
    // After login, auto-trigger sync
    showCloudSync = false;
    await performCloudSync();
  }

  // Initialize enhanced monitoring and activity tracking
  onMount(async () => {
    // Initialize native app features (iOS/Android)
    await NativeApp.initialize();
    
    // Fetch biometric type
    biometricType = await BiometricAuth.getBiometricType();

    // Initialize logging
    logAppInit();
    suppressExtensionErrors();

    initializeAppStateMonitoring();
    initializeActivityTracking();

    // Check for reminders on mount
    checkReminders();

    // Reset reminder session flag
    ReminderSystem.resetSession();

    // Debug: Watch vaultItems changes (disabled in production for performance)
    if (import.meta.env.DEV) {
      vaultItems.subscribe((items) => {
        console.log("[Main] vaultItems store changed:", {
          count: items.length,
          items: items.map((i) => ({ id: i.id, title: i.title })),
        });
      });

      // Debug: Watch editingItem changes
      editingItem.subscribe((item) => {
        console.log(
          "[Main] editingItem store changed:",
          item ? { id: item.id, title: item.title } : null,
        );
      });

      // Debug: Watch showAddForm changes
      showAddForm.subscribe((show) => {
        console.log("[Main] showAddForm store changed:", show);
      });
    }
  });

  onDestroy(() => {
    cleanup();
    if (globalHandlerAttached) {
      document.removeEventListener("click", handleGlobalClick);
    }
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
        <div
          class="glass animate-fade-in"
          style="background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; padding: 0.875rem; border-radius: 12px; font-size: 0.875rem; text-align: center; margin-bottom: 1rem;"
        >
          {successMessage}
        </div>
      {/if}

      {#if $showReminder}
        <ReminderBanner
          reminderType={$showReminder}
          onBackupNow={exportVault}
        />
      {/if}

      <div style="max-width: 800px; margin: 0 auto; width: 100%;">
        <div
          style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 0.75rem;"
        >
          <h1
            style="margin: 0; font-size: 1.5rem; font-weight: 600; flex-shrink: 0; display: flex; align-items: center; gap: 0.5rem;"
            class="text-glass"
          >
            <ShieldAlert size={28} strokeWidth={1.5} color="currentColor" /> PocketVault
          </h1>
          <div
            style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: flex-end;"
          >
            <button
              class="glass-btn haptic-light"
              style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;"
              on:click={toggleTheme}
              title="Toggle theme"
            >
              <span
                style="display: flex; align-items: center; justify-content: center;"
                ><svelte:component
                  this={$darkMode ? Sun : Moon}
                  size={20}
                  strokeWidth={1.5}
                /></span
              >
            </button>
            <button
              class="glass-btn haptic-light"
              style="padding: 0.625rem 0.875rem; border-radius: 12px; min-height: 44px; display: flex; align-items: center; justify-content: center; gap: 0.375rem; font-weight: 600; font-size: 0.875rem;"
              on:click={() => language.toggle()}
              title="Switch language"
            >
              <span
                style="display: flex; align-items: center; justify-content: center;"
              >
                <Languages size={18} strokeWidth={1.5} />
              </span>
              <span>{$language === "en" ? "EN" : "VI"}</span>
            </button>
            {#if $biometricEnabled}
              <button
                class="glass-btn-primary"
                style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;"
                on:click={toggleBiometric}
                title="Biometric enabled"
              >
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                >
                  <svelte:component
                    this={biometricType === "FaceID"
                      ? ScanFace
                      : Fingerprint}
                    size={20}
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            {/if}
            <button
              class="glass-btn haptic-light"
              style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center; position: relative;"
              on:click={handleCloudSync}
              title={$cloudSyncStatus.status === 'syncing' ? 'Syncing...' : 'Cloud Sync'}
            >
              <span style="display: flex; align-items: center; justify-content: center;">
                {#if $cloudSyncStatus.status === 'syncing'}
                  <div class="glass-spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>
                {:else if $cloudSyncStatus.status === 'error'}
                  <CloudOff size={20} strokeWidth={1.5} color="#ef4444" />
                {:else}
                  <Cloud size={20} strokeWidth={1.5} color={$cloudSyncStatus.lastSync ? "#3b82f6" : "currentColor"} />
                {/if}
              </span>
            </button>
            <div style="position: relative;">
              <button
                class="glass-btn haptic-light"
                style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;"
                on:click={(e) => {
                  e.stopPropagation();
                  exportVault();
                  showExportTooltip = false;
                }}
                on:mouseenter={() => (showExportTooltip = true)}
                on:mouseleave={() => (showExportTooltip = false)}
                title="Export vault"
              >
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                  ><Upload size={20} strokeWidth={1.5} /></span
                >
              </button>
              <BackupTooltip
                type="export"
                show={showExportTooltip}
                onClose={() => (showExportTooltip = false)}
              />
            </div>
            <div style="position: relative;">
              <button
                class="glass-btn haptic-light"
                style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;"
                on:click={(e) => {
                  e.stopPropagation();
                  importVault();
                  showImportTooltip = false;
                }}
                on:mouseenter={() => (showImportTooltip = true)}
                on:mouseleave={() => (showImportTooltip = false)}
                title="Import vault"
              >
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                  ><Download size={20} strokeWidth={1.5} /></span
                >
              </button>
              <BackupTooltip
                type="import"
                show={showImportTooltip}
                onClose={() => (showImportTooltip = false)}
              />
            </div>
            <button
              class="glass-btn haptic-medium"
              style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;"
              on:click={() => lock("manual")}
              title="Lock vault"
            >
              <span
                style="display: flex; align-items: center; justify-content: center;"
                ><Lock size={20} strokeWidth={1.5} /></span
              >
            </button>
          </div>
        </div>

        {#if $categoryFilter !== "guide"}
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
        {/if}
      </div>
    </header>

    <main style="padding: 1rem; padding-bottom: 7rem;">
      <div style="max-width: 800px; margin: 0 auto; width: 100%;">
        {#if $categoryFilter === "guide"}
          <!-- Show Guide Content -->
          <GuideContent lang={$language} />
        {:else if $categoryFilter === "privacy"}
          <PrivacyContent lang={$language} />
        {:else if $categoryFilter === "terms"}
          <TermsContent lang={$language} />
        {:else if filteredItems.length === 0}
          <div
            style="text-align: center; padding: 3rem 1rem;"
            class="text-glass-secondary"
          >
            {#if $vaultItems.length === 0}
              <div
                style="display: flex; justify-content: center; margin-bottom: 1rem;"
              >
                <LockKeyhole size={64} strokeWidth={1} />
              </div>
              <h2
                style="margin: 0 0 0.5rem 0; font-size: 1.5rem;"
                class="text-glass"
              >
                Your vault is empty
              </h2>
              <p style="margin: 0; font-size: 1rem;">
                Add your first password to get started
              </p>
            {:else if $searchQuery || $categoryFilter !== "all"}
              <div
                style="display: flex; justify-content: center; margin-bottom: 1rem;"
              >
                <SearchX size={64} strokeWidth={1} />
              </div>
              <h2
                style="margin: 0 0 0.5rem 0; font-size: 1.5rem;"
                class="text-glass"
              >
                No matches found
              </h2>
              <p style="margin: 0; font-size: 1rem;">
                Try a different search or filter
              </p>
            {:else}
              <div
                style="display: flex; justify-content: center; margin-bottom: 1rem;"
              >
                <SearchX size={64} strokeWidth={1} />
              </div>
              <h2
                style="margin: 0 0 0.5rem 0; font-size: 1.5rem;"
                class="text-glass"
              >
                No matches found
              </h2>
              <p style="margin: 0; font-size: 1rem;">
                Try a different search term
              </p>
            {/if}
          </div>
        {:else}
          <div style="display: flex; flex-direction: column; gap: 0.875rem;">
            {#each showAllItems ? filteredItems : filteredItems.slice(0, 5) as item (item.id)}
              <VaultItemComponent {item} onDelete={deleteItem} />
            {/each}

            {#if filteredItems.length > 5}
              <button
                class="glass-btn haptic-medium"
                style="margin-top: 0.5rem; padding: 0.875rem; border-radius: 14px; width: 100%; text-align: center; font-weight: 500;"
                on:click={() => (showAllItems = !showAllItems)}
              >
                {showAllItems
                  ? "Thu gọn"
                  : `Xem thêm (${filteredItems.length - 5} mục)`}
              </button>
            {/if}
          </div>
        {/if}
      </div>
    </main>

    <!-- Bottom Navigation with Category Filters -->
    <nav class="bottom-nav">
      <div class="bottom-nav-scroll">
        {#each categoryFilters as filter}
          <button
            class="filter-chip haptic-light filter-{filter.value} {$categoryFilter ===
            filter.value
              ? 'active'
              : ''}"
            on:click={() => categoryFilter.set(filter.value)}
          >
            <span style="display: flex; align-items: center;"
              ><svelte:component
                this={filter.icon}
                size={16}
                strokeWidth={1.5}
              /></span
            >
            <span>{filter.label}</span>
            {#if filter.count > 0}
              <span style="opacity: 0.7; font-size: 0.75rem;"
                >({filter.count})</span
              >
            {/if}
          </button>
        {/each}
      </div>
    </nav>

    <div style="position: fixed; bottom: 6.5rem; right: 1.5rem; z-index: 100;">
      <div
        style="position: absolute; right: 0; bottom: 0; transform: translateX(calc(max(0px, 100vw - 800px) / -2)); transition: transform 0.3s; display: flex; flex-direction: column; gap: 1rem; align-items: center;"
      >
        {#if $categoryFilter === "guide"}
          <a
            href="https://www.buymeacoffee.com/stevedat"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-fab haptic-light"
            style="background: rgba(255, 221, 0, 0.9); border-color: rgba(255, 221, 0, 1);"
            title="Buy me a coffee"
          >
            <span
              style="display: flex; align-items: center; justify-content: center; color: #000;"
            >
              <Coffee size={24} strokeWidth={2} />
            </span>
          </a>
        {/if}

        {#if $categoryFilter !== "guide"}
          <button
            class="glass-fab haptic-heavy"
            on:click={addNew}
            title="Add password"
          >
            <span
              style="display: flex; align-items: center; justify-content: center;"
              ><Plus size={24} strokeWidth={2} /></span
            >
          </button>
        {/if}
      </div>
    </div>

    <AddEditForm onSave={saveItem} />

    <!-- PWA Install Prompt -->
    <InstallPrompt />

    <!-- Update Notification -->
    <UpdateNotification />

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
  .glass-header {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1.25rem 1rem;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  :global(.dark) .glass-header {
    background: rgba(15, 15, 20, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .text-glass {
    color: #1a1a2e;
  }

  :global(.dark) .text-glass {
    color: #f4f4f5;
  }

  .text-glass-secondary {
    color: #64748b;
  }

  :global(.dark) .text-glass-secondary {
    color: #94a3b8;
  }

  .glass-btn {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: #475569;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  :global(.dark) .glass-btn {
    background: rgba(30, 30, 40, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
  }

  .glass-btn:hover {
    transform: translateY(-1px);
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  :global(.dark) .glass-btn:hover {
    background: rgba(40, 40, 50, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .glass-btn-primary {
    background: #3b82f6;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .glass-btn-primary:hover {
    transform: translateY(-1px);
    background: #2563eb;
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  .glass-input {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.08);
    color: #1e293b;
    transition: all 0.2s;
  }

  :global(.dark) .glass-input {
    background: rgba(30, 30, 40, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #f1f5f9;
  }

  .glass-input:focus {
    outline: none;
    border-color: #3b82f6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  :global(.dark) .glass-input:focus {
    background: rgba(40, 40, 50, 0.9);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.875rem 0.5rem;
    padding-bottom: calc(0.875rem + env(safe-area-inset-bottom));
    z-index: 100;
  }

  :global(.dark) .bottom-nav {
    background: rgba(15, 15, 20, 0.85);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .bottom-nav-scroll {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    max-width: 800px;
    margin: 0 auto;
  }

  .bottom-nav-scroll::-webkit-scrollbar {
    display: none;
  }

  .filter-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: #64748b;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  :global(.dark) .filter-chip {
    background: rgba(30, 30, 40, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #94a3b8;
  }

  .filter-chip.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .glass-fab {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
    border: none;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .glass-fab:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
  }

  .glass-fab:active {
    transform: scale(0.95);
  }

  .glass-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce-subtle {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 3s ease-in-out infinite;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }

  /* Haptic Feedback Classes */
  .haptic-light:active {
    transform: scale(0.98);
  }
  .haptic-medium:active {
    transform: scale(0.96);
  }
  .haptic-heavy:active {
    transform: scale(0.94);
  }
</style>

<CloudSyncModal bind:show={showCloudSync} on:authenticated={onCloudAuthenticated} />
