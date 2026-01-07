export type ReminderType = 'password-count' | 'time-based' | 'first-time';
export type DismissOption = 'later' | 'never' | 'done';

export interface ReminderStats {
  passwordsSinceBackup: number;
  daysSinceBackup: number;
  lastBackupDate: Date | null;
  remindersDismissed: number;
}

export interface ReminderPreferences {
  enabled: boolean;
  passwordThreshold: number;
  dayThreshold: number;
  neverShow: boolean;
  shownThisSession: boolean;
}

export class ReminderSystem {
  private static readonly STORAGE_KEY = 'pv_reminder_prefs';
  private static readonly STATS_KEY = 'pv_reminder_stats';
  private static readonly DEFAULT_PASSWORD_THRESHOLD = 5;
  private static readonly DEFAULT_DAY_THRESHOLD = 30;
  
  /**
   * Check if reminder should be shown
   */
  static shouldShowReminder(): ReminderType | null {
    if (typeof window === 'undefined') return null;
    
    const prefs = this.loadPreferences();
    
    // Check if reminders are disabled
    if (!prefs.enabled || prefs.neverShow) {
      return null;
    }
    
    // Check if already shown this session
    if (prefs.shownThisSession) {
      return null;
    }
    
    const stats = this.getStats();
    
    // Check password count threshold
    if (stats.passwordsSinceBackup >= prefs.passwordThreshold) {
      return 'password-count';
    }
    
    // Check time-based threshold
    if (stats.daysSinceBackup >= prefs.dayThreshold) {
      return 'time-based';
    }
    
    // Check if first time (no backup ever)
    if (stats.lastBackupDate === null && stats.passwordsSinceBackup > 0) {
      return 'first-time';
    }
    
    return null;
  }
  
  /**
   * Mark reminder as shown for this session
   */
  static markShownThisSession(): void {
    if (typeof window === 'undefined') return;
    
    const prefs = this.loadPreferences();
    prefs.shownThisSession = true;
    this.savePreferences(prefs);
  }
  
  /**
   * Handle reminder dismissal
   */
  static dismissReminder(option: DismissOption): void {
    if (typeof window === 'undefined') return;
    
    const prefs = this.loadPreferences();
    const stats = this.getStats();
    
    switch (option) {
      case 'later':
        // Just mark as shown this session
        prefs.shownThisSession = true;
        stats.remindersDismissed++;
        break;
        
      case 'never':
        // Disable reminders permanently
        prefs.neverShow = true;
        prefs.enabled = false;
        break;
        
      case 'done':
        // User completed backup, reset counters
        this.recordBackup();
        return;
    }
    
    this.savePreferences(prefs);
    this.saveStats(stats);
  }
  
  /**
   * Record a backup was created
   */
  static recordBackup(): void {
    if (typeof window === 'undefined') return;
    
    const stats: ReminderStats = {
      passwordsSinceBackup: 0,
      daysSinceBackup: 0,
      lastBackupDate: new Date(),
      remindersDismissed: 0
    };
    
    this.saveStats(stats);
    
    // Reset session flag
    const prefs = this.loadPreferences();
    prefs.shownThisSession = false;
    this.savePreferences(prefs);
  }
  
  /**
   * Record a password was added
   */
  static recordPasswordAdd(): void {
    if (typeof window === 'undefined') return;
    
    const stats = this.getStats();
    stats.passwordsSinceBackup++;
    this.saveStats(stats);
  }
  
  /**
   * Get current reminder statistics
   */
  static getStats(): ReminderStats {
    if (typeof window === 'undefined') {
      return this.getDefaultStats();
    }
    
    try {
      const stored = localStorage.getItem(this.STATS_KEY);
      if (!stored) {
        return this.getDefaultStats();
      }
      
      const stats = JSON.parse(stored);
      
      // Calculate days since backup
      if (stats.lastBackupDate) {
        const lastBackup = new Date(stats.lastBackupDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lastBackup.getTime());
        stats.daysSinceBackup = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      }
      
      return stats;
    } catch {
      return this.getDefaultStats();
    }
  }
  
  /**
   * Load reminder preferences
   */
  static loadPreferences(): ReminderPreferences {
    if (typeof window === 'undefined') {
      return this.getDefaultPreferences();
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return this.getDefaultPreferences();
      }
      
      return { ...this.getDefaultPreferences(), ...JSON.parse(stored) };
    } catch {
      return this.getDefaultPreferences();
    }
  }
  
  /**
   * Save reminder preferences
   */
  static savePreferences(prefs: ReminderPreferences): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    } catch (error) {
      console.error('Failed to save reminder preferences:', error);
    }
  }
  
  /**
   * Save reminder statistics
   */
  private static saveStats(stats: ReminderStats): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to save reminder stats:', error);
    }
  }
  
  /**
   * Get default preferences
   */
  private static getDefaultPreferences(): ReminderPreferences {
    return {
      enabled: true,
      passwordThreshold: this.DEFAULT_PASSWORD_THRESHOLD,
      dayThreshold: this.DEFAULT_DAY_THRESHOLD,
      neverShow: false,
      shownThisSession: false
    };
  }
  
  /**
   * Get default statistics
   */
  private static getDefaultStats(): ReminderStats {
    return {
      passwordsSinceBackup: 0,
      daysSinceBackup: 0,
      lastBackupDate: null,
      remindersDismissed: 0
    };
  }
  
  /**
   * Reset session flag (call on app unlock)
   */
  static resetSession(): void {
    if (typeof window === 'undefined') return;
    
    const prefs = this.loadPreferences();
    prefs.shownThisSession = false;
    this.savePreferences(prefs);
  }
  
  /**
   * Enable reminders
   */
  static enableReminders(): void {
    if (typeof window === 'undefined') return;
    
    const prefs = this.loadPreferences();
    prefs.enabled = true;
    prefs.neverShow = false;
    this.savePreferences(prefs);
  }
  
  /**
   * Get reminder message based on type
   */
  static getReminderMessage(type: ReminderType): string {
    const stats = this.getStats();
    
    switch (type) {
      case 'password-count':
        return `You've added ${stats.passwordsSinceBackup} passwords since your last backup. Consider backing up your vault.`;
      
      case 'time-based':
        return `It's been ${stats.daysSinceBackup} days since your last backup. Keep your data safe with a backup.`;
      
      case 'first-time':
        return `You have ${stats.passwordsSinceBackup} passwords in your vault. Create your first backup to keep them safe.`;
      
      default:
        return 'Consider backing up your vault to keep your passwords safe.';
    }
  }
}
