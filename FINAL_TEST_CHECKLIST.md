# Final Test Checklist - PocketVault

## Mục Đích
Kiểm tra kỹ lưỡng tất cả chức năng: Add, Edit, Delete, Update để đảm bảo hoạt động đúng 100%.

## Chuẩn Bị Test

### 1. Mở Console
- Nhấn `F12` hoặc `Ctrl+Shift+I`
- Chọn tab **Console**
- Clear console: Click icon 🚫 hoặc `Ctrl+L`

### 2. Filter Logs (Optional)
Gõ vào filter box để chỉ xem logs quan trọng:
```
[Main]
```

## Test Case 1: ADD NEW PASSWORD ✅

### Bước 1: Click Add Button
1. Click nút **"+"** (floating button góc dưới phải)
2. **Check console:**
   ```
   ✓ [Main] Add new password clicked
   ✓ [Main] showAddForm store changed: true
   ```

### Bước 2: Fill Form
1. Nhập **Title**: `Gmail Test`
2. Nhập **Username**: `test@gmail.com`
3. Nhập **Password**: `TestPass123!`
4. (Optional) Nhập **Note**: `Test note`

### Bước 3: Click Save
1. Click button **"Save"**
2. **Check console (quan trọng):**
   ```
   ✓ [AddEditForm] Saving item: {id: "...", isEditing: false, title: "Gmail Test"}
   ✓ [Main] saveItem called: {id: "...", title: "Gmail Test", isNew: true}
   ✓ [Main] Adding new item
   ✓ [Main] Updated items count: 1
   ✓ [Main] Saving with cached password
   ✓ [AddEditForm] Cancelled
   ✓ [Main] Vault saved to storage
   ✓ [AutoBackup] Creating backup for 1 items
   ✓ [Main] Auto-backup created
   ✓ [Main] Vault saved successfully
   ✓ [Main] Updating vaultItems store with 1 items
   ✓ [Main] Store updated
   ✓ [Main] vaultItems store changed: {count: 1, items: [...]}
   ✓ [Main] Filtered items updated: {total: 1, filtered: 1}
   ```

### Bước 4: Verify UI
1. **Form đóng** - Modal biến mất
2. **Password hiện ngay lập tức** - Không cần refresh
3. **Thấy card** với:
   - Title: "Gmail Test"
   - Username: "test@gmail.com"
   - Password: "••••••••••••"
   - Note (nếu có): "Test note"

### ✅ PASS Criteria
- [ ] Console logs đầy đủ như trên
- [ ] Form đóng sau khi save
- [ ] Password hiện ngay lập tức
- [ ] Không có errors trong console
- [ ] Count tăng lên 1

---

## Test Case 2: EDIT EXISTING PASSWORD ✅

### Bước 1: Click Edit Button
1. Click nút **✏️** trên password vừa tạo
2. **Check console:**
   ```
   ✓ [VaultItem] Edit clicked for item: abc123 Gmail Test
   ✓ [Main] editingItem store changed: {id: "abc123", title: "Gmail Test"}
   ✓ [AddEditForm] Editing item: abc123
   ```
3. **QUAN TRỌNG:** Chỉ thấy `[AddEditForm] Editing item` **1 LẦN**, KHÔNG lặp lại!

### Bước 2: Verify Form Data
1. **Check form có data đúng:**
   - Title: "Gmail Test" ✓
   - Username: "test@gmail.com" ✓
   - Password: "TestPass123!" ✓
   - Note: "Test note" ✓

### Bước 3: Modify Data
1. Đổi **Title** thành: `Gmail Test Updated`
2. Đổi **Password** thành: `NewPass456!`
3. Giữ nguyên Username và Note

### Bước 4: Click Update
1. Click button **"Update"**
2. **Check console:**
   ```
   ✓ [AddEditForm] Saving item: {id: "abc123", isEditing: true, title: "Gmail Test Updated"}
   ✓ [Main] saveItem called: {id: "abc123", title: "Gmail Test Updated", isNew: false}
   ✓ [Main] Updating existing item at index: 0
   ✓ [Main] Updated items count: 1
   ✓ [Main] Saving with cached password
   ✓ [Main] Vault saved to storage
   ✓ [AutoBackup] Creating backup for 1 items
   ✓ [Main] Auto-backup created
   ✓ [Main] Vault saved successfully
   ✓ [Main] Updating vaultItems store with 1 items
   ✓ [Main] Store updated
   ✓ [Main] vaultItems store changed: {count: 1, items: [...]}
   ```

