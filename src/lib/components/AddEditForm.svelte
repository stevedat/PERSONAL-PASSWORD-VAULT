<script>
  import { CryptoEngine } from "../crypto";
  import { showAddForm, editingItem } from "../stores";
  import { StorageEngine } from "../storage";
  import {
    Mail,
    Landmark,
    Smartphone,
    Globe,
    Briefcase,
    Gamepad2,
    Folder,
    X,
    Eye,
    EyeOff,
    Zap,
    LockKeyhole,
    AlertTriangle,
    Lock,
  } from "lucide-svelte";

  /** @type {(item: import('../types').VaultItem) => void} */
  export let onSave;

  let title = "";
  let username = "";
  let password = "";
  let note = "";
  let category = "other";
  let isEditing = false;
  let editId = "";
  /** @type {string | null} */
  let lastEditingId = null;

  let showPassword = false;
  /** @type {Record<string, boolean>} */
  let copyFeedback = {};
  let showVerifyPopup = false;
  let verifyPassword = "";
  let verifyError = "";
  let isVerifying = false;
  let passwordUnlocked = false;
  /** @type {string} */
  let usernameId;
  /** @type {string} */
  let passwordId;
  /** @type {string} */
  let noteId;
  /** @type {string} */
  let verifyId;

  const categories = [
    { value: "email", label: "Email", icon: Mail },
    { value: "banking", label: "Banking", icon: Landmark },
    { value: "app", label: "App", icon: Smartphone },
    { value: "website", label: "Website", icon: Globe },
    { value: "work", label: "Work", icon: Briefcase },
    { value: "games", label: "Games", icon: Gamepad2 },
    { value: "other", label: "Other", icon: Folder },
  ];

  let addModeInitialized = false;

  $: {
    if ($editingItem && $editingItem.id !== lastEditingId) {
      if (import.meta.env.DEV)
        console.log("[AddEditForm] Editing item:", $editingItem.id);
      lastEditingId = $editingItem.id;
      isEditing = true;
      editId = $editingItem.id;
      title = $editingItem.title;
      username = $editingItem.username;
      password = $editingItem.password || "";
      note = $editingItem.note || "";
      category = $editingItem.category || "other";
      showPassword = false;
      passwordUnlocked = false;
      addModeInitialized = false;
    } else if ($showAddForm && !$editingItem && !addModeInitialized) {
      if (import.meta.env.DEV)
        console.log("[AddEditForm] Initializing add mode");
      isEditing = false;
      editId = "";
      lastEditingId = null;
      showPassword = false;
      passwordUnlocked = false;
      addModeInitialized = true;

      if (title || username || password || note || category !== "other") {
        title = "";
        username = "";
        password = "";
        note = "";
        category = "other";
      }
    } else if (!$showAddForm && !$editingItem) {
      addModeInitialized = false;
    }
  }

  function generatePassword() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    password = result;
    showPassword = true;
  }

  function togglePasswordVisibility() {
    if (isEditing && !passwordUnlocked) {
      showVerifyPopup = true;
      verifyPassword = "";
      verifyError = "";
    } else {
      showPassword = !showPassword;
    }
  }

  /**
   * @param {string} text
   * @param {string} field
   */
  async function copyToClipboard(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      // Optionally, provide user feedback
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  async function verifyMasterPassword() {
    if (!verifyPassword.trim()) {
      verifyError = "Please enter master password";
      return;
    }

    isVerifying = true;
    verifyError = "";

    try {
      await StorageEngine.loadVault(verifyPassword);
      passwordUnlocked = true;
      showPassword = true;
      showVerifyPopup = false;
      verifyPassword = "";
    } catch (error) {
      verifyError = "Incorrect master password";
      verifyPassword = "";
    } finally {
      isVerifying = false;
    }
  }

  function cancelVerify() {
    showVerifyPopup = false;
    verifyPassword = "";
    verifyError = "";
  }

  /** @param {KeyboardEvent} event */
  function handleVerifyKeydown(event) {
    if (event.key === "Enter") {
      verifyMasterPassword();
    } else if (event.key === "Escape") {
      cancelVerify();
    }
  }

  /** @param {FocusEvent} event */
  function handlePasswordInput(event) {
    if (isEditing && !passwordUnlocked) {
      event.preventDefault();
      showVerifyPopup = true;
      verifyPassword = "";
      verifyError = "";
    }
  }

  function save() {
    /** @type {import('../types').VaultItem} */
    const item = {
      id: isEditing ? editId : CryptoEngine.generateId(),
      title: title.trim(),
      username: username.trim(),
      password: password.trim(),
      note: note.trim() || undefined,
      category: category,
      last_modified: Date.now(),
    };

    if (import.meta.env.DEV) {
      console.log("[AddEditForm] Saving item:", {
        id: item.id,
        isEditing,
        title: item.title,
        category: item.category,
      });
    }

    onSave(item);
    cancel();
  }

  function cancel() {
    if (import.meta.env.DEV)
      console.log("[AddEditForm] Cancelled, resetting all state");
    title = "";
    username = "";
    password = "";
    note = "";
    category = "other";
    isEditing = false;
    editId = "";
    lastEditingId = null;
    showPassword = false;
    passwordUnlocked = false;
    showVerifyPopup = false;
    verifyPassword = "";
    verifyError = "";
    showAddForm.set(false);
    editingItem.set(null);
  }

  /** @param {KeyboardEvent} event */
  function handleBackdropKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      cancel();
    }
  }

  /** @param {KeyboardEvent} event */
  function handleVerifyBackdropKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      cancelVerify();
    }
  }
