# Console Logs - Quick Guide

## Mở Console
- **Chrome/Edge**: `F12` hoặc `Ctrl+Shift+I`
- **Firefox**: `F12` hoặc `Ctrl+Shift+K`  
- **Safari**: `Cmd+Option+C`

## Filter Logs

Gõ vào filter box để chỉ xem logs của service cụ thể:

| Filter | Mô tả |
|--------|-------|
| `[BackupManager]` | Export và backup operations |
| `[RestoreManager]` | Import và restore operations |
| `[ReminderSystem]` | Backup reminder logic |
| `[AutoBackup]` | Auto-backup system |
| `[Main]` | Main app flow |

## Màu Sắc

- 🟢 **BackupManager** - Emerald (xanh lá)
- 🔵 **RestoreManager** - Cyan (xanh dương nhạt)
- 🟠 **ReminderSystem** - Amber (cam)
- 🟣 **AutoBackup** - Violet (tím)
- 🔵 **Main** - Blue (xanh dương)

## Ví Dụ Debug

### Export không hoạt động
Filter: `[BackupManager]` hoặc `[Main]`

Logs mong đợi:
```
[Main] Export vault initiated
[BackupManager] Quick export started for 5 items
[BackupManager] Quick export complete: 2048 bytes
[Main] Export successful: pocketvault-backup-2026-01-07.vault
```

### Import thất bại
Filter: `[RestoreManager]` hoặc `[Main]`

Logs mong đợi:
```
[RestoreManager] Validating file: backup.vault
[RestoreManager] Checksum verified
[RestoreManager] Decryption complete, items: 5
[RestoreManager] Merge preview: {newCount: 2, updatedCount: 3}
```

### Reminder không hiện
Filter: `[ReminderSystem]` hoặc `[Main]`

Logs mong đợi:
```
[ReminderSystem] Checking reminder conditions: {
  passwordsSinceBackup: 5,
  enabled: true
}
[ReminderSystem] Triggering password-count reminder
```

### Auto-backup
Filter: `[AutoBackup]`

Logs mong đợi:
```
[AutoBackup] Creating backup for 5 items
[AutoBackup] Backup created: {id: "...", itemCount: 5, sizeKB: "2.5KB"}
[AutoBackup] Backup saved to IndexedDB
[AutoBackup] Rotating backups: {current: 3, max: 3}
```

## Lỗi Thường Gặp

### Chrome Extension Errors
❌ **Vấn đề**: Console đầy lỗi `chrome-extension://...`  
✅ **Giải pháp**: Đã tự động suppress, không ảnh hưởng app

### Export Failed
❌ **Vấn đề**: `Export failed: Invalid master password`  
✅ **Check**: `[BackupManager]` logs để xem encryption error

### Import Failed  
❌ **Vấn đề**: `Import failed: Invalid vault file format`  
✅ **Check**: `[RestoreManager]` validation logs

### Reminder Không Hiện
❌ **Vấn đề**: Không thấy reminder sau 5 passwords  
✅ **Check**: `[ReminderSystem]` conditions (enabled, shownThisSession, count)

## Tips

1. **Mở console trước khi test** - Để không bỏ lỡ logs
2. **Dùng filter** - Tập trung vào service cần debug
3. **Copy logs** - Right-click → Save as để share
4. **Check timestamps** - Xem thứ tự operations
5. **Look for errors** - Màu đỏ với ✗ symbol

## Production Mode

Trong production build:
- ✅ Error logs vẫn hiện (quan trọng)
- ❌ Info/debug logs bị tắt (giảm noise)
- ✅ Extension errors vẫn bị suppress

## Tắt Logs (Nếu Cần)

Nếu muốn tắt hoàn toàn logs trong production:

1. Edit `src/lib/logger.ts`
2. Đổi `const isDev = import.meta.env?.DEV ?? true;`
3. Thành `const isDev = false;`

---

**Xem thêm**: `DEBUGGING.md` cho hướng dẫn chi tiết