### Bước 5: Verify Changes
1. **Form đóng**
2. **Changes hiện ngay lập tức:**
   - Title: "Gmail Test Updated" ✓
   - Password: Click 👁️ để xem → "NewPass456!" ✓
3. **Count vẫn là 1** (không tăng, không giảm)

### ✅ PASS Criteria
- [ ] Console logs đầy đủ
- [ ] Chỉ 1 log "Editing item" (không lặp)
- [ ] Form có data đúng khi mở
- [ ] Changes hiện ngay lập tức
- [ ] Count không thay đổi (vẫn 1)
- [ ] Không có errors

---

## Test Case 3: EDIT MULTIPLE TIMES ✅

### Bước 1: Edit Lần 1
1. Click ✏️ → Đổi title → Update
2. **Verify:** Changes hiện ngay

### Bước 2: Edit Lần 2 (Ngay Sau Đó)
1. Click ✏️ lại trên cùng password
2. **Check console:** Chỉ 1 log "Editing item"
3. Đổi password → Update
4. **Verify:** Changes hiện ngay

### Bước 3: Edit Lần 3
1. Click ✏️ lại
2. Đổi note → Update
3. **Verify:** Changes hiện ngay

### ✅ PASS Criteria
- [ ] Có thể edit nhiều lần liên tiếp
- [ ] Mỗi lần chỉ 1 log "Editing item"
- [ ] Changes luôn hiện ngay lập tức
- [ ] Count không thay đổi
- [ ] Không có errors

---

## Test Case 4: DELETE PASSWORD ✅

### Bước 1: Click Delete Button
1. Click nút **🗑️** trên password
2. **Confirm dialog xuất hiện:** "Are you sure you want to delete this item?"
3. Click **OK**

### Bước 2: Check Console
```
✓ [Main] Delete item: abc123
✓ [Main] Deleting item, new count: 0
✓ [Main] vaultItems store changed: {count: 0, items: []}
✓ [Main] Item deleted, vault updated
✓ [Main] Filtered items updated: {total: 0, filtered: 0}
```

### Bước 3: Verify UI
1. **Password biến mất ngay lập tức**
2. **Hiện empty state:**
   - Icon: 🔐
   - Text: "Your vault is empty"
   - Subtext: "Add your first password to get started"
3. **Count = 0**

### ✅ PASS Criteria
- [ ] Confirm dialog xuất hiện
- [ ] Console logs đầy đủ
- [ ] Password biến mất ngay lập tức
- [ ] Empty state hiện ra
- [ ] Count giảm xuống 0
- [ ] Không có errors

---

## Test Case 5: ADD MULTIPLE PASSWORDS ✅

### Bước 1: Add Password 1
1. Click + → Fill form → Save
2. **Verify:** Password 1 hiện ra, count = 1

### Bước 2: Add Password 2
1. Click + → Fill form → Save
2. **Verify:** Password 2 hiện ra, count = 2
3. **Check:** Cả 2 passwords đều hiện

### Bước 3: Add Password 3
1. Click + → Fill form → Save
2. **Verify:** Password 3 hiện ra, count = 3
3. **Check:** Cả 3 passwords đều hiện

### ✅ PASS Criteria
- [ ] Có thể add nhiều passwords liên tiếp
- [ ] Mỗi password hiện ngay sau khi save
- [ ] Count tăng đúng (1 → 2 → 3)
- [ ] Tất cả passwords đều hiện trong list
- [ ] Không có errors

---

## Test Case 6: MIXED OPERATIONS ✅

### Scenario: Add → Edit → Add → Delete → Edit

1. **Add** password "Test 1"
   - Verify: Hiện ra, count = 1

2. **Edit** "Test 1" → "Test 1 Updated"
   - Verify: Changes hiện, count vẫn 1

3. **Add** password "Test 2"
   - Verify: Hiện ra, count = 2

4. **Delete** "Test 1 Updated"
   - Verify: Biến mất, count = 1

5. **Edit** "Test 2" → "Test 2 Modified"
   - Verify: Changes hiện, count vẫn 1

### ✅ PASS Criteria
- [ ] Tất cả operations hoạt động smooth
- [ ] Count luôn đúng sau mỗi operation
- [ ] Không cần refresh
- [ ] Không có errors
- [ ] UI responsive

---

## Test Case 7: CANCEL OPERATIONS ✅

### Test Cancel Add
1. Click + → Fill form → Click **Cancel**
2. **Verify:**
   - Form đóng
   - Không có password mới
   - Count không thay đổi

### Test Cancel Edit
1. Click ✏️ → Modify data → Click **Cancel**
2. **Verify:**
   - Form đóng
   - Data không thay đổi
   - Count không thay đổi

