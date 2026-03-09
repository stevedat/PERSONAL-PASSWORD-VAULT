# Desktop App - Quick Reference

## 📦 Files Ready

```
dist-electron/
├── PocketVault-1.0.0.dmg              113 MB  ← SHARE THIS
├── PocketVault-1.0.0-arm64.dmg        107 MB
├── PocketVault-1.0.0-mac.zip          109 MB
├── PocketVault-1.0.0-arm64-mac.zip    104 MB
└── CHECKSUMS-v1.0.0.txt               SHA256 hashes
```

## 🚀 Upload to GitHub

1. https://github.com/stevedat/PERSONAL-PASSWORD-VAULT/releases
2. "Create a new release"
3. Tag: `v1.0.0`
4. Upload: `PocketVault-1.0.0.dmg` + `CHECKSUMS-v1.0.0.txt`
5. Publish!

## 📥 Installation

```
1. Download PocketVault-1.0.0.dmg
2. Open DMG
3. Drag to Applications
4. Right-click → Open (first time)
```

## 🔐 Checksums

```bash
# Verify download
shasum -a 256 PocketVault-1.0.0.dmg

# Should match:
31c2b5158e76360f225e4af074b8799eb65f8b3a7d068d4b79015c8512d23414
```

## ⌨️ Shortcuts

- `Cmd+Q` - Quit
- `Cmd+R` - Reload
- `Cmd+Option+I` - DevTools

## 🐛 Common Issues

**"Cannot open - unidentified developer"**
→ Right-click → Open → Open

**Blank screen on launch**
→ Fixed in v1.0.0!

**Service worker error**
→ Ignore (doesn't affect functionality)

## 🔧 Rebuild

```bash
npm run build
npm run electron:build:mac
```

## 📝 Docs

- `RELEASE_v1.0.0.md` - Full release notes
- `DESKTOP_APP_README.md` - Overview
- `docs/DESKTOP_BUILD_GUIDE.md` - Build guide
- `docs/HUONG_DAN_DESKTOP_APP.md` - Tiếng Việt

## ✅ Status

- [x] Build complete
- [x] Fixes applied
- [x] Checksums generated
- [x] Docs created
- [ ] Upload to GitHub
- [ ] Test on devices
- [ ] Share links

---

**Ready for distribution! 🎉**
