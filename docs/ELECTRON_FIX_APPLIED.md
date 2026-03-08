# Electron App Fix - macOS Silicon

## Vấn Đề

App mở lên nhưng không hiện màn hình đăng nhập trên macOS chip Silicon.

## Nguyên Nhân

1. **CSP (Content Security Policy)** quá strict - không cho phép app:// protocol
2. **Service Worker** không hoạt động với custom protocol
3. **Dynamic imports** bị block bởi CSP

## Giải Pháp Đã Áp Dụng

### 1. Custom Protocol Handler

Thay vì dùng `file://` protocol, dùng `app://` protocol:

```javascript
// Register custom protocol
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true
    }
  }
]);
```

### 2. Bypass CSP Headers

Remove CSP headers trong Electron:

```javascript
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  const headers = { ...details.responseHeaders };
  delete headers['content-security-policy'];
  delete headers['Content-Security-Policy'];
  callback({ responseHeaders: headers });
});
```

### 3. Service Worker Disabled

Đã disable trong `svelte.config.js`:

```javascript
serviceWorker: {
  register: false
}
```

## Test App

### Clean Test (Xóa Data Cũ)

```bash
# Xóa app data
rm -rf ~/Library/Application\ Support/PocketVault

# Chạy app
npm run electron:dev
```

### Normal Test

```bash
npm run electron:dev
```

## Rebuild App

Sau khi fix, rebuild:

```bash
# Build web app
npm run build

# Build Electron app
npm run electron:build:mac
```

## Kết Quả Mong Đợi

✅ App mở và hiện màn hình đăng nhập
✅ Tất cả chức năng hoạt động
✅ Không có lỗi console
✅ Dynamic imports hoạt động
✅ Routing hoạt động đúng

## Files Đã Sửa

- `electron/main.cjs` - Thêm custom protocol, bypass CSP
- `svelte.config.js` - Disable service worker (đã có từ trước)

## Nếu Vẫn Không Hoạt Động

### Debug Steps

1. **Mở DevTools:**
   - View menu → Toggle Developer Tools
   - Hoặc Cmd+Option+I

2. **Check Console:**
   - Xem có lỗi gì không
   - Check network tab

3. **Check localStorage:**
   ```javascript
   // In DevTools console
   localStorage.getItem('pocketvault-unlocked')
   localStorage.getItem('pocketvault-master-hash')
   ```

4. **Clear Data:**
   ```bash
   # macOS
   rm -rf ~/Library/Application\ Support/PocketVault
   rm -rf ~/Library/Caches/PocketVault
   
   # Hoặc trong app
   # Application tab → Storage → Clear site data
   ```

### Alternative: Use File Protocol

Nếu custom protocol không hoạt động, fallback về file protocol:

```javascript
// In electron/main.cjs
mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
```

Nhưng cần disable webSecurity:

```javascript
webPreferences: {
  webSecurity: false  // Only for development
}
```

## Status

✅ Fix đã được áp dụng
⏳ Cần test trên máy thực
📝 Document đã được tạo

## Next Steps

1. Test app với fix mới
2. Nếu OK → Rebuild production app
3. Upload version mới lên GitHub Releases
4. Update release notes với fix

## Support

Nếu vẫn gặp vấn đề:
- Check console errors
- Share screenshot
- Share console logs
