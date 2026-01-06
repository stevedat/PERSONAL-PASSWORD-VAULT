# PocketVault

A minimal, offline-first, zero-cloud, encrypted password vault PWA built with SvelteKit.

## 🔒 Security Features

- **AES-256-GCM encryption** with WebCrypto API
- **PBKDF2** key derivation (600,000 iterations)
- **Zero-cloud architecture** - everything stays on your device
- **Session-based unlocking** - master key never stored
- **Auto-lock** when app is backgrounded or after 5 minutes
- **Encrypted export/import** for backups

## 🚀 Features

- ✅ **Biometric Authentication** - FaceID/TouchID unlock on iOS
- ✅ **Advanced Auto-Lock** - Smart background detection & timeout
- ✅ Offline-first PWA (works without internet)
- ✅ Add/Edit/Delete credentials
- ✅ One-tap copy to clipboard
- ✅ Search functionality
- ✅ Dark/Light mode
- ✅ Export encrypted backups (.vault files)
- ✅ Import vault files
- ✅ Mobile-optimized interface
- ✅ Auto-generated secure passwords
- ✅ Native app experience on iOS

## 📱 Installation

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

### Production Build

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Preview production build:**
   ```bash
   npm run preview
   ```

3. **Deploy:**
   Deploy the `build/` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

### PWA Installation

Once deployed:
1. Visit the app in a modern browser
2. Look for "Install" prompt or "Add to Home Screen"
3. The app will work fully offline after installation

## 🔐 Security Architecture

```
Master Password
     ↓ PBKDF2(600,000 iterations)
Master Key (256-bit)
     ↓ AES-GCM encryption
vault.json → vault.encrypted → IndexedDB
```

- **No plaintext storage** - everything encrypted at rest
- **No master key persistence** - requires unlock each session
- **Salt-based key derivation** - unique encryption per vault
- **Authenticated encryption** - prevents tampering

## 📊 Technical Stack

- **Frontend:** SvelteKit + TypeScript
- **Storage:** IndexedDB (client-side)
- **Crypto:** WebCrypto API (AES-256-GCM, PBKDF2)
- **PWA:** Service Worker + Web App Manifest
- **Build:** Vite + adapter-static
- **Size:** <150KB total bundle

## 🛡️ Privacy

- **Zero tracking** - no analytics or telemetry
- **Zero cloud** - no data leaves your device
- **Zero third-party** - no external dependencies
- **Open source** - fully auditable code

## 📱 iOS PWA Features

### Biometric Authentication
- **FaceID/TouchID** support for quick unlock
- Automatic device detection (FaceID vs TouchID)
- Secure credential storage using WebAuthn
- Optional setup during vault creation

### Advanced Auto-Lock
- **Smart background detection** - locks when app is backgrounded
- **Activity-based timeout** - 5 minutes of inactivity
- **iOS-specific events** - handles PWA lifecycle properly
- **Memory cleanup** - clears sensitive data on lock

### Native App Experience
- **Standalone display** - no browser UI
- **App switcher integration** - appears as native app
- **Launch handler** - focus existing instance
- **Background sync** - for future enhancements

## 🔧 Configuration

### Icons
Replace placeholder icons in `static/` with actual PNG files:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)
- `favicon.png` (32x32px)

### Manifest
Customize `static/manifest.json` for your deployment:
- Update `start_url` if not deploying to root
- Modify colors and branding

## 🚨 Security Notes

1. **Master Password:** Choose a strong, unique password. It cannot be recovered if forgotten.
2. **Backups:** Regularly export encrypted backups (.vault files)
3. **Device Security:** Ensure your device is secure (lock screen, etc.)
4. **HTTPS Required:** PWA features require HTTPS in production

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## ⚠️ Disclaimer

This is a security-focused application. While built with best practices, use at your own risk. Always maintain encrypted backups of your data.