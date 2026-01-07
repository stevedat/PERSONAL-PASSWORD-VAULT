<script>
  export let type = 'export'; // 'export' or 'import'
  export let show = false;
  export let onClose = () => {}; // Callback to close tooltip
  
  const content = {
    export: {
      icon: '📤',
      title: 'Export Backup',
      steps: [
        'Creates encrypted backup file',
        'Save to iCloud/Google Drive',
        'File is AES-256 encrypted',
        'Only you can decrypt it'
      ],
      security: '🔒 Military-grade encryption'
    },
    import: {
      icon: '📥',
      title: 'Import Backup',
      steps: [
        'Select your .vault file',
        'Enter master password',
        'Choose merge or replace',
        'Data restored securely'
      ],
      security: '✅ Verified & decrypted'
    }
  };
  
  $: info = content[type];
  
  function handleClick(event) {
    // Close tooltip when clicked
    event.stopPropagation();
    onClose();
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="tooltip glass animate-fade-in" on:click={handleClick}>
    <div class="tooltip-header">
      <span class="tooltip-icon">{info.icon}</span>
      <h4 class="tooltip-title text-glass">{info.title}</h4>
    </div>
    
    <ul class="tooltip-steps">
      {#each info.steps as step, i}
        <li class="tooltip-step text-glass-secondary">
          <span class="step-number">{i + 1}</span>
          <span>{step}</span>
        </li>
      {/each}
    </ul>
    
    <div class="tooltip-security">
      <span class="security-badge">{info.security}</span>
    </div>
    
    <div class="tooltip-hint">
      <span style="font-size: 0.6875rem; opacity: 0.6;">Tap to close</span>
    </div>
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: 280px;
    padding: 1rem;
    border-radius: 14px;
    z-index: 100;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    cursor: pointer;
  }

  :global(.dark) .tooltip {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  .tooltip-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .tooltip-icon {
    font-size: 1.5rem;
  }

  .tooltip-title {
    font-size: 0.9375rem;
    font-weight: 600;
    margin: 0;
  }

  .tooltip-steps {
    list-style: none;
    padding: 0;
    margin: 0 0 0.75rem 0;
  }

  .tooltip-step {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.8125rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .tooltip-step:last-child {
    margin-bottom: 0;
  }

  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: rgba(91, 140, 255, 0.15);
    color: #5b8cff;
    font-size: 0.6875rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  :global(.dark) .step-number {
    background: rgba(91, 140, 255, 0.25);
    color: #60a5fa;
  }

  .tooltip-security {
    padding-top: 0.75rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  :global(.dark) .tooltip-security {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .security-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
  }

  :global(.dark) .security-badge {
    background: rgba(34, 197, 94, 0.25);
    color: #4ade80;
  }

  .tooltip-hint {
    text-align: center;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  :global(.dark) .tooltip-hint {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  /* Mobile optimization */
  @media (max-width: 480px) {
    .tooltip {
      width: 260px;
      right: -0.5rem;
    }

    .tooltip-title {
      font-size: 0.875rem;
    }

    .tooltip-step {
      font-size: 0.75rem;
    }
  }

  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.2s ease-out;
  }
</style>
