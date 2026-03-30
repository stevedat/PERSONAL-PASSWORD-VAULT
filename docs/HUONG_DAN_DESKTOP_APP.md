# Hướng Dẫn Build Desktop App

Hướng dẫn đầy đủ để tạo ứng dụng desktop PocketVault cho macOS và Windows.

## Yêu Cầu

### Phần Mềm Cần Thiết

1. **Node.js 18+**
   - Tải từ https://nodejs.org/
   - Kiểm tra: `node --version`

2. **npm** (đi kèm Node.js)
   - Kiểm tra: `npm --version`

## Hướng Dẫn Build Từng Bước

### 1. Cài Đặt Dependencies

```bash
npm install
```

### 2. Build Web App

```bash
npm run build
```

### 3. Build Desktop App

#### Build cho macOS

```bash
npm run electron:build:mac
```

**File output trong `dist-electron/`:**
- `PocketVault-1.0.0.dmg` - File cài đặt (khuyên dùng)
- `PocketVault-1.0.0-mac.zip` - File nén ZIP

**Thời gian build:** 2-5 phút

#### Build cho Windows

```bash
npm run electron:build:win
```

**File output trong `dist-electron/`:**
- `PocketVault Setup 1.0.0.exe` - File cài đặt (khuyên dùng)
- `PocketVault 1.0.0.exe` - Phiên bản portable (không cần cài)

**Thời gian build:** 3-7 phút

#### Build cho Cả Hai Platform

```bash
npm run electron:build:all
```

Build cả macOS và Windows cùng lúc.

**Thời gian build:** 5-12 phút

### 4. Test App

#### Test Trước Khi Build

```bash
npm run electron:dev
```

Mở app ở chế độ development để test.

#### Test App Đã Build

**macOS:**
```bash
open dist-electron/mac/PocketVault.app
```

**Windows:**
```bash
start dist-electron/win-unpacked/PocketVault.exe
```

## Phân Phối

### Kích Thước File

Kích thước ước tính:
- macOS DMG: ~80-120 MB
- Windows Installer: ~70-100 MB
- Windows Portable: ~70-100 MB

### File Nên Chia Sẻ

**Cho người dùng macOS:**
- `PocketVault-{version}.dmg` - File cài đặt universal

**Cho người dùng Windows:**
- `PocketVault Setup {version}.exe` - File cài đặt (đa số người dùng)
- `PocketVault {version}.exe` - Portable (người dùng nâng cao)

### Upload lên GitHub Releases

1. Vào repository GitHub của bạn
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Upload các file đã build
5. Viết release notes
6. Publish release

## Tạo Icon App (Tùy Chọn)

### Phương Pháp Nhanh (Online)

1. Dùng `static/favicon.svg` hoặc tạo PNG 512x512
2. Vào https://cloudconvert.com/
3. Convert sang:
   - `icon.icns` cho macOS
   - `icon.ico` cho Windows
   - `icon.png` cho Linux
4. Đặt file vào `electron/resources/`

### Phương Pháp Command Line (macOS/Linux)

Nếu có ImageMagick:

```bash
cd electron/resources

# Tạo PNG từ SVG
convert -background none -size 512x512 ../../static/favicon.svg icon.png

# Tạo Windows ICO
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

# Tạo macOS ICNS (chỉ trên macOS)
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
cp icon.png icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
rm -rf icon.iconset

cd ../..
```

## Xử Lý Lỗi

### Build Thất Bại

**Lỗi: "Cannot find module 'electron'"**

Giải pháp:
```bash
npm install
```

**Lỗi: "ENOENT: no such file or directory, open 'build/index.html'"**

Giải pháp:
```bash
npm run build
npm run electron:build
```

### macOS: "App is damaged"

Xảy ra với app chưa ký. Người dùng có thể bypass:

```bash
xattr -cr /Applications/PocketVault.app
```

Hoặc: Click phải app → Open → Open anyway

### Windows: Cảnh Báo SmartScreen

Với app chưa ký, người dùng thấy cảnh báo:
1. Click "More info"
2. Click "Run anyway"

Đây là bình thường với app chưa ký.

### File Quá Lớn

App Electron lớn vì bao gồm:
- Chromium browser engine
- Node.js runtime
- Code app của bạn

Đây là bình thường. Kích thước thông thường: 70-120 MB.

### Build Chậm

Build đầu tiên chậm (5-12 phút) vì phải download dependencies.
Build sau nhanh hơn (2-5 phút).

Tăng tốc build:
```bash
# Chỉ build cho platform của bạn
npm run electron:build:mac  # Trên macOS
npm run electron:build:win  # Trên Windows
```

## Cấu Hình Nâng Cao

### Đổi Tên App

Sửa `package.json`:

```json
"build": {
  "productName": "TenAppCuaBan",
  "appId": "com.congty.tenapp"
}
```

### Đổi Version App

Sửa `package.json`:

```json
"version": "1.0.1"
```

### Giảm Kích Thước File

1. Xóa dependencies không dùng
2. Bật compression:

```json
"build": {
  "compression": "maximum",
  "asar": true
}
```

## Ký Code (Tùy Chọn)

### Tại Sao Nên Ký Code?

- Xóa cảnh báo bảo mật
- Người dùng cài đặt dễ dàng hơn
- Trông chuyên nghiệp
- Bắt buộc cho Mac App Store

### Ký Code macOS

**Yêu cầu:**
- Tài khoản Apple Developer ($99/năm)
- Certificate Developer ID Application

**Các bước:**

1. Lấy certificate từ Apple Developer portal
2. Cài certificate vào Keychain
3. Cập nhật `package.json`:

```json
"mac": {
  "identity": "Developer ID Application: Tên Bạn (TEAM_ID)"
}
```

4. Build:
```bash
npm run electron:build:mac
```

### Ký Code Windows

**Yêu cầu:**
- Certificate ký code (từ DigiCert, Sectigo, v.v.)
- File certificate (.pfx hoặc .p12)

**Các bước:**

1. Mua certificate ký code
2. Lưu file certificate
3. Cập nhật `package.json`:

```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "mat-khau-cua-ban"
}
```

4. Build:
```bash
npm run electron:build:win
```

## Checklist Test

Trước khi phân phối, test:

- [ ] App khởi động thành công
- [ ] Tất cả tính năng hoạt động (thêm, sửa, xóa mật khẩu)
- [ ] Backup/restore hoạt động
- [ ] Mở khóa bằng Master Password
- [ ] Chuyển dark/light mode
- [ ] Chuyển ngôn ngữ (EN/VI)
- [ ] Nội dung Guide hiển thị đúng
- [ ] Keyboard shortcuts hoạt động
- [ ] Resize và di chuyển window
- [ ] Menu items hoạt động
- [ ] Link mở trong browser
- [ ] App đóng đúng cách

## Hỗ Trợ

Nếu có vấn đề hoặc câu hỏi:
- GitHub Issues: https://github.com/stevedat/PERSONAL-PASSWORD-VAULT/issues
- Email: eduflows.app@gmail.com

## Tóm Tắt

✅ Desktop app đã được triển khai đầy đủ
✅ Hỗ trợ macOS, Windows, và Linux
✅ Bảo mật giống phiên bản web
✅ Tài liệu đầy đủ
✅ Scripts build đã cấu hình
✅ Sẵn sàng phân phối

**Thời gian build:** 5-12 phút cho lần đầu, 2-5 phút cho lần sau

**Bước tiếp theo:** Chạy `npm run electron:build:all` để tạo app!
