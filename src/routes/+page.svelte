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
  } from "$lib/stores";
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
  import {
    LayoutGrid,
    Search,
    Plus,
    Clock,
    Shield,
    Key,
    User,
    Settings,
    Import,
    Export,
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
  } from "lucide-svelte";
  import PrivacyContent from "$lib/components/PrivacyContent.svelte";
  import TermsContent from "$lib/components/TermsContent.svelte";

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
      label: "Guide",
      icon: BookOpen,
      count: 0, // Guide không có count
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
    if ($categoryFilter !== "all") {
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

  /** @param {import('$lib/types').VaultItem} item */
  async function saveItem(item) {
    if (import.meta.env.DEV) {
      console.log("[Main] saveItem called:", {
        id: item.id,
        title: item.title,
        isNew: !$vaultItems.find((i) => i.id === item.id),
      });
    }

    // Start critical operation to prevent locking during save
    startCriticalOperation();

    try {
      const currentItems = $vaultItems;
      const existingIndex = currentItems.findIndex((i) => i.id === item.id);

      let updatedItems;
      const isNewItem = existingIndex < 0;

      if (existingIndex >= 0) {
        if (import.meta.env.DEV)
          console.log("[Main] Updating existing item at index:", existingIndex);
        updatedItems = [...currentItems];
        updatedItems[existingIndex] = item;
      } else {
        updatedItems = [...currentItems, item];
      }

      if (import.meta.env.DEV)
        console.log("[Main] Updated items count:", updatedItems.length);

      // Use cached master password from session
      const masterPassword = sessionStorage.getItem("pv_master_key");
      if (!masterPassword) {
        if (import.meta.env.DEV)
          console.log("[Main] No cached master password, prompting user");
        const inputPassword = prompt("Enter master password to save changes:");
        if (!inputPassword) {
          endCriticalOperation();
          return;
        }

        try {
          // Test password by trying to decrypt current vault
          await StorageEngine.loadVault(inputPassword);
          sessionStorage.setItem("pv_master_key", inputPassword);
          await StorageEngine.saveVault(updatedItems, inputPassword);

          // CRITICAL: Update store IMMEDIATELY after successful save, BEFORE auto-backup
          if (import.meta.env.DEV)
            console.log(
              "[Main] Updating vaultItems store with",
              updatedItems.length,
              "items",
            );
          vaultItems.set(updatedItems);

          // Create auto-backup (non-critical, can fail)
          if (AutoBackupService.getConfig().enabled) {
            try {
              await AutoBackupService.createBackup(updatedItems, inputPassword);
              if (import.meta.env.DEV)
                console.log("[Main] Auto-backup created");
            } catch (backupError) {
              console.error(
                "[Main] Auto-backup failed (non-critical):",
                backupError,
              );
            }
          }

          if (import.meta.env.DEV)
            console.log("[Main] Vault saved successfully");
        } catch (error) {
          console.error("[Main] Save failed:", error);
          alert("Failed to save: Invalid master password");
          endCriticalOperation();
          return;
        }
      } else {
        try {
          if (import.meta.env.DEV)
            console.log("[Main] Saving with cached password");
          await StorageEngine.saveVault(updatedItems, masterPassword);

          // CRITICAL: Update store IMMEDIATELY after successful save, BEFORE auto-backup
          if (import.meta.env.DEV)
            console.log(
              "[Main] Updating vaultItems store with",
              updatedItems.length,
              "items",
            );
          vaultItems.set(updatedItems);

          // Create auto-backup (non-critical, can fail)
          if (AutoBackupService.getConfig().enabled) {
            try {
              await AutoBackupService.createBackup(
                updatedItems,
                masterPassword,
              );
              if (import.meta.env.DEV)
                console.log("[Main] Auto-backup created");
            } catch (backupError) {
              console.error(
                "[Main] Auto-backup failed (non-critical):",
                backupError,
              );
              // Continue even if auto-backup fails
            }
          }

          if (import.meta.env.DEV)
            console.log("[Main] Vault saved successfully");
        } catch (error) {
          console.error("[Main] Save failed with cached password:", error);
          // Master password might have changed, ask for new one
          sessionStorage.removeItem("pv_master_key");
          const inputPassword = prompt(
            "Master password expired. Enter password to save:",
          );
          if (!inputPassword) {
            if (import.meta.env.DEV)
              console.log("[Main] User cancelled password prompt");
            endCriticalOperation();
            return;
          }

          try {
            await StorageEngine.saveVault(updatedItems, inputPassword);
            sessionStorage.setItem("pv_master_key", inputPassword);
            if (import.meta.env.DEV)
              console.log("[Main] Vault saved to storage");

            // CRITICAL: Update store IMMEDIATELY after successful save, BEFORE auto-backup
            if (import.meta.env.DEV)
              console.log(
                "[Main] Updating vaultItems store with",
                updatedItems.length,
                "items",
              );
            vaultItems.set(updatedItems);

            // Create auto-backup (non-critical, can fail)
            if (AutoBackupService.getConfig().enabled) {
              try {
                await AutoBackupService.createBackup(
                  updatedItems,
                  inputPassword,
                );
                if (import.meta.env.DEV)
                  console.log("[Main] Auto-backup created");
              } catch (backupError) {
                console.error(
                  "[Main] Auto-backup failed (non-critical):",
                  backupError,
                );
              }
            }

            if (import.meta.env.DEV)
              console.log(
                "[Main] Vault saved successfully after password refresh",
              );
          } catch (error) {
            console.error("[Main] Save failed after password refresh:", error);
            alert("Failed to save: Invalid master password");
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
      showSuccessMessage(
        isNewItem
          ? "Password added successfully"
          : "Password updated successfully",
      );
      if (import.meta.env.DEV)
        console.log("[Main] Save complete, store updated");
    } finally {
      // Always end critical operation, even if there's an error
      endCriticalOperation();
    }
  }

  /** @param {string} id */
  async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    // Start critical operation to prevent locking during delete
    startCriticalOperation();

    try {
      // Use cached master password from session
      const masterPassword = sessionStorage.getItem("pv_master_key");
      if (!masterPassword) {
        const inputPassword = prompt(
          "Enter master password to confirm deletion:",
        );
        if (!inputPassword) {
          endCriticalOperation();
          return;
        }

        try {
          // Test password by trying to decrypt current vault
          await StorageEngine.loadVault(inputPassword);
          sessionStorage.setItem("pv_master_key", inputPassword);
          const updatedItems = $vaultItems.filter((item) => item.id !== id);
          await StorageEngine.saveVault(updatedItems, inputPassword);
          vaultItems.set(updatedItems);
          if (import.meta.env.DEV)
            console.log("[Main] Item deleted, vault updated");
        } catch (error) {
          console.error("[Main] Delete failed:", error);
          alert("Failed to delete: Invalid master password");
          endCriticalOperation();
          return;
        }
      } else {
        try {
          const updatedItems = $vaultItems.filter((item) => item.id !== id);
          if (import.meta.env.DEV)
            console.log(
              "[Main] Deleting item, new count:",
              updatedItems.length,
            );
          await StorageEngine.saveVault(updatedItems, masterPassword);
          vaultItems.set(updatedItems);
          if (import.meta.env.DEV)
            console.log("[Main] Item deleted, vault updated");
        } catch (error) {
          console.error("[Main] Delete failed:", error);
          // Master password might have changed, ask for new one
          sessionStorage.removeItem("pv_master_key");
          const inputPassword = prompt(
            "Master password expired. Enter password to delete:",
          );
          if (!inputPassword) {
            endCriticalOperation();
            return;
          }

          try {
            const updatedItems = $vaultItems.filter((item) => item.id !== id);
            await StorageEngine.saveVault(updatedItems, inputPassword);
            sessionStorage.setItem("pv_master_key", inputPassword);
            vaultItems.set(updatedItems);
            if (import.meta.env.DEV)
              console.log("[Main] Item deleted after password refresh");
          } catch (error) {
            console.error(
              "[Main] Delete failed after password refresh:",
              error,
            );
            alert("Failed to delete: Invalid master password");
            endCriticalOperation();
            return;
          }
        }
      }

      resetAutoLock();

      // Show success feedback
      showSuccessMessage("Password deleted successfully");
    } finally {
      // Always end critical operation
      endCriticalOperation();
    }
  }

  let exportLoading = false;

  /** @param {any} [event] */
  async function exportVault(event) {
    if (event && event.preventDefault) event.preventDefault();
    if (exportLoading) return; // Prevent double-click

    exportLoading = true;

    try {
      const masterPassword = sessionStorage.getItem("pv_master_key");
      if (!masterPassword) {
        if (import.meta.env.DEV)
          console.log("[Main] No cached master password, prompting user");
        const inputPassword = prompt("Enter master password to export vault:");
        if (!inputPassword) return;

        try {
          // Test password first
          await StorageEngine.loadVault(inputPassword);
          sessionStorage.setItem("pv_master_key", inputPassword);

          // Show loading message
          showSuccessMessage("Exporting vault...");

          const blob = await BackupManager.quickExport(
            $vaultItems,
            inputPassword,
          );
          const filename = BackupManager.generateFileName();
          await downloadVaultFile(blob, filename);

          // Record backup for reminders
          ReminderSystem.recordBackup();
          showReminder.set(null);

          showSuccessMessage("Vault exported successfully");
          if (import.meta.env.DEV)
            console.log("[Main] Export successful:", filename);
        } catch (error) {
          console.error("[Main] Export failed:", error);
          alert("Export failed: Invalid master password");
        }
      } else {
        try {
          if (import.meta.env.DEV)
            console.log("[Main] Using cached master password");

          // Show loading message
          showSuccessMessage("Exporting vault...");

          const blob = await BackupManager.quickExport(
            $vaultItems,
            masterPassword,
          );
          const filename = BackupManager.generateFileName();
          await downloadVaultFile(blob, filename);

          // Record backup for reminders
          ReminderSystem.recordBackup();
          showReminder.set(null);

          showSuccessMessage("Vault exported successfully");
          if (import.meta.env.DEV)
            console.log("[Main] Export successful:", filename);
        } catch (error) {
          console.error("[Main] Export failed with cached password:", error);
          sessionStorage.removeItem("pv_master_key");
          const inputPassword = prompt(
            "Master password expired. Enter password to export:",
          );
          if (!inputPassword) return;

          try {
            // Show loading message
            showSuccessMessage("Exporting vault...");

            const blob = await BackupManager.quickExport(
              $vaultItems,
              inputPassword,
            );
            const filename = BackupManager.generateFileName();
            sessionStorage.setItem("pv_master_key", inputPassword);
            await downloadVaultFile(blob, filename);

            // Record backup for reminders
            ReminderSystem.recordBackup();
            showReminder.set(null);

            showSuccessMessage("Vault exported successfully");
            if (import.meta.env.DEV)
              console.log(
                "[Main] Export successful after password refresh:",
                filename,
              );
          } catch (error) {
            console.error(
              "[Main] Export failed after password refresh:",
              error,
            );
            alert("Export failed: Invalid master password");
          }
        }
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
    if (!file) {
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert(
        "File too large. Maximum size is 10MB / Tệp quá lớn. Kích thước tối đa là 10MB",
      );
      fileInput.value = "";
      return;
    }

    // Validate file extension
    if (!file.name.toLowerCase().endsWith(".vault")) {
      alert(
        "Invalid file format. Only .vault files are accepted / Định dạng tệp không hợp lệ. Chỉ chấp nhận tệp .vault",
      );
      fileInput.value = "";
      return;
    }

    // Validate file first
    const validation = await RestoreManager.validateVaultFile(file);
    if (!validation.valid) {
      console.error("[Main] Import validation failed:", validation.error);
      alert(`Import failed / Nhập thất bại: ${validation.error}`);
      fileInput.value = "";
      return;
    }

    // Prompt for vault file password
    const masterPassword = prompt(
      "Enter master password for the vault file / Nhập mật khẩu chính cho tệp vault:",
    );
    if (!masterPassword) {
      fileInput.value = "";
      return;
    }

    try {
      const result = await RestoreManager.importVault(
        file,
        masterPassword,
        $vaultItems,
      );

      if (import.meta.env.DEV)
        console.log("[Main] Import successful, merge stats:", result.stats);

      // Use cached master password for saving
      const currentMasterPassword = sessionStorage.getItem("pv_master_key");
      if (!currentMasterPassword) {
        if (import.meta.env.DEV)
          console.log("[Main] No cached password, prompting for save");
        const savePassword = prompt(
          "Enter master password to save merged vault / Nhập mật khẩu chính để lưu vault đã hợp nhất:",
        );
        if (!savePassword) {
          fileInput.value = "";
          return;
        }

        try {
          await StorageEngine.saveVault(result.items, savePassword);
          sessionStorage.setItem("pv_master_key", savePassword);

          // Create auto-backup (non-critical, can fail)
          if (AutoBackupService.getConfig().enabled) {
            try {
              await AutoBackupService.createBackup(result.items, savePassword);
            } catch (backupError) {
              console.error(
                "[Main] Auto-backup failed (non-critical):",
                backupError,
              );
            }
          }
        } catch (error) {
          console.error("[Main] Save failed:", error);
          alert(
            "Failed to save merged vault: Invalid master password / Lưu vault thất bại: Mật khẩu không đúng",
          );
          fileInput.value = "";
          return;
        }
      } else {
        try {
          if (import.meta.env.DEV)
            console.log("[Main] Saving with cached password");
          await StorageEngine.saveVault(result.items, currentMasterPassword);

          // Create auto-backup (non-critical, can fail)
          if (AutoBackupService.getConfig().enabled) {
            try {
              await AutoBackupService.createBackup(
                result.items,
                currentMasterPassword,
              );
            } catch (backupError) {
              console.error(
                "[Main] Auto-backup failed (non-critical):",
                backupError,
              );
            }
          }
        } catch (error) {
          console.error("[Main] Save failed with cached password:", error);
          sessionStorage.removeItem("pv_master_key");
          const savePassword = prompt(
            "Master password expired. Enter password to save / Mật khẩu đã hết hạn. Nhập mật khẩu để lưu:",
          );
          if (!savePassword) {
            fileInput.value = "";
            return;
          }

          try {
            await StorageEngine.saveVault(result.items, savePassword);
            sessionStorage.setItem("pv_master_key", savePassword);

            // Create auto-backup (non-critical, can fail)
            if (AutoBackupService.getConfig().enabled) {
              try {
                await AutoBackupService.createBackup(
                  result.items,
                  savePassword,
                );
              } catch (backupError) {
                console.error(
                  "[Main] Auto-backup failed (non-critical):",
                  backupError,
                );
              }
            }
          } catch (error) {
            console.error("[Main] Save failed after password refresh:", error);
            alert(
              "Failed to save merged vault: Invalid master password / Lưu vault thất bại: Mật khẩu không đúng",
            );
            fileInput.value = "";
            return;
          }
        }
      }

      // Update vault items
      vaultItems.set(result.items);

      // Show success message with stats
      const successMsg = `Import successful / Nhập thành công: ${result.stats.newCount} new/mới, ${result.stats.updatedCount} updated/cập nhật, ${result.stats.unchangedCount} unchanged/không đổi`;
      showSuccessMessage(successMsg);

      if (import.meta.env.DEV)
        console.log("[Main] Import complete, vault updated");
    } catch (e) {
      const error = /** @type {Error} */ (e);
      console.error("[Main] Import failed:", error);

      // User-friendly error messages
      let errorMsg = error.message;
      if (errorMsg.includes("decrypt")) {
        errorMsg =
          "Wrong password or corrupted file / Sai mật khẩu hoặc tệp bị hỏng";
      } else if (errorMsg.includes("Invalid")) {
        errorMsg =
          "Invalid vault file format / Định dạng tệp vault không hợp lệ";
      }

      alert(`Import failed / Nhập thất bại: ${errorMsg}`);
    }

    // Reset file input
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

  function toggleBiometric() {
    if ($biometricEnabled) {
      BiometricAuth.disable();
      biometricEnabled.set(false);
    } else {
      // Would trigger biometric setup flow
      alert("Biometric setup would be triggered here");
    }
  }

  // Initialize enhanced monitoring and activity tracking
  onMount(async () => {
    // Initialize native app features (iOS/Android)
    await NativeApp.initialize();

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
                    this={BiometricAuth.getBiometricType() === "FaceID"
                      ? ScanFace
                      : Fingerprint}
                    size={20}
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            {/if}
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
