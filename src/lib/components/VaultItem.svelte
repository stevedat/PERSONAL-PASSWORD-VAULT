<script>
  import { editingItem } from '../stores';
  
  export let item;
  export let onDelete;
  
  let showPassword = false;
  
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      // Simple feedback - could be enhanced with toast notifications
      const button = event && event.target;
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  
  function editItem() {
    editingItem.set(item);
  }
</script>

<div class="glass-card animate-slide-up">
  <div class="flex justify-between items-start mb-4">
    <h3 class="text-lg font-semibold text-glass dark:text-glass-dark truncate flex-1 mr-2">{item.title}</h3>
    <div class="flex space-x-2 flex-shrink-0">
      <button 
        class="glass-btn p-2 text-sm haptic-light hover:scale-110" 
        on:click={editItem} 
        title="Edit"
      >
        ✏️
      </button>
      <button 
        class="glass-btn-danger p-2 text-sm haptic-heavy hover:scale-110" 
        on:click={() => onDelete(item.id)} 
        title="Delete"
      >
        🗑️
      </button>
    </div>
  </div>
  
  <div class="space-y-3">
    <div class="space-y-1">
      <span class="field-label text-xs font-medium text-glass-secondary dark:text-glass-secondary-dark uppercase tracking-wide">Username</span>
      <div class="flex items-center justify-between glass p-3 rounded-lg">
        <span class="text-glass dark:text-glass-dark font-mono text-sm flex-1 truncate">{item.username}</span>
        <button 
          class="glass-btn-primary px-3 py-1 text-xs haptic-medium ml-2" 
          on:click={() => copyToClipboard(item.username)}
        >
          Copy
        </button>
      </div>
    </div>
    
    <div class="space-y-1">
      <span class="field-label text-xs font-medium text-glass-secondary dark:text-glass-secondary-dark uppercase tracking-wide">Password</span>
      <div class="flex items-center justify-between glass p-3 rounded-lg">
        <span class="text-glass dark:text-glass-dark font-mono text-sm flex-1 truncate">
          {showPassword ? item.password : '••••••••••••'}
        </span>
        <div class="flex space-x-2 ml-2">
          <button 
            class="glass-btn p-2 text-xs haptic-light hover:scale-110" 
            on:click={() => showPassword = !showPassword}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
          <button 
            class="glass-btn-primary px-3 py-1 text-xs haptic-medium" 
            on:click={() => copyToClipboard(item.password)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
    
    {#if item.note}
      <div class="space-y-1">
        <span class="field-label text-xs font-medium text-glass-secondary dark:text-glass-secondary-dark uppercase tracking-wide">Note</span>
        <div class="glass p-3 rounded-lg">
          <span class="text-glass dark:text-glass-dark text-sm whitespace-pre-wrap">{item.note}</span>
        </div>
      </div>
    {/if}
  </div>
</div>

