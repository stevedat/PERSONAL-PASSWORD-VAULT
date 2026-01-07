<script>
  import { ReminderSystem } from '../reminders';
  import { showReminder } from '../stores';
  
  export let onBackupNow = () => {};
  
  $: reminderType = $showReminder;
  $: message = reminderType ? ReminderSystem.getReminderMessage(reminderType) : '';
  
  function handleLater() {
    ReminderSystem.dismissReminder('later');
    showReminder.set(null);
  }
  
  function handleNever() {
    if (confirm('Are you sure you want to disable backup reminders?')) {
      ReminderSystem.dismissReminder('never');
      showReminder.set(null);
    }
  }
  
  function handleBackupNow() {
    onBackupNow();
    ReminderSystem.dismissReminder('done');
    showReminder.set(null);
  }
</script>

{#if reminderType}
  <div class="glass animate-fade-in" style="background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); padding: 1rem; border-radius: 18px; margin-bottom: 1rem;">
    <div style="display: flex; align-items: start; gap: 0.75rem;">
      <div style="font-size: 1.5rem; flex-shrink: 0;">💾</div>
      <div style="flex: 1;">
        <p style="margin: 0 0 0.75rem 0; color: rgba(255,255,255,0.9); font-size: 0.875rem;">
          {message}
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button 
            class="glass-btn-primary haptic-medium" 
            style="padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem;"
            on:click={handleBackupNow}
          >
            Backup Now
          </button>
          <button 
            class="glass-btn haptic-light" 
            style="padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem;"
            on:click={handleLater}
          >
            Remind Later
          </button>
          <button 
            class="glass-btn haptic-light" 
            style="padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem; opacity: 0.7;"
            on:click={handleNever}
          >
            Don't Remind
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
