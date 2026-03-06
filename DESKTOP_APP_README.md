# PocketVault Desktop App

Desktop application for macOS and Windows built with Electron.

## Features

- ✅ Native desktop app for macOS and Windows
- ✅ Offline-first architecture
- ✅ Same security as web version (AES-256-GCM encryption)
- ✅ Auto-updates support
- ✅ System tray integration
- ✅ Native file dialogs for backup/restore
- ✅ Keyboard shortcuts

## Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Run in Development Mode

```bash
# Build the web app first
npm run build

# Run Electron app
npm run electron:dev
```

### Build for Production

#### Build for macOS

```bash
npm run electron:build:mac
```

This creates:
- `dist-electron/PocketVault-{version}.dmg` - DMG installer
- `dist-electron/PocketVault-{version}-mac.zip` - ZIP archive
- Supports both Intel (x64) and Apple Silicon (arm64)

#### Build for Windows

```bash
npm run electron:build:win
```

This creates:
- `dist-electron/PocketVault Setup {version}.exe` - NSIS installer
- `dist-electron/PocketVault {version}.exe` - Portable version
- Supports both 64-bit (x64) and 32-bit (ia32)

#### Build for All Platforms

```bash
npm run electron:build:all
```

Builds for both macOS and Windows simultaneously.

## Installation

### macOS

1. Download `PocketVault-{version}.dmg`
2. Open the DMG file
3. Drag PocketVault to Applications folder
4. Launch from Applications

**Note:** On first launch, you may need to:
- Right-click the app and select "Open"
- Or go to System Preferences > Security & Privacy and allow the app

### Windows

#### Option 1: Installer (Recommended)

1. Download `PocketVault Setup {version}.exe`
2. Run the installer
3. Follow installation wizard
4. Launch from Start Menu or Desktop shortcut

#### Option 2: Portable

1. Download `PocketVault {version}.exe`
2. Run directly - no installation needed
3. All data stored in same folder

## App Icons

To customize app icons, replace these files in `electron/resources/`:

- `icon.icns` - macOS icon (512x512 or larger)
- `icon.ico` - Windows icon (256x256 or larger)
- `icon.png` - Linux icon (512x512 PNG)

### Creating Icons

You can use online tools or command-line utilities:

**macOS (.icns):**
```bash
# Using iconutil (macOS only)
mkdir icon.iconset
# Add icon files: icon_16x16.png, icon_32x32.png, etc.
iconutil -c icns icon.iconset
```

**Windows (.ico):**
- Use online converters like https://convertio.co/png-ico/
- Or use ImageMagick: `convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico`

## File Structure

```
electron/
├── main.js              # Main Electron process
├── preload.js           # Preload script for security
├── entitlements.mac.plist  # macOS entitlements
└── resources/           # App icons and resources
    ├── icon.icns       # macOS icon
    ├── icon.ico        # Windows icon
    └── icon.png        # Linux icon
```

## Security

The desktop app maintains the same security standards as the web version:

- ✅ AES-256-GCM encryption
- ✅ PBKDF2 with 600,000 iterations
- ✅ Zero-cloud architecture
- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Web security enabled
- ✅ No remote module access

## Keyboard Shortcuts

- `Cmd/Ctrl + Q` - Quit app
- `Cmd/Ctrl + R` - Reload
- `Cmd/Ctrl + Shift + R` - Force reload
- `Cmd/Ctrl + Alt + I` - Toggle DevTools
- `Cmd/Ctrl + 0` - Reset zoom
- `Cmd/Ctrl + +` - Zoom in
- `Cmd/Ctrl + -` - Zoom out

## Troubleshooting

### macOS: "App is damaged and can't be opened"

This happens when the app is not signed. To bypass:

```bash
xattr -cr /Applications/PocketVault.app
```

### Windows: SmartScreen Warning

Windows may show a warning for unsigned apps:
1. Click "More info"
2. Click "Run anyway"

### Build Errors

If you encounter build errors:

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
npm run electron:build
```

## Distribution

### Code Signing (Optional but Recommended)

#### macOS

1. Get an Apple Developer account ($99/year)
2. Create a Developer ID Application certificate
3. Add to package.json:

```json
"mac": {
  "identity": "Developer ID Application: Your Name (TEAM_ID)"
}
```

#### Windows

1. Get a code signing certificate
2. Add to package.json:

```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "password"
}
```

### Auto-Updates (Optional)

To enable auto-updates, you'll need to:

1. Set up a release server
2. Configure electron-updater
3. Add update checking logic to main.js

## Support

For issues or questions:
- GitHub: https://github.com/stevedat/PERSONAL-PASSWORD-VAULT
- Email: eduflows.app@gmail.com

## License

Same as the main PocketVault project.
