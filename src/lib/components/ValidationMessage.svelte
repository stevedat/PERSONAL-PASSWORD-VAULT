<script>
  export let error = '';
  export let type = 'error'; // 'error', 'warning', 'success'
</script>

{#if error}
  <div class="validation-message {type}">
    <span class="icon">
      {#if type === 'error'}
        ⚠️
      {:else if type === 'warning'}
        ⚠️
      {:else if type === 'success'}
        ✅
      {/if}
    </span>
    <span class="message">{error}</span>
  </div>
{/if}

<style>
  .validation-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .validation-message.error {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
  
  .validation-message.warning {
    background-color: #fffbeb;
    color: #d97706;
    border: 1px solid #fed7aa;
  }
  
  .validation-message.success {
    background-color: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }
  
  .icon {
    flex-shrink: 0;
  }
  
  .message {
    flex: 1;
  }
  
  /* Dark mode */
  :global(.dark) .validation-message.error {
    background-color: #450a0a;
    color: #fca5a5;
    border-color: #7f1d1d;
  }
  
  :global(.dark) .validation-message.warning {
    background-color: #451a03;
    color: #fdba74;
    border-color: #92400e;
  }
  
  :global(.dark) .validation-message.success {
    background-color: #052e16;
    color: #86efac;
    border-color: #166534;
  }
</style>