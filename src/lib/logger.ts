/**
 * Enhanced logging utility for PocketVault
 * Provides colored console logs with service prefixes
 */

const isDev = import.meta.env?.DEV ?? true;

// Color codes for different log levels
const colors = {
  info: '#3b82f6',      // Blue
  success: '#22c55e',   // Green
  warning: '#f59e0b',   // Orange
  error: '#ef4444',     // Red
  debug: '#8b5cf6'      // Purple
};

// Service-specific colors
const serviceColors: Record<string, string> = {
  BackupManager: '#10b981',    // Emerald
  RestoreManager: '#06b6d4',   // Cyan
  ReminderSystem: '#f59e0b',   // Amber
  AutoBackup: '#8b5cf6',       // Violet
  Main: '#3b82f6'              // Blue
};

/**
 * Create a styled console log
 */
function createLogger(service: string) {
  const color = serviceColors[service] || colors.info;
  
  return {
    info: (...args: any[]) => {
      if (!isDev) return;
      console.log(`%c[${service}]`, `color: ${color}; font-weight: bold`, ...args);
    },
    
    success: (...args: any[]) => {
      console.log(`%c[${service}] ✓`, `color: ${colors.success}; font-weight: bold`, ...args);
    },
    
    error: (...args: any[]) => {
      console.error(`%c[${service}] ✗`, `color: ${colors.error}; font-weight: bold`, ...args);
    },
    
    warn: (...args: any[]) => {
      if (!isDev) return;
      console.warn(`%c[${service}] ⚠`, `color: ${colors.warning}; font-weight: bold`, ...args);
    },
    
    debug: (...args: any[]) => {
      if (!isDev) return;
      console.log(`%c[${service}] 🔍`, `color: ${colors.debug}; font-weight: bold`, ...args);
    },
    
    group: (label: string) => {
      if (!isDev) return;
      console.group(`%c[${service}] ${label}`, `color: ${color}; font-weight: bold`);
    },
    
    groupEnd: () => {
      if (!isDev) return;
      console.groupEnd();
    }
  };
}

// Export loggers for each service
export const BackupLogger = createLogger('BackupManager');
export const RestoreLogger = createLogger('RestoreManager');
export const ReminderLogger = createLogger('ReminderSystem');
export const AutoBackupLogger = createLogger('AutoBackup');
export const MainLogger = createLogger('Main');

// Generic logger
export const Logger = {
  info: (service: string, ...args: any[]) => {
    if (!isDev) return;
    const color = serviceColors[service] || colors.info;
    console.log(`%c[${service}]`, `color: ${color}; font-weight: bold`, ...args);
  },
  
  error: (service: string, ...args: any[]) => {
    const color = serviceColors[service] || colors.error;
    console.error(`%c[${service}] ✗`, `color: ${color}; font-weight: bold`, ...args);
  },
  
  success: (service: string, ...args: any[]) => {
    const color = serviceColors[service] || colors.success;
    console.log(`%c[${service}] ✓`, `color: ${color}; font-weight: bold`, ...args);
  }
};

/**
 * Log app initialization
 */
export function logAppInit() {
  if (!isDev) return;
  
  console.log(
    '%c🔒 PocketVault',
    'color: #3b82f6; font-size: 16px; font-weight: bold; padding: 4px 8px; background: rgba(59, 130, 246, 0.1); border-radius: 4px;'
  );
  console.log(
    '%cEnhanced Logging Enabled',
    'color: #22c55e; font-weight: bold'
  );
  console.log(
    '%cFilter logs by service:',
    'color: #8b5cf6; font-weight: bold'
  );
  console.log('  • [BackupManager] - Export operations');
  console.log('  • [RestoreManager] - Import operations');
  console.log('  • [ReminderSystem] - Backup reminders');
  console.log('  • [AutoBackup] - Auto-backup system');
  console.log('  • [Main] - Main app flow');
  console.log('');
}

/**
 * Suppress browser extension errors
 */
export function suppressExtensionErrors() {
  const suppressedPatterns = [
    'chrome-extension://',
    'extension',
    'completion_list.html',
    'extensionState.js',
    'heuristicsRedefinitions.js',
    'mfbcdcnpokpoajjciilocoachedjkima'
  ];
  
  // Suppress error events
  window.addEventListener('error', (event) => {
    if (event.error && event.error.message) {
      const message = event.error.message.toLowerCase();
      if (suppressedPatterns.some(pattern => message.includes(pattern.toLowerCase()))) {
        event.preventDefault();
        return false;
      }
    }
    
    if (event.filename) {
      const filename = event.filename.toLowerCase();
      if (suppressedPatterns.some(pattern => filename.includes(pattern.toLowerCase()))) {
        event.preventDefault();
        return false;
      }
    }
  }, true);
  
  // Suppress resource loading errors
  window.addEventListener('error', (event) => {
    const target = event.target as any;
    if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
      const src = target.src || target.href || '';
      if (suppressedPatterns.some(pattern => src.includes(pattern))) {
        event.preventDefault();
        return false;
      }
    }
  }, true);
  
  console.log('%c[System] Extension error suppression enabled', 'color: #6b7280; font-style: italic');
}
