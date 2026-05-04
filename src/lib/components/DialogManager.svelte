<script lang="ts">
  import { Dialog } from "$lib/dialogStore";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let inputElement: HTMLInputElement;
  let inputValue = "";

  $: if ($Dialog) {
    if ($Dialog.type === "prompt") {
      inputValue = $Dialog.defaultValue || "";
      // Auto focus input when dialog opens
      setTimeout(() => {
        if (inputElement) inputElement.focus();
      }, 50);
    }
  }

  function handleCancel() {
    if (!$Dialog) return;
    if ($Dialog.type === "prompt") {
      Dialog.resolveCurrent(null);
    } else if ($Dialog.type === "confirm") {
      Dialog.resolveCurrent(false);
    } else {
      Dialog.resolveCurrent(undefined);
    }
  }

  function handleConfirm() {
    if (!$Dialog) return;
    if ($Dialog.type === "prompt") {
      Dialog.resolveCurrent(inputValue);
    } else if ($Dialog.type === "confirm") {
      Dialog.resolveCurrent(true);
    } else {
      Dialog.resolveCurrent(undefined);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!$Dialog) return;
    
    if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleConfirm();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

{#if $Dialog}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="dialog-backdrop"
    transition:fade={{ duration: 200 }}
    on:click={handleCancel}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="dialog-content glass"
      transition:fly={{ y: 20, duration: 300 }}
      on:click|stopPropagation
    >
      <h3 class="dialog-title text-glass">{$Dialog.title}</h3>
      <p class="dialog-message text-glass-secondary">{$Dialog.message}</p>

      {#if $Dialog.type === "prompt"}
        <div class="dialog-input-container">
          <input
            bind:this={inputElement}
            type={$Dialog.inputType || "text"}
            bind:value={inputValue}
            class="glass-input"
            placeholder="..."
          />
        </div>
      {/if}

      <div class="dialog-actions">
        {#if $Dialog.type !== "alert"}
          <button class="glass-btn haptic-light" on:click={handleCancel}>
            Hủy
          </button>
        {/if}
        <button
          class="glass-btn-primary haptic-medium"
          on:click={handleConfirm}
        >
          OK
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
  }

  .dialog-content {
    width: 100%;
    max-width: 400px;
    padding: 1.5rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  :global(.dark-mode) .dialog-content {
    background: rgba(30, 30, 30, 0.85);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .dialog-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .dialog-message {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .dialog-input-container {
    margin-top: 0.5rem;
  }

  .dialog-input-container input {
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: 12px;
    font-size: 1rem;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .dialog-actions button {
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9375rem;
    min-width: 80px;
  }
</style>
