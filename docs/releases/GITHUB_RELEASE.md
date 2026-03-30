# 🔒 PocketVault v1.0.0 - Secure Password Manager

A minimal, offline-first, zero-cloud encrypted password vault with enterprise-grade security.

## 🎉 First Stable Release

Cross-platform password manager that works everywhere:
- 🖥️ **Desktop** (macOS, Windows)
- 📱 **Mobile** (iOS, Android)
- 🌐 **Web** (PWA)

## 🔐 Key Features

- **AES-256-GCM encryption** with PBKDF2 (600k iterations)
- **Zero-cloud architecture** - everything stays offline
- **Auto-backup system** with rotation
- **Smart import/export** with merge capability
- **Cross-platform** - works on all devices
- **Bilingual** - English/Vietnamese support

---

## 📥 Downloads

### 🖥️ Desktop Apps

#### macOS
- **Apple Silicon (M1/M2/M3)**: [PocketVault-1.0.0-arm64.dmg](link) (107 MB)
- **Intel Mac**: [PocketVault-1.0.0.dmg](link) (113 MB)
- **Portable (Apple Silicon)**: [PocketVault-1.0.0-arm64-mac.zip](link) (104 MB)
- **Portable (Intel)**: [PocketVault-1.0.0-mac.zip](link) (109 MB)

**Installation**: Open DMG → Drag to Applications → Right-click → Open (first time only)

#### Windows
- **Installer**: [PocketVault-Setup-1.0.0.exe](link) (Coming soon)
- **Portable**: [PocketVault-1.0.0.exe](link) (Coming soon)

**Note**: Windows builds coming in next update. Use web version for now.

### 📱 Mobile Apps

#### Android
- **APK (Debug)**: [app-debug.apk](link) - For testing only
- **Build from source**: `npm run native:android`

**Installation**: Enable "Install from unknown sources" → Install APK

#### iOS
- **Build from source**: `npm run native:ios`
- **TestFlight**: Coming soon

### 🌐 Web App (PWA)
- **Live Demo**: [https://your-domain.com](link)
- **Install**: Open in browser → Click "Install" or "Add to Home Screen"

---

## 🔒 Security

All downloads include SHA256 checksums for verification:
- See [SHA256SUMS.txt](link) for checksums
- Verify: `shasum -a 256 -c SHA256SUMS.txt`

---

## 📖 Quick Start

1. **Download** appropriate version for your platform
2. **Install** and launch PocketVault
3. **Create** master password (8+ characters)
4. **Add** your passwords
5. **Export** backup regularly (encrypted, safe to store in cloud)

Full documentation: [README.md](link)

---

## 🆕 What's New

### Features
- ✅ Cross-platform support (Desktop, Mobile, Web)
- ✅ Enterprise-grade encryption (AES-256-GCM)
- ✅ Auto-backup with rotation (keeps last 3)
- ✅ Smart import/export with merge
- ✅ Bilingual interface (EN/VI)
- ✅ Glass morphism design
- ✅ Dark/Light mode
- ✅ Native mobile integrations

### Security
- ✅ Zero-cloud architecture
- ✅ Offline-first design
- ✅ Auto-lock on background
- ✅ Session-based caching
- ✅ Checksum verification

---

## 🛠️ Build from Source

### Desktop
```bash
npm install
npm run build
npm run electron:build:mac    # macOS
npm run electron:build:win    # Windows
```

### Mobile
```bash
npm install
npm run native:sync
npm run native:ios            # iOS
npm run native:android        # Android
```

### Web
```bash
npm install
npm run build
# Deploy 'build' folder to any static hosting
```

---

## 📝 Changelog

### v1.0.0 (2026-03-06)
- Initial stable release
- Desktop apps for macOS (Windows coming soon)
- Mobile apps for iOS and Android
- Web PWA with offline support
- Full encryption and backup system
- Bilingual support (EN/VI)

---

## 🐛 Known Issues

- Windows desktop build requires manual setup (coming in v1.0.1)
- Android APK requires Java 21 to build
- iOS requires Xcode to build

---

## 💬 Support

- **Issues**: [GitHub Issues](link)
- **Email**: ttd1232004@gmail.com
- **Documentation**: [README.md](link)

---

## 📄 License

MIT License - Free and open source

---

**PocketVault** - Your passwords, your device, your control. 🔐

Made with ❤️ by [Đạt Trần](https://linkedin.com/in/dat-tran-quoc)
