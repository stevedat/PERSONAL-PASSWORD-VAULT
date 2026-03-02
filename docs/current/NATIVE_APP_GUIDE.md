# Hướng Dẫn Native App - iOS & Android

## Tổng Quan
PocketVault đã được triển khai đầy đủ native app cho iOS và Android sử dụng Capacitor. App hoạt động 100% offline với tất cả tính năng bảo mật enterprise-grade.

## Cài Đặt & Yêu Cầu

### Yêu Cầu Hệ Thống

#### Cho iOS Development:
- macOS (bắt buộc)
- Xcode 14+ (tải từ App Store)
- CocoaPods: `sudo gem install cocoapods`
- iOS Simulator hoặc thiết bị iOS thật
- Apple Developer Account (để deploy lên App Store)

#### Cho Android Development:
- macOS, Windows, hoặc Linux
- Android Studio (tải từ https://developer.android.com/studio)
- Java JDK 17+
- Android SDK (cài qua Android Studio)
- Android Emulator hoặc thiết bị Android thật

### Cài Đặt Dependencies

```bash
# Đã cài đặt sẵn, nhưng nếu cần cài lại:
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
npm install @capacitor/app @capacitor/splash-screen @capacitor/status-bar
npm install @capacitor/filesystem @capacitor/share
```

## Build & Run

### 1. Build Web Assets
```bash
npm run build
```

### 2. Sync với Native Platforms
```bash
npx cap sync
```

### 3. Mở & Run iOS App

#### Mở Xcode:
```bash
npm run native:ios
# hoặc
npx cap open ios
```

#### Run từ Xcode:
1. Chọn target device (Simulator hoặc thiết bị thật)
2. Click nút Play (▶️) hoặc Cmd+R
3. App sẽ build và chạy

#### Run trực tiếp từ CLI:
```bash
npm run native:run:ios
```

### 4. Mở & Run Android App

#### Mở Android Studio:
```bash
npm run native:android
# hoặc
npx cap open android
```

#### Run từ Android Studio:
1. Chọn device (Emulator hoặc thiết bị thật)
2. Click nút Run (▶️) hoặc Shift+F10
3. App sẽ build và chạy

#### Run trực tiếp từ CLI:
```bash
npm run native:run:android
```

## Tính Năng Native

### 1. App Lifecycle Management
- **Auto-lock khi minimize**: App tự động xóa session khi chuyển sang background
- **Back button handling** (Android): Xử lý nút back một cách thông minh
- **App state tracking**: Theo dõi trạng thái active/background

### 2. Status Bar & Splash Screen
- **Dark status bar**: Phù hợp với theme tối của app
- **Custom splash screen**: Hiển thị logo khi khởi động
- **Smooth transitions**: Chuyển đổi mượt mà

### 3. File System Integration
- **Native export**: Lưu backup file vào Documents folder
- **Native import**: Đọc file từ filesystem
- **Share dialog**: Chia sẻ backup qua native share sheet

### 4. Platform Detection
- App tự động phát hiện đang chạy trên iOS, Android, hay Web
- Tự động sử dụng native features khi có thể
- Fallback về web features khi cần

## Cấu Trúc Native Code

### iOS (ios/App/)
```
ios/App/
├── App/
│   ├── AppDelegate.swift          # App lifecycle
│   ├── capacitor.config.json      # Capacitor config
│   ├── Info.plist                 # iOS permissions & config
│   └── public/                    # Web assets
├── App.xcodeproj                  # Xcode project
└── Podfile                        # CocoaPods dependencies
```

### Android (android/)
```
android/
├── app/
│   ├── src/main/
│   │   ├── java/                  # Java/Kotlin code
│   │   ├── assets/                # Web assets
│   │   ├── res/                   # Resources (icons, etc)
│   │   └── AndroidManifest.xml    # Permissions & config
│   └── build.gradle               # App build config
└── build.gradle                   # Project build config
```

## Customization

### 1. App Name & Bundle ID

Đã cấu hình trong `capacitor.config.ts`:
```typescript
{
  appId: 'com.pocketvault.app',
  appName: 'PocketVault',
  webDir: 'build'
}
```

Để thay đổi:
1. Sửa `capacitor.config.ts`
2. Run `npx cap sync`
3. Cập nhật trong Xcode/Android Studio nếu cần

### 2. Icons & Splash Screens

#### Tạo Assets:
1. Tạo icon 1024x1024px: `resources/icon.png`
2. Tạo splash 2732x2732px: `resources/splash.png`

#### Generate cho tất cả sizes:
```bash
# Cài đặt cordova-res
npm install -g cordova-res

# Generate icons & splashes
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

### 3. Permissions

#### iOS (ios/App/App/Info.plist):
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>To save backup files</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>To save backup files</string>
```

#### Android (android/app/src/main/AndroidManifest.xml):
```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## Testing

### iOS Simulator
```bash
# List available simulators
xcrun simctl list devices

# Run on specific simulator
npx cap run ios --target="iPhone 15 Pro"
```

### Android Emulator
```bash
# List available emulators
emulator -list-avds

# Run on specific emulator
npx cap run android --target="Pixel_7_API_34"
```

### Physical Devices

#### iOS:
1. Kết nối iPhone qua USB
2. Trust computer trên iPhone
3. Chọn device trong Xcode
4. Run (cần Apple Developer Account)

#### Android:
1. Bật Developer Mode trên Android
2. Bật USB Debugging
3. Kết nối qua USB
4. Chọn device trong Android Studio
5. Run

## Debugging

### iOS Debug
```bash
# View console logs
npx cap run ios --livereload

# Safari Web Inspector:
# Safari > Develop > [Device] > localhost
```

### Android Debug
```bash
# View console logs
npx cap run android --livereload

# Chrome DevTools:
# chrome://inspect
```

### Live Reload (Development)
```bash
# iOS
npx cap run ios --livereload --external

# Android
npx cap run android --livereload --external
```

## Build cho Production

### iOS App Store

1. **Chuẩn bị**:
   - Apple Developer Account ($99/năm)
   - App Store Connect account
   - Certificates & Provisioning Profiles

2. **Build**:
   ```bash
   npm run build
   npx cap sync ios
   npx cap open ios
   ```

3. **Archive trong Xcode**:
   - Product > Archive
   - Distribute App > App Store Connect
   - Upload

4. **Submit lên App Store**:
   - Vào App Store Connect
   - Tạo app listing
   - Submit for review

### Android Play Store

1. **Chuẩn bị**:
   - Google Play Developer Account ($25 một lần)
   - Signing key

2. **Generate Signing Key**:
   ```bash
   keytool -genkey -v -keystore pocketvault.keystore \
     -alias pocketvault -keyalg RSA -keysize 2048 -validity 10000
   ```

3. **Build Release APK/AAB**:
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```

4. **Build trong Android Studio**:
   - Build > Generate Signed Bundle/APK
   - Chọn Android App Bundle (AAB)
   - Chọn keystore
   - Build release

5. **Upload lên Play Store**:
   - Vào Google Play Console
   - Tạo app listing
   - Upload AAB
   - Submit for review

## Troubleshooting

### iOS Issues

**Lỗi: "Command PhaseScriptExecution failed"**
```bash
cd ios/App
pod deintegrate
pod install
```

**Lỗi: "No such module 'Capacitor'"**
```bash
npx cap sync ios
cd ios/App
pod install
```

### Android Issues

**Lỗi: "SDK location not found"**
```bash
# Tạo local.properties
echo "sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk" > android/local.properties
```

**Lỗi: Gradle build failed**
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### General Issues

**Web assets không update**
```bash
npm run build
npx cap copy
```

**Plugin không hoạt động**
```bash
npm install
npx cap sync
```

## Performance Optimization

### 1. Reduce Bundle Size
- Tree shaking đã enabled
- Code splitting tự động
- Lazy loading components

### 2. Native Performance
- Hardware acceleration enabled
- Native scrolling
- Optimized animations

### 3. Offline Performance
- IndexedDB cho storage
- Service Worker cho caching
- No network dependencies

## Security Features

### Native Security
- ✅ Keychain/Keystore integration (ready for biometric)
- ✅ Secure storage
- ✅ App sandboxing
- ✅ SSL pinning ready
- ✅ Auto-lock on background

### Encryption
- ✅ AES-256-GCM
- ✅ PBKDF2 600k iterations
- ✅ Zero-cloud architecture
- ✅ Client-side only

## Next Steps

### Recommended Enhancements:
1. **Biometric Authentication**: Face ID / Touch ID / Fingerprint
2. **Auto-backup to iCloud/Google Drive**: Optional cloud sync
3. **Widget Support**: Quick access widget
4. **Apple Watch / Wear OS**: Companion apps
5. **Siri Shortcuts / Google Assistant**: Voice commands

### Current Status:
- ✅ iOS app: 100% functional
- ✅ Android app: 100% functional
- ✅ Native features: Integrated
- ✅ Offline mode: Working
- ✅ Security: Enterprise-grade
- ✅ Performance: Optimized

## Support

### Documentation:
- Capacitor: https://capacitorjs.com/docs
- iOS: https://developer.apple.com/documentation
- Android: https://developer.android.com/docs

### Commands Reference:
```bash
# Development
npm run dev                    # Web dev server
npm run native:ios            # Open iOS in Xcode
npm run native:android        # Open Android in Studio

# Build & Deploy
npm run build                 # Build web assets
npx cap sync                  # Sync to native
npx cap run ios              # Run on iOS
npx cap run android          # Run on Android

# Maintenance
npx cap update               # Update Capacitor
npx cap doctor               # Check setup
```

---

**App đã sẵn sàng deploy lên App Store và Play Store! 🚀**
