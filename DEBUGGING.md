# Debugging Guide - PocketVault

## Console Logging System

PocketVault now includes comprehensive console logging to help trace issues and debug problems. All logs are prefixed with their service name for easy filtering.

## Log Prefixes

### Core Services
- `[BackupManager]` - Export and backup operations
- `[RestoreManager]` - Import and restore operations
- `[ReminderSystem]` - Backup reminder logic
- `[AutoBackup]` - Automatic backup operations
- `[Main]` - Main application flow

## How to Use Console Logs

### 1. Open Browser DevTools
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
- **Safari**: Enable Developer menu first, then `Cmd+Option+C`

### 2. Filter Logs by Service

In the Console tab, use the filter box to show only specific logs:

```
[BackupManager]     - See only backup operations
[RestoreManager]    - See only import operations
[ReminderSystem]    - See only reminder logic
[AutoBackup]        - See only auto-backup operations
[Main]              - See only main app flow
```

### 3. Common Debugging Scenarios

#### Export Not Working
Filter by: `[BackupManager]` or `[Main]`

Expected log sequence:
```
[Main] Export vault initiated
[Main] Using cached master password
[BackupManager] Quick export started for X items
[BackupManager] Quick export complete: XXXX bytes
[Main] Export successful: pocketvault-backup-YYYY-MM-DD.vault
```

If you see errors, check:
- Master password validity
- Encryption errors
- Browser storage quota

#### Import Failing
Filter by: `[RestoreManager]` or `[Main]`

Expected log sequence:
```
[Main] Import initiated: filename.vault
[RestoreManager] Validating file: filename.vault
[RestoreManager] File parsed successfully
[RestoreManager] Verifying checksum...
[RestoreManager] Checksum verified
[RestoreManager] Validation successful
[RestoreManager] Starting import...
[RestoreManager] Decrypting vault...
[RestoreManager] Decryption complete, items: X
[RestoreManager] Merging vaults...
[RestoreManager] Merge preview: {newCount: X, updatedCount: Y, unchangedCount: Z}
[Main] Import successful, merge stats: {...}
```

If import fails, check:
- File format (must be .vault)
- File integrity (checksum validation)
- Master password correctness
- File corruption

#### Reminders Not Showing
Filter by: `[ReminderSystem]` or `[Main]`

Expected log sequence:
```
[Main] Checking reminders...
[ReminderSystem] Checking reminder conditions: {
  enabled: true,
  neverShow: false,
  shownThisSession: false,
  passwordsSinceBackup: X,
  daysSinceBackup: Y,
  lastBackupDate: "..."
}
[ReminderSystem] Triggering password-count reminder
[Main] Showing reminder: password-count
```

If reminders don't show, check:
- `enabled: true` - Reminders are enabled
- `neverShow: false` - User hasn't disabled permanently
- `shownThisSession: false` - Not already shown this session
- Password count or days threshold met

#### Auto-Backup Not Creating
Filter by: `[AutoBackup]`

Expected log sequence:
```
[AutoBackup] Creating backup for X items
[AutoBackup] Backup created: {
  id: "backup_...",
  itemCount: X,
  size: XXXX,
  sizeKB: "XX.XX KB"
}
[AutoBackup] Backup saved to IndexedDB
[AutoBackup] Rotating backups: {current: X, max: 3}
```

If auto-backup fails, check:
- Auto-backup enabled in config
- IndexedDB available
- Storage quota not exceeded
- Master password cached

## Log Levels

### Info Logs (Normal Operation)
- Operation started
- Operation completed
- Statistics and counts
- File information

### Error Logs (Problems)
- Validation failures
- Encryption/decryption errors
- File format issues
- Storage errors

## Example Debugging Sessions

### Scenario 1: Export Creates File But Can't Import It

**Steps:**
1. Filter console by `[BackupManager]`
2. Export vault and check logs
3. Note the checksum in logs: `Checksum: abc123...`
4. Filter by `[RestoreManager]`
5. Try to import the file
6. Check if checksum matches

