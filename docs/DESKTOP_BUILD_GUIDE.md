# Desktop App Build Guide

Complete guide to build PocketVault desktop app for macOS and Windows.

## Prerequisites

### Required Software

1. **Node.js 18+**
   - Download from https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git** (optional, for cloning)
   - Download from https://git-scm.com/

### Platform-Specific Requirements

#### For macOS Builds

- macOS 10.13+ (High Sierra or later)
- Xcode Command Line Tools (optional, for code signing)
  ```bash
  xcode-select --install
  ```

#### For Windows Builds

- Windows 7+ (64-bit recommended)
- No additional requirements for basic builds
- For code signing: Windows SDK

## Step-by-Step Build Instructions

### 1. Clone or Download Project

```bash
git clone https://github.com/stevedat/PERSONAL-PASSWORD-VAULT.git
cd PERSONAL-PASSWORD-VAULT
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Electron
- Electron Builder
- SvelteKit and dependencies

### 3. Build Web App

```bash
npm run build
```

This creates the `build/` folder with the compiled web app.

### 4. Create App Icons (Optional but Recommended)

Before building, create proper app icons:

#### Quick Method (Online Tools)

1. Use existing `static/favicon.svg` or create your own 512x512 PNG
2. Go to https://cloudconvert.com/
3. Convert to:
   - `icon.icns` for macOS
   - `icon.ico` for Windows
   - `icon.png` for Linux
4. Place files in `electron/resources/`

#### Command Line Method (macOS/Linux)

If you have ImageMagick installed:

```bash
cd electron/resources

# Create base PNG from SVG
convert -background none -size 512x512 ../../static/favicon.svg icon.png

# Create Windows ICO
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

# Create macOS ICNS (macOS only)
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

### 5. Build Desktop App

#### Build for macOS

```bash
npm run electron:build:mac
```

**Output files in `dist-electron/`:**
- `PocketVault-1.0.0.dmg` - DMG installer (recommended)
- `PocketVault-1.0.0-mac.zip` - ZIP archive
- `PocketVault-1.0.0-arm64.dmg` - Apple Silicon version
- `PocketVault-1.0.0-x64.dmg` - Intel version

**Build time:** 2-5 minutes

#### Build for Windows

```bash
npm run electron:build:win
```

**Output files in `dist-electron/`:**
- `PocketVault Setup 1.0.0.exe` - NSIS installer (recommended)
- `PocketVault 1.0.0.exe` - Portable version (no install needed)

**Build time:** 3-7 minutes

#### Build for All Platforms

```bash
npm run electron:build:all
```

Builds both macOS and Windows versions.

**Build time:** 5-12 minutes

### 6. Test the App

#### Test Before Building

```bash
npm run electron:dev
```

This opens the app in development mode for testing.

#### Test Built App

**macOS:**
```bash
open dist-electron/mac/PocketVault.app
```

**Windows:**
```bash
start dist-electron/win-unpacked/PocketVault.exe
```

## Distribution

### File Sizes

Approximate sizes:
- macOS DMG: ~80-120 MB
- Windows Installer: ~70-100 MB
- Windows Portable: ~70-100 MB

### Recommended Distribution Files

**For macOS users:**
- `PocketVault-{version}.dmg` - Universal installer

**For Windows users:**
- `PocketVault Setup {version}.exe` - Installer (most users)
- `PocketVault {version}.exe` - Portable (advanced users)

### Upload to GitHub Releases

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Upload the built files
5. Write release notes
6. Publish release

## Code Signing (Optional)

### Why Code Sign?

- Removes security warnings
- Users can install without extra steps
- Professional appearance
- Required for Mac App Store

### macOS Code Signing

**Requirements:**
- Apple Developer account ($99/year)
- Developer ID Application certificate

**Steps:**

1. Get certificate from Apple Developer portal
2. Install certificate in Keychain
3. Update `package.json`:

```json
"mac": {
  "identity": "Developer ID Application: Your Name (TEAM_ID)",
  "hardenedRuntime": true,
  "gatekeeperAssess": false
}
```

4. Build:
```bash
npm run electron:build:mac
```

The app will be automatically signed during build.

### Windows Code Signing

**Requirements:**
- Code signing certificate (from DigiCert, Sectigo, etc.)
- Certificate file (.pfx or .p12)

**Steps:**

1. Get code signing certificate
2. Save certificate file
3. Update `package.json`:

```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "your-password",
  "signingHashAlgorithms": ["sha256"]
}
```

4. Build:
```bash
npm run electron:build:win
```

**Note:** Store certificate password in environment variable for security:

```bash
export CSC_KEY_PASSWORD="your-password"
npm run electron:build:win
```

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'electron'"**

Solution:
```bash
npm install
```

**Error: "ENOENT: no such file or directory, open 'build/index.html'"**

Solution:
```bash
npm run build
npm run electron:build
```

**Error: "Icon file not found"**

Solution: Create placeholder icons or remove icon references from package.json temporarily.

### macOS: "App is damaged"

This happens with unsigned apps. Users can bypass:

```bash
xattr -cr /Applications/PocketVault.app
```

Or right-click app → Open → Open anyway

### Windows: SmartScreen Warning

For unsigned apps, users see a warning:
1. Click "More info"
2. Click "Run anyway"

This is normal for unsigned apps.

### Large File Size

Electron apps are larger because they include:
- Chromium browser engine
- Node.js runtime
- Your app code

This is normal. Typical sizes: 70-120 MB.

### Build is Slow

First build is slow (5-12 minutes) because it downloads dependencies.
Subsequent builds are faster (2-5 minutes).

Speed up builds:
```bash
# Build only for your platform
npm run electron:build:mac  # On macOS
npm run electron:build:win  # On Windows
```

## Advanced Configuration

### Change App Name

Edit `package.json`:

```json
"build": {
  "productName": "MyPasswordVault",
  "appId": "com.mycompany.mypasswordvault"
}
```

### Change App Version

Edit `package.json`:

```json
"version": "1.0.1"
```

### Add Auto-Updates

1. Install electron-updater:
```bash
npm install electron-updater
```

2. Update `electron/main.cjs`:
```javascript
const { autoUpdater } = require('electron-updater');

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

3. Configure update server in `package.json`:
```json
"publish": {
  "provider": "github",
  "owner": "your-username",
  "repo": "your-repo"
}
```

### Reduce File Size

1. Remove unused dependencies
2. Enable compression:

```json
"build": {
  "compression": "maximum",
  "asar": true
}
```

3. Use electron-builder's `files` option to exclude unnecessary files

## CI/CD Automation

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: Build Desktop App

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build web app
        run: npm run build
      
      - name: Build desktop app
        run: npm run electron:build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: dist-electron/*
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/stevedat/PERSONAL-PASSWORD-VAULT/issues
- Email: eduflows.app@gmail.com

## Next Steps

After building:

1. ✅ Test the app thoroughly
2. ✅ Create release notes
3. ✅ Upload to GitHub Releases
4. ✅ Share download links
5. ✅ Consider code signing for better user experience

## Resources

- Electron Documentation: https://www.electronjs.org/docs
- Electron Builder: https://www.electron.build/
- Code Signing Guide: https://www.electron.build/code-signing
- Icon Guidelines: https://www.electron.build/icons
