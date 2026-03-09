<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let showPrompt = false;
  /** @type {any} */
  let deferredPrompt = null;
  let isIOS = false;
  let isStandalone = false;

  onMount(() => {
    if (!browser) return;

    // Check if already installed (standalone mode)
    isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      /** @type {any} */ (window.navigator).standalone === true;

    // Check if iOS
    isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    // Check if user already dismissed the prompt
    const dismissed = localStorage.getItem("pwa-install-dismissed");

    // Only show if not installed and not dismissed
    if (!isStandalone && !dismissed) {
      // For iOS, show custom prompt
      if (isIOS) {
        showPrompt = true;
      }

      // For Android/Desktop, capture the beforeinstallprompt event
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showPrompt = true;
      });
    }
  });

  async function handleInstall() {
    if (isIOS) {
      // iOS doesn't support programmatic install, just show instructions
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    // Clear the deferredPrompt
    deferredPrompt = null;
    showPrompt = false;
  }

  function dismissPrompt() {
    showPrompt = false;
    localStorage.setItem("pwa-install-dismissed", "true");
  }
</script>

{#if showPrompt}
  <div class="install-prompt glass animate-slide-up">
    <div class="prompt-content">
      <div class="prompt-icon">📱</div>
      <div class="prompt-text">
        <h3 class="prompt-title text-glass">Install PocketVault</h3>
        {#if isIOS}
          <p class="prompt-subtitle text-glass-secondary">
            Tap <span class="share-icon">⬆️</span> then "Add to Home Screen"
          </p>
        {:else}
          <p class="prompt-subtitle text-glass-secondary">
            Install app for quick access and offline use
          </p>
        {/if}
      </div>
    </div>

    <div class="prompt-actions">
      <button
        class="prompt-btn prompt-btn-dismiss glass-btn haptic-light"
        on:click={dismissPrompt}
      >
        Not now
      </button>
      {#if !isIOS}
        <button
          class="prompt-btn prompt-btn-install glass-btn-primary haptic-medium"
          on:click={handleInstall}
        >
          Install
        </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .install-prompt {
    position: fixed;
    bottom: 5rem;
    left: 1rem;
    right: 1rem;
    padding: 1rem;
    border-radius: 16px;
    z-index: 80;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    animation: slideUp 0.3s ease-out;
  }

  :global(.dark) .install-prompt {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .prompt-content {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .prompt-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .prompt-text {
    flex: 1;
    min-width: 0;
  }

  .prompt-title {
    font-size: 0.9375rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  .prompt-subtitle {
    font-size: 0.8125rem;
    margin: 0;
    opacity: 0.85;
  }

  .share-icon {
    display: inline-block;
    font-size: 1rem;
    vertical-align: middle;
  }

  .prompt-actions {
    display: flex;
    gap: 0.5rem;
  }

  .prompt-btn {
    flex: 1;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 40px;
  }

  .prompt-btn-dismiss {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.7);
  }

  :global(.dark) .prompt-btn-dismiss {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
  }

  .prompt-btn-dismiss:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  :global(.dark) .prompt-btn-dismiss:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Tablet optimization */
  @media (min-width: 768px) {
    .install-prompt {
      left: 50%;
      transform: translateX(-50%);
      max-width: 400px;
      bottom: 6rem;
    }
  }

  /* Animation */
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet animation */
  @media (min-width: 768px) {
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translate(-50%, 20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
  }
</style>
