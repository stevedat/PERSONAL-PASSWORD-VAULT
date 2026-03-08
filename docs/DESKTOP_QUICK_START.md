# Desktop App - Quick Start

Build PocketVault desktop app in 5 minutes!

## 🚀 Quick Build

```bash
# 1. Install dependencies
npm install

# 2. Build web app
npm run build

# 3. Build desktop app
npm run electron:build:mac    # For macOS
npm run electron:build:win    # For Windows
npm run electron:build:all    # For both
```

## 📦 Output Files

Find your built apps in `dist-electron/`:

### macOS
- `PocketVault-1.0.0.dmg` ← Share this!

### Windows
- `PocketVault Setup 1.0.0.exe` ← Share this!
- `PocketVault 1.0.0.exe` (portable)

## ✅ Test Before Building

```bash
npm run electron:dev
```

## 🎨 Custom Icons (Optional)

1. Create 512x512 PNG icon
2. Convert to `.icns` (macOS) and `.ico` (Windows)
3. Place in `electron/resources/`
4. Rebuild

## 📝 Common Issues

**"Cannot find module 'electron'"**
```bash
npm install
```

**"ENOENT: no such file or directory"**
```bash
npm run build
```

**macOS: "App is damaged"**
```bash
xattr -cr /Applications/PocketVault.app
```

## 📚 Full Documentation

See `DESKTOP_BUILD_GUIDE.md` for complete instructions.

## 🎯 Build Time

- First build: 5-12 minutes
- Subsequent builds: 2-5 minutes

## 💾 File Sizes

- macOS: ~80-120 MB
- Windows: ~70-100 MB

## 🔐 Code Signing (Optional)

For production apps, consider code signing to remove security warnings.

See full guide for details.

---

**That's it!** You now have a native desktop app for macOS and Windows! 🎉
