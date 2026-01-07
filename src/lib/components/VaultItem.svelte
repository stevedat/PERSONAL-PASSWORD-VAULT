<script>
  import { editingItem } from '../stores';
  
  export let item;
  export let onDelete;
  
  let showPassword = false;
  let copyFeedback = {};
  
  async function copyToClipboard(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Show feedback for this specific field
      copyFeedback[field] = true;
      setTimeout(() => {
        copyFeedback[field] = false;
        copyFeedback = { ...copyFeedback }; // Trigger reactivity
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      copyFeedback[field] = true;
      setTimeout(() => {
        copyFeedback[field] = false;
        copyFeedback = { ...copyFeedback };
      }, 1500);
    }
  }
  
  function editItem() {
    console.log('[VaultItem] Edit clicked for item:', item.id, item.title);
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
          on:click={() => copyToClipboard(item.username, 'username')}
        >
          {copyFeedback.username ? '✓ Copied!' : 'Copy'}
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
            on:click={() => copyToClipboard(item.password, 'password')}
          >
            {copyFeedback.password ? '✓ Copied!' : 'Copy'}
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

