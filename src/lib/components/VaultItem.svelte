<script>
  import { editingItem } from '../stores';
  
  export let item;
  export let onDelete;
  
  let showPassword = false;
  let copyFeedback = {};
  
  const categoryIcons = {
    email: '📧',
    banking: '🏦',
    app: '📱',
    website: '🌐',
    work: '💼',
    games: '🎮',
    other: '📌'
  };
  
  const categoryLabels = {
    email: 'Email',
    banking: 'Banking',
    app: 'App',
    website: 'Website',
    work: 'Work',
    games: 'Games',
    other: 'Other'
  };
  
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
  <div class="flex justify-between items-start mb-3">
    <div class="flex-1 mr-2">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.375rem;">
        <h3 class="text-lg font-semibold text-glass truncate" style="margin: 0;">{item.title}</h3>
        {#if item.category}
          <span class="category-tag category-{item.category}" style="font-size: 0.7rem; padding: 0.25rem 0.5rem;">
            {categoryIcons[item.category]} {categoryLabels[item.category]}
          </span>
        {/if}
      </div>
    </div>
    <div class="flex space-x-2 flex-shrink-0">
      <button 
        class="glass-btn haptic-light hover:scale-110" 
        style="padding: 0.5rem; min-width: 40px; min-height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px;"
        on:click={editItem} 
        title="Edit"
      >
        <span style="font-size: 1.125rem;">✏️</span>
      </button>
      <button 
        class="glass-btn-danger haptic-heavy hover:scale-110" 
        style="padding: 0.5rem; min-width: 40px; min-height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px;"
        on:click={() => onDelete(item.id)} 
        title="Delete"
      >
        <span style="font-size: 1.125rem;">🗑️</span>
      </button>
    </div>
  </div>
  
  <div class="space-y-3">
    <div class="space-y-1">
      <span class="field-label text-xs font-medium text-glass-secondary uppercase tracking-wide">Username</span>
      <div class="flex items-center justify-between glass p-3 rounded-lg">
        <span class="text-glass font-mono text-sm flex-1 truncate">{item.username}</span>
        <button 
          class="glass-btn-primary haptic-medium ml-2" 
          style="padding: 0.5rem 0.875rem; font-size: 0.75rem; min-height: 36px;"
          on:click={() => copyToClipboard(item.username, 'username')}
        >
          {copyFeedback.username ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
    
    <div class="space-y-1">
      <span class="field-label text-xs font-medium text-glass-secondary uppercase tracking-wide">Password</span>
      <div class="flex items-center justify-between glass p-3 rounded-lg">
        <span class="text-glass font-mono text-sm flex-1 truncate">
          {showPassword ? item.password : '••••••••••••'}
        </span>
        <div class="flex space-x-2 ml-2">
          <button 
            class="glass-btn haptic-light hover:scale-110" 
            style="padding: 0.5rem; min-width: 36px; min-height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;"
            on:click={() => showPassword = !showPassword}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            <span style="font-size: 1rem;">{showPassword ? '🙈' : '👁️'}</span>
          </button>
          <button 
            class="glass-btn-primary haptic-medium" 
            style="padding: 0.5rem 0.875rem; font-size: 0.75rem; min-height: 36px;"
            on:click={() => copyToClipboard(item.password, 'password')}
          >
            {copyFeedback.password ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
    
    {#if item.note}
      <div class="space-y-1">
        <span class="field-label text-xs font-medium text-glass-secondary uppercase tracking-wide">Note</span>
        <div class="glass p-3 rounded-lg">
          <span class="text-glass text-sm whitespace-pre-wrap">{item.note}</span>
        </div>
      </div>
    {/if}
  </div>
</div>
