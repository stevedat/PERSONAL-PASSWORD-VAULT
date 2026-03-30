<script>
  import { onMount } from "svelte";
  import { editingItem } from "../stores";
  import { StorageEngine } from "../storage";
  import {
    Mail,
    Landmark,
    Smartphone,
    Globe,
    Briefcase,
    Gamepad2,
    Folder,
    ChevronDown,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    LockKeyhole,
    AlertTriangle,
  } from "lucide-svelte";

  /** @type {import('../types').VaultItem} */
  export let item;
  /** @type {(id: string) => void} */
  export let onDelete;

  let showPassword = false;
  let isExpanded = false;

  function toggleExpand() {
    isExpanded = !isExpanded;
    if (!isExpanded) {
      // Re-hide password when collapsing to maintain security
      showPassword = false;
    }
  }

  /** @type {Record<string, boolean>} */
  let copyFeedback = {};
  let showVerifyPopup = false;
  let verifyPassword = "";
  let verifyError = "";
  let isVerifying = false;
  /** @type {string} */
  let usernameId;
  /** @type {string} */
  let passwordId;
  /** @type {string} */
  let noteId;
  /** @type {string} */
  let verifyId;

  onMount(() => {
    const uniqueId = `item-${item.id}`;
    usernameId = `${uniqueId}-username`;
    passwordId = `${uniqueId}-password`;
    noteId = `${uniqueId}-note`;
    verifyId = `${uniqueId}-verify`;
  });

  /** @type {Record<string, any>} */
  const categoryIcons = {
    email: Mail,
    banking: Landmark,
    app: Smartphone,
    website: Globe,
    work: Briefcase,
    games: Gamepad2,
    other: Folder,
  };

  /** @type {Record<string, string>} */
  const categoryLabels = {
    email: "Email",
    banking: "Banking",
    app: "App",
    website: "Website",
    work: "Work",
    games: "Games",
    other: "Other",
  };

  /**
   * @param {string} text
   * @param {string} field
   */
  async function copyToClipboard(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      copyFeedback[field] = true;
      setTimeout(() => {
        copyFeedback[field] = false;
        copyFeedback = { ...copyFeedback };
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function editItem() {
    editingItem.set(item);
  }

  function togglePasswordVisibility() {
    if (showPassword) {
      showPassword = false;
    } else {
      showVerifyPopup = true;
      verifyPassword = "";
      verifyError = "";
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
      showPassword = true;
      showVerifyPopup = false;
      verifyPassword = "";
      setTimeout(() => {
        showPassword = false;
      }, 30000);
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
    }
  }

  /** @param {KeyboardEvent} event */
  function handleGlobalKeydown(event) {
    if (event.key === "Escape" && showVerifyPopup) {
      cancelVerify();
    }
  }

  /** @param {KeyboardEvent} event */
  function handleBackdropKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      cancelVerify();
    }
  }

  $: categoryIcon =
    categoryIcons[item.category || "other"] || categoryIcons.other;
  $: categoryLabel =
    categoryLabels[item.category || "other"] || categoryLabels.other;
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

<div class="vault-card glass animate-slide-up" class:expanded={isExpanded}>
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div
    class="card-header"
    on:click={toggleExpand}
    style="cursor: pointer; margin-bottom: {isExpanded
      ? '1rem'
      : '0'}; align-items: center;"
  >
    <div class="card-title-section">
      <h3 class="card-title text-glass">{item.title}</h3>
      {#if item.category}
        <span class="category-tag category-{item.category}">
          <span style="display: flex; align-items: center;"
            ><svelte:component
              this={categoryIcon}
              size={14}
              strokeWidth={1.5}
            /></span
          >
          {categoryLabel}
        </span>
      {/if}
    </div>
    <div class="card-actions" on:click|stopPropagation>
      <button
        class="action-btn haptic-light"
        on:click={toggleExpand}
        title={isExpanded ? "Collapse" : "Expand"}
        style="background: transparent;"
      >
        <span
          class="action-icon"
          style="display: flex; align-items: center; justify-content: center; transform: rotate({isExpanded
            ? '180deg'
            : '0deg'}); transition: transform 0.3s;"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </span>
      </button>
      <button
        class="action-btn action-btn-edit haptic-light"
        on:click={editItem}
        title="Edit"
        aria-label="Edit password for {item.title}"
      >
        <span
          class="action-icon"
          style="display: flex; align-items: center; justify-content: center;"
          ><Pencil size={18} strokeWidth={1.5} /></span
        >
      </button>
      <button
        class="action-btn action-btn-delete haptic-heavy"
        on:click={() => onDelete(item.id)}
        title="Delete"
        aria-label="Delete password for {item.title}"
      >
        <span
          class="action-icon"
          style="display: flex; align-items: center; justify-content: center;"
          ><Trash2 size={18} strokeWidth={1.5} /></span
        >
      </button>
    </div>
  </div>

  {#if isExpanded}
    <div class="card-body">
      <div class="field-group">
        <label for={usernameId} class="field-label text-glass-secondary"
          >Username</label
        >
        <div class="field-content glass-field">
          <span id={usernameId} class="field-value text-glass"
            >{item.username}</span
          >
          <button
            class="field-btn glass-btn-primary haptic-medium"
            on:click={() => copyToClipboard(item.username, "username")}
            aria-label="Copy username for {item.title}"
          >
            {copyFeedback.username ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div class="field-group">
        <label for={passwordId} class="field-label text-glass-secondary"
          >Password</label
        >
        <div class="field-content glass-field">
          <span id={passwordId} class="field-value text-glass">
            {showPassword ? item.password : "••••••••••••"}
          </span>
          <div class="field-actions">
            <button
              class="field-btn-icon glass-btn haptic-light"
              on:click={togglePasswordVisibility}
              title={showPassword ? "Hide password" : "Show password"}
              aria-label="{showPassword
                ? 'Hide'
                : 'Show'} password for {item.title}"
            >
              <span
                class="action-icon"
                style="display: flex; align-items: center; justify-content: center;"
              >
                <svelte:component
                  this={showPassword ? EyeOff : Eye}
                  size={18}
                  strokeWidth={1.5}
                />
              </span>
            </button>
            <button
              class="field-btn glass-btn-primary haptic-medium"
              on:click={() => copyToClipboard(item.password || "", "password")}
              aria-label="Copy password for {item.title}"
            >
              {copyFeedback.password ? "✓ Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {#if item.note}
        <div class="field-group">
          <label for={noteId} class="field-label text-glass-secondary"
            >Note</label
          >
          <div class="field-content glass-field field-note">
            <span id={noteId} class="field-value text-glass">{item.note}</span>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<!-- Master Password Verification Popup -->
{#if showVerifyPopup}
  <div
    class="verify-backdrop"
    on:click|self={cancelVerify}
    on:keydown={(e) => e.key === "Escape" && cancelVerify()}
    aria-label="Close verification popup"
  >
    <div
      class="verify-popup glass"
      role="dialog"
      aria-modal="true"
      aria-labelledby="verify-title"
      tabindex="-1"
    >
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
          Enter your master password to view this password
        </p>
      </div>
      <div class="verify-body">
        <label for={verifyId} class="sr-only">Master password</label>
        <input
          id={verifyId}
          type="password"
          bind:value={verifyPassword}
          on:keydown={handleVerifyKeydown}
          placeholder="Master password"
          class="glass-input verify-input"
          aria-label="Master password for verification"
          disabled={isVerifying}
        />
        {#if verifyError}
          <div class="verify-error" role="alert">
            <span style="display: flex; align-items: center;"
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
  .vault-card {
    padding: 1.25rem;
    border-radius: 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    cursor: default;
    transition: all 0.2s ease-out;
  }
  :global(.dark) .vault-card {
    background: #18181b;
    border-color: #27272a;
  }
  .vault-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
  }
  :global(.dark) .vault-card:hover {
    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.3);
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  .card-title-section {
    flex: 1;
    min-width: 0;
  }
  .card-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .action-btn {
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .action-btn-edit {
    background: rgba(91, 140, 255, 0.1);
    color: #5b8cff;
  }
  .action-btn-edit:hover {
    background: rgba(91, 140, 255, 0.2);
    transform: scale(1.05);
  }
  :global(.dark) .action-btn-edit {
    background: rgba(91, 140, 255, 0.15);
    color: #60a5fa;
  }
  :global(.dark) .action-btn-edit:hover {
    background: rgba(91, 140, 255, 0.25);
  }
  .action-btn-delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
  .action-btn-delete:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: scale(1.05);
  }
  :global(.dark) .action-btn-delete {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }
  :global(.dark) .action-btn-delete:hover {
    background: rgba(239, 68, 68, 0.25);
  }
  .action-icon {
    font-size: 1.125rem;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .field-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }
  .glass-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    transition: all 0.2s;
  }
  :global(.dark) .glass-field {
    background: #27272a;
    border-color: #3f3f46;
  }
  .glass-field:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
  :global(.dark) .glass-field:hover {
    background: #3f3f46;
    border-color: #52525b;
  }
  .field-note {
    align-items: flex-start;
  }
  .field-value {
    flex: 1;
    font-family: "SF Mono", "Monaco", "Consolas", monospace;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
  }
  .field-note .field-value {
    white-space: pre-wrap;
    word-break: break-word;
  }
  .field-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .field-btn,
  .field-btn-icon {
    padding: 0.5rem 0.875rem;
    font-size: 0.75rem;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 36px;
    white-space: nowrap;
  }
  .field-btn-icon {
    padding: 0.5rem;
    min-width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .field-btn-icon .action-icon {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    .vault-card {
      padding: 1rem;
      border-radius: 18px;
    }
    .card-title {
      font-size: 1rem;
    }
    .action-btn {
      width: 2.5rem;
      height: 2.5rem;
    }
    .action-icon {
      font-size: 1rem;
    }
    .glass-field {
      padding: 0.75rem 0.875rem;
      border-radius: 14px;
    }
    .field-value {
      font-size: 0.8125rem;
    }
    .field-btn {
      padding: 0.5rem 0.75rem;
      font-size: 0.7rem;
    }
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
