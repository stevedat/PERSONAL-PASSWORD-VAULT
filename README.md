# 🔒 PocketVault - Secure Password Manager

A minimal, offline-first encrypted password vault with an Apple Glass design system and enterprise-grade security. 

## 🌟 Key Features

### 🛡️ Uncompromised Security
- **Zero-Knowledge Architecture:** Your data is strictly encrypted locally via AES-256-GCM before ever leaving your device.
- **Smart Auto-Lock:** Automatically locks after 5 minutes of inactivity or instantly when the app is put in the background.
- **Biometric Authentication:** Supports FaceID and TouchID for rapid, secure access.
- **Memory Protection:** Sensitive data is immediately wiped from memory when the vault is locked.

### ☁️ Cloud Sync & Smart Backups
- **Optional Appwrite Cloud Sync:** Seamlessly sync your encrypted vault across all your devices.
- **Smart Merge & Conflict Resolution:** Intelligently merges cloud and local vaults when differences are detected.
- **Auto-Backup System:** Automatically creates local encrypted backups after every modification (retaining the last 3 versions).
- **One-Tap Export / Import:** Export timestamped `.vault` files to manually store in iCloud, Drive, USB, or email.

### 🖥️ Cross-Platform Experience
- **Universal Access:** Works flawlessly on iOS, Android, macOS, Windows, and modern Web browsers.
- **Offline-First:** Fully functional even without an internet connection.
- **Apple Glass UI:** Beautiful modern interface featuring glass-morphism blur effects, fluid animations, and simulated haptic feedback for a premium native feel.
- **Smart Search & One-Tap Copy:** Quickly find your credentials and copy them to your clipboard instantly.

## 📖 How to Use

1. **Setup:** Create a strong master password (8+ characters) upon first launch. *Note: This password is your decryption key and cannot be recovered if lost.*
2. **Add Passwords:** Tap the **+** button to store a new credential. Use the built-in password generator for maximum security.
3. **Manage:** Search, edit, delete, or hide/show passwords with intuitive controls.
4. **Backup:** Even with Cloud Sync enabled, we recommend occasionally exporting a `.vault` file for extra redundancy.

## 📱 Installation

- **Web / Desktop:** Visit the web app in your browser.
- **iOS (PWA):** Open in Safari -> Tap Share -> Select **"Add to Home Screen"**.
- **Android (PWA):** Open in Chrome -> Tap the **"Install"** prompt at the bottom of the screen.

---

**PocketVault** - Your passwords, your device, your control. 🔐
