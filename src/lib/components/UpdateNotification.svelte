<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let showUpdateBanner = false;
  let updateVersion = "";
  let isUpdating = false;

  onMount(() => {
    if (!browser) return;

    // Check if service worker is supported
    if ("serviceWorker" in navigator) {
      // Listen for service worker updates
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "SW_UPDATED") {
          console.log(
            "[UpdateNotification] New version available:",
            event.data.version,
          );
          updateVersion = event.data.version;
          showUpdateBanner = true;
        }
      });

      // Check for updates on page load
      navigator.serviceWorker.ready.then((registration) => {
        // Check for updates every 60 seconds
        setInterval(() => {
          console.log("[UpdateNotification] Checking for updates...");
          registration.update();
        }, 60000);

        // Check immediately
        registration.update();
      });

      // Listen for controller change (new SW activated)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log(
          "[UpdateNotification] Controller changed, new version active",
        );
        if (!showUpdateBanner) {
          // If banner not shown yet, show it now
          showUpdateBanner = true;
        }
      });
    }
  });

  function reloadApp() {
    isUpdating = true;
    console.log("[UpdateNotification] Reloading app to apply updates...");

    // Clear any cached data if needed
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          console.log("[UpdateNotification] Clearing cache:", name);
        });
      });
    }

    // Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  function dismissUpdate() {
    showUpdateBanner = false;
    console.log("[UpdateNotification] Update dismissed");
  }
</script>

{#if showUpdateBanner}
  <div class="update-banner glass animate-slide-down">
    <div class="update-content">
      <div class="update-icon">🎉</div>
      <div class="update-text">
        <h3 class="update-title text-glass">Update Available!</h3>
        <p class="update-subtitle text-glass-secondary">
          {#if updateVersion}
            Version {updateVersion} is ready
          {:else}
            New features and improvements
          {/if}
        </p>
      </div>
    </div>

    <div class="update-actions">
      <button
        class="update-btn update-btn-dismiss glass-btn haptic-light"
        on:click={dismissUpdate}
        disabled={isUpdating}
      >
        Later
      </button>
      <button
        class="update-btn update-btn-reload glass-btn-primary haptic-medium"
        on:click={reloadApp}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Update Now"}
      </button>
    </div>
  </div>
{/if}

<style>
  .update-banner {
    position: fixed;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    padding: 1rem;
    border-radius: 16px;
    z-index: 90;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    animation: slideDown 0.3s ease-out;
  }

  :global(.dark) .update-banner {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .update-content {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    margin-bottom: 0.875rem;
  }

  .update-icon {
    font-size: 2rem;
    flex-shrink: 0;
    animation: bounce 1s ease-in-out infinite;
  }

  .update-text {
    flex: 1;
    min-width: 0;
  }

  .update-title {
    font-size: 0.9375rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  .update-subtitle {
    font-size: 0.8125rem;
    margin: 0;
    opacity: 0.85;
  }

  .update-actions {
    display: flex;
    gap: 0.5rem;
  }

  .update-btn {
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

  .update-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .update-btn-dismiss {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.7);
  }

  :global(.dark) .update-btn-dismiss {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
  }

  .update-btn-dismiss:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.1);
  }

  :global(.dark) .update-btn-dismiss:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Tablet optimization */
  @media (min-width: 768px) {
    .update-banner {
      left: 50%;
      transform: translateX(-50%);
      max-width: 500px;
    }
  }

  /* Animations */
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  /* Tablet animation */
  @media (min-width: 768px) {
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translate(-50%, -20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
  }
</style>