### Test Cancel Delete
1. Click 🗑️ → Click **Cancel** trong confirm dialog
2. **Verify:**
   - Password vẫn còn
   - Count không thay đổi

### ✅ PASS Criteria
- [ ] Cancel add không tạo password mới
- [ ] Cancel edit không thay đổi data
- [ ] Cancel delete không xoá password
- [ ] Không có errors

---

## Test Case 8: BACKGROUND/FOREGROUND ✅

### Test App Background
1. Add/Edit một password
2. **Switch tab** hoặc minimize browser
3. **Check console:** `App backgrounded`
4. Đợi 10 giây
5. **Check console:** `Vault locked: background`

### Test App Foreground
1. Switch back to PocketVault tab
2. **Check console:** `App foregrounded`
3. **Verify:** Unlock screen hiện ra
4. Unlock lại
5. **Verify:** Passwords vẫn còn đầy đủ

### ✅ PASS Criteria
- [ ] App lock sau 10s background
- [ ] Unlock screen hiện khi foreground
- [ ] Passwords không bị mất sau unlock
- [ ] Count đúng sau unlock

---

## Test Case 9: SEARCH FUNCTIONALITY ✅

### Setup
1. Add 3 passwords:
   - "Gmail" / "user1@gmail.com"
   - "Facebook" / "user2@fb.com"
   - "Twitter" / "user3@twitter.com"

### Test Search by Title
1. Gõ "Gmail" vào search box
2. **Verify:** Chỉ hiện Gmail
3. **Check console:** `[Main] Filtered items updated: {total: 3, filtered: 1}`

### Test Search by Username
1. Gõ "user2" vào search box
2. **Verify:** Chỉ hiện Facebook
3. **Check console:** `[Main] Filtered items updated: {total: 3, filtered: 1}`

### Test Clear Search
1. Clear search box
2. **Verify:** Hiện cả 3 passwords
3. **Check console:** `[Main] Filtered items updated: {total: 3, filtered: 3}`

### ✅ PASS Criteria
- [ ] Search by title hoạt động
- [ ] Search by username hoạt động
- [ ] Clear search hiện tất cả
- [ ] Filtered count đúng

---

## Test Case 10: AUTO-BACKUP ✅

### Test Backup Creation
1. Add password
2. **Check console:** `[AutoBackup] Creating backup for 1 items`
3. Edit password
4. **Check console:** `[AutoBackup] Creating backup for 1 items`
5. Delete password
6. **Check console:** Auto-backup được tạo

### ✅ PASS Criteria
- [ ] Auto-backup sau mỗi add
- [ ] Auto-backup sau mỗi edit
- [ ] Auto-backup sau mỗi delete
- [ ] Logs hiện đầy đủ

---

## FINAL CHECKLIST ✅

### Core Functionality
- [ ] ✅ Add new password hoạt động
- [ ] ✅ Edit password hoạt động
- [ ] ✅ Delete password hoạt động
- [ ] ✅ Multiple operations hoạt động
- [ ] ✅ Cancel operations hoạt động

### UI/UX
- [ ] ✅ Changes hiện ngay lập tức (no refresh)
- [ ] ✅ Count luôn đúng
- [ ] ✅ Empty state hiện khi không có passwords
- [ ] ✅ Search hoạt động
- [ ] ✅ Copy buttons hoạt động

### Performance
- [ ] ✅ No reactive loops (chỉ 1 log per edit)
- [ ] ✅ Save < 500ms
- [ ] ✅ UI responsive
- [ ] ✅ No lag

### Logging
- [ ] ✅ All operations có logs đầy đủ
- [ ] ✅ Có thể trace mọi operation
- [ ] ✅ Error logs rõ ràng

### Security
- [ ] ✅ Auto-lock sau 10s background
- [ ] ✅ Master password cached trong session
- [ ] ✅ Auto-backup hoạt động
- [ ] ✅ Data encrypted

---

## KẾT LUẬN

### ✅ PASS - Ready for Production
Nếu tất cả test cases trên PASS:
```bash
git add .
git commit -m "feat: complete CRUD operations with comprehensive testing"
git push
```

### ❌ FAIL - Need Fixes
Nếu có bất kỳ test case nào FAIL:
1. Note lại test case nào fail
2. Copy console logs
3. Report issue với chi tiết
4. Fix và test lại

---

**Last Updated**: January 7, 2026  
**Test Coverage**: 10 test cases, 50+ checkpoints  
**Status**: Ready for final testing
