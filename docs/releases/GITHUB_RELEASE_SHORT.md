# 🔒 PocketVault v1.0.0

Secure, offline-first password manager with enterprise-grade encryption.

## 📥 Downloads

### 🖥️ Desktop

**macOS**
- [Apple Silicon (M1/M2/M3) - DMG](link) (107 MB)
- [Intel Mac - DMG](link) (113 MB)

**Windows** - Coming in v1.0.1

### 📱 Mobile

**Android**
- [APK (Debug)](link) - For testing
- Build: `npm run native:android`

**iOS**
- Build: `npm run native:ios`

### 🌐 Web
- [Live Demo](link) - Install as PWA

## ✨ Features

- 🔐 AES-256-GCM encryption
- 💾 Auto-backup system
- 🌍 Cross-platform (Desktop, Mobile, Web)
- 🚫 Zero-cloud (offline-first)
- 🌐 Bilingual (EN/VI)

## 🚀 Quick Start

1. Download for your platform
2. Create master password
3. Add passwords
4. Export backup regularly

## 📖 Docs

- [README](link) - Full documentation
- [Quick Start](link) - Getting started
- [SHA256SUMS](link) - Verify downloads

## 🛠️ Build from Source

```bash
npm install
npm run build

# Desktop
npm run electron:build:mac

# Mobile
npm run native:sync
npm run native:android  # or native:ios
```

---

**Full Changelog**: Initial release