**Common Issues:**
- Checksum mismatch = File corrupted during download
- Invalid format = File was modified
- Wrong password = User entered different password

### Scenario 2: Reminders Not Triggering After 5 Passwords

**Steps:**
1. Filter by `[ReminderSystem]`
2. Add 5 passwords and check logs after each
3. Look for: `Password added, count: X`
4. After 5th password, check: `Checking reminder conditions`
5. Verify `passwordsSinceBackup >= 5`

**Common Issues:**
- Counter not incrementing = `recordPasswordAdd()` not called
- Reminder disabled = User clicked "Don't remind again"
- Already shown = `shownThisSession: true`

### Scenario 3: Vercel 404 Errors

**Steps:**
1. Open browser console on deployed site
2. Look for 404 errors for `.js` files
3. Note the file hashes in error messages
4. Check if HTML references match actual files
5. Filter by `[Main]` to see if app initializes

**Common Issues:**
- Stale build cache on Vercel
- Asset hash mismatch
- Service Worker caching old files

**Solution:**
```bash
# Clear Vercel cache and redeploy
./fix-vercel-deploy.sh
```

## Performance Monitoring

### Track Operation Times

Use browser DevTools Performance tab:
1. Start recording
2. Perform operation (export/import)
3. Stop recording
4. Look for long-running operations

### Expected Performance
- Export 100 items: < 200ms
- Import 100 items: < 500ms
- Auto-backup: < 100ms
- Reminder check: < 10ms

## Storage Inspection

### IndexedDB
1. DevTools → Application tab
2. Storage → IndexedDB → PocketVaultDB
3. Check stores:
   - `vault` - Main encrypted vault
   - `auto-backups` - Automatic backups

### LocalStorage
1. DevTools → Application tab
2. Storage → Local Storage
3. Check keys:
   - `pv_reminder_prefs` - Reminder preferences
   - `pv_reminder_stats` - Reminder statistics
   - `pv_autobackup_config` - Auto-backup config

### SessionStorage
1. DevTools → Application tab
2. Storage → Session Storage
3. Check keys:
   - `pv_master_key` - Cached master password (cleared on lock)

## Common Error Messages

### "Export failed: Invalid master password"
**Cause:** Master password incorrect or session expired  
**Solution:** Re-enter master password  
**Logs:** Check `[BackupManager]` for encryption errors

### "Import failed: Invalid vault file format"
**Cause:** File is not a valid .vault file  
**Solution:** Ensure file is exported from PocketVault  
**Logs:** Check `[RestoreManager]` validation logs

### "File integrity check failed"
**Cause:** Checksum mismatch, file corrupted  
**Solution:** Re-export vault and try again  
**Logs:** Check `[RestoreManager]` checksum comparison

### "Auto-backup failed"
**Cause:** IndexedDB error or storage quota exceeded  
**Solution:** Clear browser data or increase quota  
**Logs:** Check `[AutoBackup]` for specific error

## Disable Logging for Production

If you want to disable verbose logging in production:

1. Create a `src/lib/logger.ts`:
```typescript
const isDev = import.meta.env.DEV;

export const log = {
  info: (...args: any[]) => isDev && console.log(...args),
  error: (...args: any[]) => console.error(...args), // Always log errors
  warn: (...args: any[]) => isDev && console.warn(...args)
};
```

2. Replace `console.log` with `log.info` in all services
3. Keep `console.error` for critical errors

## Report Issues

When reporting issues, include:
1. Full console logs (filtered by relevant service)
2. Browser and version
3. Steps to reproduce
4. Expected vs actual behavior
5. Any error messages

**Export Console Logs:**
1. Right-click in console
2. Select "Save as..."
3. Attach to issue report

---

**Last Updated**: January 7, 2026  
**Logging Added**: All core services  
**Log Prefixes**: 5 services tracked
