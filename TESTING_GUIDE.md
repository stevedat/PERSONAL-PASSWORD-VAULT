# Testing Guide - Fix Edit & Display Issues

## Issues Fixed

### Issue 1: Cannot Edit Items
**Problem**: Tạo password mới được nhưng không edit được  
**Root Cause**: Reactive statements không trigger đúng cách  
**Fix**: Tách reactive statements và thêm logs

### Issue 2: Items Not Showing After Save
**Problem**: Tạo password mới nhưng không hiện, phải refresh và login lại  
**Root Cause**: Store không được update sau khi save  
**Fix**: Đảm bảo `vaultItems.set()` được gọi AFTER successful save

## How to Test

### Test 1: Add New Password

1. **Mở console** (F12)
2. **Click nút "+"** để add password
3. **Check logs:**
   ```
   [Main] Add new password clicked
   [Main] showAddForm store changed: true
   [AddEditForm] Adding new item
   ```
4. **Fill form** và click Save
5. **Check logs:**
   ```
   [AddEditForm] Saving item: {id: "...", isEditing: false, title: "..."}
   [Main] saveItem called: {id: "...", title: "...", isNew: true}
   [Main] Adding new item
   [Main] Updated items count: X
   [Main] Saving with cached password
   [Main] Vault saved successfully
   [Main] Updating vaultItems store
   [Main] Save complete, store updated
   [Main] vaultItems store changed: {count: X, items: [...]}
   [Main] Filtered items updated: {total: X, filtered: X}
   ```
6. **Verify**: Password hiện ngay lập tức trong list

### Test 2: Edit Existing Password

1. **Mở console** (F12)
2. **Click nút ✏️** trên một password
3. **Check logs:**
   ```
   [VaultItem] Edit clicked for item: abc123 Test Password
   [Main] editingItem store changed: {id: "abc123", title: "Test Password"}
   [AddEditForm] Editing item: abc123
   ```
4. **Verify form**: Form hiện với data đã có
5. **Modify** title hoặc password
6. **Click Update**
7. **Check logs:**
   ```
   [AddEditForm] Saving item: {id: "abc123", isEditing: true, title: "..."}
   [Main] saveItem called: {id: "abc123", title: "...", isNew: false}
   [Main] Updating existing item at index: X
   [Main] Updated items count: X
   [Main] Vault saved successfully
   [Main] Updating vaultItems store
   [Main] vaultItems store changed: {count: X, items: [...]}
   [Main] Filtered items updated: {total: X, filtered: X}
   ```
8. **Verify**: Changes hiện ngay lập tức

### Test 3: Cancel Edit

1. **Click ✏️** để edit
2. **Check logs**: Form opens với data
3. **Click Cancel** hoặc click outside
4. **Check logs:**
   ```
   [AddEditForm] Cancelled
   [Main] showAddForm store changed: false
   [Main] editingItem store changed: null
   ```
5. **Verify**: Form đóng, không có changes

### Test 4: Multiple Operations

1. **Add password** → Verify hiện ngay
2. **Edit password** → Verify changes hiện ngay
3. **Add another** → Verify hiện ngay
4. **Edit first one** → Verify changes hiện ngay
5. **Delete one** → Verify biến mất ngay

**Check logs** sau mỗi operation để đảm bảo store được update.

## Expected Console Output

### Successful Add Flow
```
[Main] Add new password clicked
[Main] showAddForm store changed: true
[AddEditForm] Adding new item
[AddEditForm] Saving item: {id: "new123", isEditing: false, title: "Gmail"}
[Main] saveItem called: {id: "new123", title: "Gmail", isNew: true}
[Main] Adding new item
[Main] Updated items count: 3
[Main] Saving with cached password
[AutoBackup] Creating backup for 3 items
[AutoBackup] Backup created: {id: "...", itemCount: 3, sizeKB: "2.5KB"}
[Main] Vault saved successfully
[Main] Updating vaultItems store
[ReminderSystem] Password added, count: 1
[Main] Save complete, store updated
[Main] vaultItems store changed: {count: 3, items: [...]}
[Main] Filtered items updated: {total: 3, filtered: 3}
```

### Successful Edit Flow
```
[VaultItem] Edit clicked for item: abc123 Gmail
[Main] editingItem store changed: {id: "abc123", title: "Gmail"}
[AddEditForm] Editing item: abc123
[AddEditForm] Saving item: {id: "abc123", isEditing: true, title: "Gmail Updated"}
[Main] saveItem called: {id: "abc123", title: "Gmail Updated", isNew: false}
[Main] Updating existing item at index: 0
[Main] Updated items count: 3
[Main] Saving with cached password
[AutoBackup] Creating backup for 3 items
[Main] Vault saved successfully
[Main] Updating vaultItems store
[Main] Save complete, store updated
[Main] vaultItems store changed: {count: 3, items: [...]}
[Main] Filtered items updated: {total: 3, filtered: 3}
```

## Troubleshooting

### Issue: Form không mở khi click Edit
**Check logs:**
- `[VaultItem] Edit clicked` - Có xuất hiện không?
- `[Main] editingItem store changed` - Store có update không?
- `[AddEditForm] Editing item` - Form có nhận được data không?

**Solution**: Nếu không có logs, check browser console cho errors

### Issue: Form mở nhưng không có data
**Check logs:**
- `[AddEditForm] Editing item: abc123` - Có log này không?
- Nếu có nhưng form trống, check reactive statements

**Solution**: Hard refresh (Ctrl+Shift+R)

### Issue: Save thành công nhưng không hiện
**Check logs:**
- `[Main] Vault saved successfully` - Save có thành công không?
- `[Main] Updating vaultItems store` - Store có được update không?
- `[Main] vaultItems store changed` - Store change có trigger không?
- `[Main] Filtered items updated` - Filter có chạy không?

**Solution**: 
1. Nếu không có "Updating vaultItems store" → Bug trong save flow
2. Nếu có nhưng không có "vaultItems store changed" → Store subscription issue
3. Nếu có nhưng không có "Filtered items updated" → Reactive statement issue

### Issue: Edit form hiện data cũ
**Check logs:**
- `[AddEditForm] Editing item: abc123` - ID có đúng không?
- Check data trong log có match với UI không

**Solution**: Clear editingItem store trước khi set mới

## Debug Commands

Mở console và chạy:

```javascript
// Check current vault items
$vaultItems

// Check editing state
$editingItem

// Check form state
$showAddForm

// Force update store (for testing)
vaultItems.set([...vaultItems])
```

## Performance Check

Sau mỗi operation, check:
- **Save time**: < 500ms
- **UI update**: Instant (< 100ms)
- **Auto-backup**: < 200ms
- **No lag**: UI responsive

## Success Criteria

✅ Add new password → Hiện ngay lập tức  
✅ Edit password → Changes hiện ngay lập tức  
✅ Cancel edit → Form đóng, no changes  
✅ Multiple operations → Tất cả hoạt động smooth  
✅ No refresh needed → Mọi thứ real-time  
✅ Console clean → Chỉ có PocketVault logs  

---

**Last Updated**: January 7, 2026  
**Issues Fixed**: Edit functionality + Display after save
