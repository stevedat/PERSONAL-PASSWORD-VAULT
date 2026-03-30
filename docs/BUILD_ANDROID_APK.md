# 📱 Build Android APK

Hướng dẫn build file APK cho Android để test và phân phối.

---

## 📋 Yêu Cầu

### 1. Java Development Kit (JDK) 21
```bash
# Kiểm tra Java version
java -version

# Cần: openjdk version "21.x.x"
```

**Cài đặt JDK 21:**

**macOS (Homebrew)**
```bash
brew install openjdk@21
```

**Windows**
- Download từ: https://adoptium.net/
- Chọn: OpenJDK 21 (LTS)

**Linux**
```bash
sudo apt install openjdk-21-jdk
```

### 2. Android Studio (Optional)
- Download: https://developer.android.com/studio
- Hoặc chỉ cần Android SDK Command-line Tools

### 3. Environment Variables
```bash
# Thêm vào ~/.zshrc hoặc ~/.bashrc
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

---

## 🔨 Build APK

### Bước 1: Sync Native App
```bash
npm run native:sync
```

### Bước 2: Build Debug APK
```bash
cd android
./gradlew assembleDebug
```

**Output**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Bước 3: Build Release APK (Signed)
```bash
cd android
./gradlew assembleRelease
```

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🔑 Signing APK (Release)

### Tạo Keystore
```bash
keytool -genkey -v -keystore pocketvault.keystore \
  -alias pocketvault \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### Cấu Hình Signing

**android/app/build.gradle**
```gradle
android {
    signingConfigs {
        release {
            storeFile file("../../pocketvault.keystore")
            storePassword "your-password"
            keyAlias "pocketvault"
            keyPassword "your-password"
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Build Signed APK
```bash
cd android
./gradlew assembleRelease
```

---

## 📦 Output Files

### Debug APK
```
android/app/build/outputs/apk/debug/app-debug.apk
Size: ~50-60 MB
Use: Testing only
```

### Release APK
```
android/app/build/outputs/apk/release/app-release.apk
Size: ~40-50 MB (optimized)
Use: Distribution
```

---

## 📲 Install APK

### Via ADB (USB)
```bash
# Enable USB debugging on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via File Transfer
1. Copy APK to device
2. Enable "Install from unknown sources"
3. Tap APK file to install

### Via QR Code
1. Upload APK to cloud storage
2. Generate QR code for download link
3. Scan QR code on device

---

## 🧪 Testing

### Test Debug APK
```bash
# Install
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Launch
adb shell am start -n com.pocketvault.app/.MainActivity

# View logs
adb logcat | grep PocketVault
```

### Test Features
- ✅ App launches
- ✅ Login screen displays
- ✅ Add/Edit/Delete passwords
- ✅ Export/Import vault
- ✅ Auto-backup works
- ✅ Dark/Light mode
- ✅ Language toggle

---

## 🐛 Troubleshooting

### Java Version Error
```
Error: Cannot find Java 21
```

**Fix:**
```bash
# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 21)

# Verify
java -version
```

### Gradle Build Failed
```
Error: Build failed with exception
```

**Fix:**
```bash
# Clean build
cd android
./gradlew clean

# Rebuild
./gradlew assembleDebug
```

### SDK Not Found
```
Error: Android SDK not found
```

**Fix:**
```bash
# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Library/Android/sdk

# Or install Android Studio
```

### Signing Error
```
Error: Keystore not found
```

**Fix:**
```bash
# Create keystore first
keytool -genkey -v -keystore pocketvault.keystore ...

# Or use debug signing for testing
./gradlew assembleDebug
```

---

## 📊 APK Size Optimization

### Enable ProGuard (Release)
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### Enable App Bundle
```bash
# Build AAB instead of APK (smaller)
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🚀 Distribution

### Google Play Store
1. Build signed AAB: `./gradlew bundleRelease`
2. Upload to Play Console
3. Fill app details
4. Submit for review

### Direct Distribution
1. Build signed APK: `./gradlew assembleRelease`
2. Upload to GitHub Releases
3. Share download link
4. Users enable "Unknown sources" to install

### Internal Testing
1. Build debug APK: `./gradlew assembleDebug`
2. Share via email/cloud
3. Testers install and provide feedback

---

## 📝 Checklist

### Before Building
- [ ] Java 21 installed
- [ ] Android SDK configured
- [ ] Environment variables set
- [ ] Native app synced (`npm run native:sync`)

### Debug Build
- [ ] `./gradlew assembleDebug` successful
- [ ] APK file generated
- [ ] APK installs on device
- [ ] App launches correctly
- [ ] All features work

### Release Build
- [ ] Keystore created
- [ ] Signing configured
- [ ] `./gradlew assembleRelease` successful
- [ ] APK signed correctly
- [ ] Tested on multiple devices

---

## 🎯 Quick Commands

```bash
# Full build process
npm run native:sync
cd android
./gradlew clean
./gradlew assembleDebug

# Install on device
adb install -r app/build/outputs/apk/debug/app-debug.apk

# View logs
adb logcat | grep -i pocketvault
```

---

## ✅ Status

**Current**: Debug APK ready for testing
**Next**: Release APK with signing for distribution

---

**Updated**: March 6, 2026
**Version**: 1.0.0