</script>

{#if $showAddForm || $editingItem}
  <div
    class="modal-backdrop"
    on:click|self={cancel}
    on:keydown={(e) => e.key === "Escape" && cancel()}
    aria-label="Close modal"
  >
    <div class="glass-modal" role="document" tabindex="-1">
      <div
        style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"
      >
        <h2
          id="form-title"
          style="margin: 0; font-size: 1.25rem;"
          class="text-glass"
        >
          {isEditing ? "Edit" : "Add"} Password
        </h2>
        <button
          class="close-btn haptic-light"
          on:click={cancel}
          type="button"
          aria-label="Close"
        >
          <span
            style="display: flex; align-items: center; justify-content: center;"
            ><X size={20} strokeWidth={1.5} /></span
          >
        </button>
      </div>

      <form
        on:submit|preventDefault={save}
        style="display: flex; flex-direction: column; gap: 1rem;"
      >
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label
            for="title"
            style="font-size: 0.875rem; font-weight: 500;"
            class="text-glass-secondary">Title *</label
          >
          <input
            id="title"
            type="text"
            bind:value={title}
            placeholder="e.g., Gmail, Facebook"
            class="glass-input"
            required
          />
        </div>

        <fieldset
          style="border: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;"
        >
          <legend
            style="font-size: 0.875rem; font-weight: 500; padding: 0;"
            class="text-glass-secondary">Category</legend
          >
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            {#each categories as cat}
              <button
                type="button"
                class="category-tag category-{cat.value} haptic-light {category ===
                cat.value
                  ? 'selected'
                  : ''}"
                on:click={() => (category = cat.value)}
              >
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                  ><svelte:component
                    this={cat.icon}
                    size={16}
                    strokeWidth={1.5}
                  /></span
                >
                <span>{cat.label}</span>
              </button>
            {/each}
          </div>
        </fieldset>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label
            for="username"
            style="font-size: 0.875rem; font-weight: 500;"
            class="text-glass-secondary">Username *</label
          >
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
          <label
            for="password"
            style="font-size: 0.875rem; font-weight: 500;"
            class="text-glass-secondary">Password *</label
          >
          <div style="display: flex; gap: 0.5rem;">
            <div style="position: relative; flex: 1;">
              {#if showPassword}
                <input
                  id="password"
                  type="text"
                  bind:value={password}
                  placeholder="Password"
                  class="glass-input"
                  style="width: 100%; padding-right: 3rem;"
                  required
                  readonly={isEditing && !passwordUnlocked}
                  on:focus={handlePasswordInput}
                />
              {:else}
                <input
                  id="password"
                  type="password"
                  bind:value={password}
                  placeholder="Password"
                  class="glass-input"
                  style="width: 100%; padding-right: 3rem;"
                  required
                  readonly={isEditing && !passwordUnlocked}
                  on:focus={handlePasswordInput}
                />
              {/if}
              <button
                type="button"
                class="password-toggle-btn haptic-light"
                on:click={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span
                  style="display: flex; align-items: center; justify-content: center;"
                >
                  <svelte:component
                    this={showPassword ? EyeOff : Eye}
                    size={18}
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            </div>
            <button
              type="button"
              class="generate-btn haptic-medium"
              on:click={generatePassword}
              aria-label="Generate password"
            >
              <span
                class="generate-icon"
                style="display: flex; align-items: center; justify-content: center;"
                ><Zap size={18} strokeWidth={2} /></span
              >
              <span class="generate-text">Generate</span>
            </button>
          </div>
          {#if isEditing && !passwordUnlocked}
            <p
              style="font-size: 0.75rem; margin: 0; opacity: 0.7; display: flex; align-items: center; gap: 0.25rem;"
              class="text-glass-secondary"
            >
              <Lock size={12} strokeWidth={2} /> Click <Eye
                size={12}
                strokeWidth={2}
              /> to verify master password and edit
            </p>
          {/if}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label
            for="note"
            style="font-size: 0.875rem; font-weight: 500;"
            class="text-glass-secondary">Note</label
          >
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
          <button
            type="button"
            class="glass-btn haptic-light"
            style="flex: 1; padding: 0.75rem;"
            on:click={cancel}>Cancel</button
          >
          <button
            type="submit"
            class="glass-btn-primary haptic-medium"
            style="flex: 1; padding: 0.75rem; font-weight: 600;"
            disabled={!title.trim() || !username.trim() || !password.trim()}
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Master Password Verification Popup -->
{#if showVerifyPopup}
  <div
    class="verify-backdrop"
    on:click|self={cancelVerify}
    on:keydown={(e) => e.key === "Escape" && cancelVerify()}
    aria-label="Close verification popup"
  >
    <div class="verify-popup glass" role="document" tabindex="-1">
      <div class="verify-header">
        <div
          class="verify-icon"
          style="display: flex; align-items: center; justify-content: center;"
        >
          <LockKeyhole size={48} strokeWidth={1} />
        </div>
        <h3 id="verify-title" class="verify-title text-glass">
          Verify Master Password
        </h3>
        <p class="verify-subtitle text-glass-secondary">
          Enter your master password to edit this password
        </p>
      </div>
      <div class="verify-body">
        <label for="verify-password" class="sr-only"
          >Master password for verification</label
        >
        <input
          id="verify-password"
          type="password"
          bind:value={verifyPassword}
          on:keydown={handleVerifyKeydown}
          placeholder="Master password"
          class="glass-input verify-input"
          disabled={isVerifying}
        />
        {#if verifyError}
          <div class="verify-error" role="alert">
            <span
              style="display: flex; align-items: center; justify-content: center;"
              ><AlertTriangle size={16} strokeWidth={1.5} /></span
            >
            <span>{verifyError}</span>
          </div>
        {/if}
      </div>
      <div class="verify-actions">
        <button
          class="glass-btn verify-btn-cancel haptic-light"
          on:click={cancelVerify}
          disabled={isVerifying}>Cancel</button
        >
        <button
          class="glass-btn-primary verify-btn-confirm haptic-medium"
          on:click={verifyMasterPassword}
          disabled={isVerifying || !verifyPassword.trim()}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
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
    background: #000000;
    color: white;
  }

  .generate-btn:hover {
    transform: translateY(-1px);
    opacity: 0.85;
  }

  .generate-btn:active {
    transform: scale(0.95);
  }

  :global(.dark) .generate-btn {
    background: #ffffff;
    color: #000000;
  }

  :global(.dark) .generate-btn:hover {
    opacity: 0.85;
  }

  .generate-icon {
    font-size: 1.125rem;
    line-height: 1;
  }
  .generate-text {
    line-height: 1;
  }

  @media (max-width: 480px) {
    .generate-text {
      display: none;
    }
    .generate-btn {
      padding: 0.75rem;
      min-width: 44px;
    }
  }

  .password-toggle-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(0, 0, 0, 0.05);
  }

  .password-toggle-btn:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(-50%) scale(1.05);
  }

  .password-toggle-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  :global(.dark) .password-toggle-btn {
    background: rgba(255, 255, 255, 0.1);
  }
  :global(.dark) .password-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .verify-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 2000;
    animation: fadeIn 0.15s ease-out;
  }

  .verify-popup {
    max-width: 400px;
    width: 100%;
    padding: 1.5rem;
    border-radius: 16px;
    animation: slideUp 0.2s ease-out;
    background: #ffffff;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2);
  }

  :global(.dark) .verify-popup {
    background: #18181b;
    border: 1px solid #27272a;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.6);
  }

  .verify-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .verify-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
    animation: pulse 0.5s ease-out;
  }

  .verify-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }
  .verify-subtitle {
    font-size: 0.875rem;
    margin: 0;
    opacity: 0.8;
  }
  .verify-body {
    margin-bottom: 1.5rem;
  }
  .verify-input {
    width: 100%;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .verify-input:focus {
    box-shadow: 0 0 0 3px rgba(91, 140, 255, 0.3);
  }

  .verify-error {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding: 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    color: #ef4444;
    font-size: 0.875rem;
    animation: shake 0.3s ease-out;
  }

  :global(.dark) .verify-error {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.4);
    color: #fca5a5;
  }

  .verify-actions {
    display: flex;
    gap: 0.75rem;
  }
  .verify-btn-cancel,
  .verify-btn-confirm {
    flex: 1;
    padding: 0.875rem;
    font-weight: 500;
    border-radius: 14px;
    min-height: 48px;
  }

  .verify-btn-confirm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-8px);
    }
    75% {
      transform: translateX(8px);
    }
  }

  @media (max-width: 480px) {
    .verify-popup {
      max-width: 100%;
      margin: 0 0.5rem;
    }
    .verify-icon {
      font-size: 2.5rem;
    }
    .verify-title {
      font-size: 1.125rem;
    }
  }
</style>
