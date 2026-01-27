# 🔒 PocketVault - Secure Password Manager PWA

A minimal, offline-first, zero-cloud encrypted password vault with Apple Glass design system and enterprise-grade security.

## 🆕 What's New - Enhanced Backup & Restore

PocketVault now includes a comprehensive backup and restore system designed with zero-trust principles:

- **📤 One-Tap Export**: Create timestamped encrypted backups instantly
- **📥 Smart Import**: Intelligent merge with detailed statistics (new/updated/unchanged)
- **💾 Auto-Backup**: Automatic local backups after each change (keeps last 3)
- **🔔 Smart Reminders**: Gentle notifications after 5 passwords or 30 days
- **✅ Backup Verification**: Test backup integrity before saving
- **🌍 Cross-Platform**: Works seamlessly across iOS, Android, and Desktop
- **🔐 Zero-Trust**: Your encrypted files, your storage choice (iCloud, Drive, USB, email)

All backups are encrypted with AES-256-GCM and include SHA-256 checksums for integrity verification.

## ✨ Features

### 🔐 Security
- **AES-256-GCM encryption** with WebCrypto API
- **PBKDF2 key derivation** (600,000 iterations)
- **Zero-cloud architecture** - everything stays offline
- **Auto-lock** when app is backgrounded (10s delay)
- **Session-based master password caching** for seamless UX
- **Biometric authentication** support (FaceID/TouchID on iOS PWA)

### 📱 PWA Features
- **Fully offline** - works without internet
- **Installable** on iOS/Android/Desktop
- **Apple Glass design system** with haptic feedback
- **Native app experience** with proper app state handling
- **Service Worker** for offline functionality
- **Manifest** for app installation

### 🎨 User Experience
- **Glass morphism UI** with blur effects and transparency
- **Haptic feedback** simulation for iOS PWA feel
- **One-tap copy** with visual feedback
- **Smart search** across titles and usernames
- **Auto-save** with cached master password
- **Success notifications** for all operations
- **Enhanced backup/restore** with smart merge and reminders
- **Auto-backup system** with local backup rotation
- **Backup reminders** based on activity and time

### 💾 Backup & Restore
- **One-tap export** with timestamped filenames
- **Smart merge** on import (new/updated/unchanged tracking)
- **Backup verification** to ensure file integrity
- **Auto-backup** to IndexedDB (keeps last 3)
- **Backup reminders** (after 5 passwords or 30 days)
- **Cross-platform** compatible vault files
- **Checksum validation** for file integrity
- **Metadata tracking** (version, platform, timestamp)

### 🛠️ Technical
- **SvelteKit** with adapter-static
- **TypeScript** for type safety
- **IndexedDB** for local storage
- **Tailwind CSS** for styling
- **Bundle size**: <150KB (target achieved)

## 🚀 Quick Start

### Installation
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Deploy
```bash
# Static files will be in /build directory
# Deploy to any static hosting (Netlify, Vercel, GitHub Pages, etc.)
```

## 📖 Usage

### First Time Setup
1. Open PocketVault
2. Create a strong master password (8+ characters)
3. Optionally enable biometric unlock (iOS PWA)
4. Start adding your passwords

### Adding Passwords
1. Click the **+** button
2. Fill in title, username, password
3. Use **Generate** for secure passwords
4. **Save** - no need to re-enter master password

### Managing Passwords
- **Search**: Type in the search box to filter
- **Copy**: One-tap copy with visual feedback
- **Edit**: Click ✏️ to modify entries
- **Delete**: Click 🗑️ to remove (with confirmation)
- **Show/Hide**: Toggle password visibility with 👁️

### Backup & Restore
- **Export**: 📤 Creates encrypted .vault file with timestamp
- **Import**: 📥 Validates and merges with existing vault
- **Smart merge**: Shows detailed stats (X new, Y updated, Z unchanged)
- **Auto-backup**: Automatic local backups after each change
- **Backup reminders**: Gentle notifications to backup regularly
- **Verification**: Test backup integrity before saving
- **Cross-platform**: Works across iOS, Android, and Desktop

### Security Features
- **Auto-lock**: Locks after 5 minutes of inactivity
- **Background lock**: Locks 10 seconds after app is backgrounded
- **Session cache**: Master password cached for seamless operations
- **Memory cleanup**: Sensitive data cleared on lock

## 🏗️ Architecture

### Encryption Flow
```
Master Password 
    ↓ PBKDF2(600,000 iterations)
MasterKey (256-bit)
    ↓ AES-GCM
vault.json → vault.encrypted → IndexedDB
```

### Backup System
```
Vault Items
    ↓ Encrypt with Master Password
Encrypted Vault + Metadata
    ↓ Add Checksum (SHA-256)
.vault File (JSON)
    ↓ User's Choice
iCloud / Google Drive / USB / Email
```

### Auto-Backup Flow
```
Vault Modified
    ↓ Create Encrypted Backup
IndexedDB (auto-backups store)
    ↓ Rotate (keep last 3)
Recovery Available
```

### Data Model
```typescript
interface VaultItem {
  id: string;
  title: string;
  username: string;
  password: string;
  note?: string;
}

interface VaultExportFile {
  version: number;
  app: string;
  created: string;
  platform: string;
  itemCount: number;
  data: string; // encrypted
  iv: string;
  salt: string;
  checksum: string; // SHA-256
}
```

### Storage Layer
- **IndexedDB**: Encrypted vault storage + auto-backups
- **SessionStorage**: Temporary master password cache
- **LocalStorage**: Reminder preferences and backup stats
- **No plaintext**: All sensitive data encrypted at rest

## 🎨 Glass Design System

### Components
- **Glass cards**: Blur effects with transparency
- **Glass buttons**: Hover animations and haptic feedback
- **Glass modals**: Proper focus management
- **Glass inputs**: Smooth focus transitions

### Animations
- **Scale animations**: Subtle hover effects
- **Fade transitions**: Smooth state changes
- **Haptic simulation**: iOS-like feedback
- **Loading states**: Glass spinner animations

## 🔧 Configuration

### Auto-lock Settings
```typescript
const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const BACKGROUND_LOCK_DELAY = 10 * 1000; // 10 seconds
```

### Security Settings
```typescript
const PBKDF2_ITERATIONS = 600000; // 600k iterations
const AES_KEY_LENGTH = 256; // AES-256
const IV_LENGTH = 12; // GCM IV length
```

## 📱 iOS PWA Installation

1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. App will run in standalone mode with:
   - Native app appearance
   - Proper status bar handling
   - Background/foreground detection
   - Biometric authentication support

## 🛡️ Security Best Practices

### For Users
- Use a strong, unique master password (8+ characters minimum)
- Enable biometric unlock on supported devices
- **Regularly export encrypted backups** to multiple locations
- Store backups in personal cloud (iCloud, Google Drive) - they're encrypted!
- Test restore process periodically to ensure backups work
- Don't share vault files without verifying encryption
- Keep master password secure - it cannot be recovered

### Backup Security
- ✅ **Safe to store in cloud**: Files are encrypted with your master password
- ✅ **Multiple locations**: Keep backups in 2-3 different places
- ✅ **Test regularly**: Verify you can restore from backup
- ❌ **Never share master password**: Even with encrypted backups
- ❌ **Don't email plaintext passwords**: Always use encrypted vault files

### For Developers
- Never store plaintext passwords
- Clear sensitive data from memory on lock
- Use secure random number generation
- Implement proper key derivation (PBKDF2)
- Validate all imports before decryption
- Use checksums to detect file tampering

## 🔍 Troubleshooting

### Common Issues

**App won't unlock**
- Check master password spelling
- Clear browser cache and try again
- Check browser console for errors

**Biometric not working**
- Ensure device supports biometrics
- Check browser permissions
- iOS: Must be installed as PWA

**Import/Export issues**
- Verify file is .vault format (JSON with proper structure)
- Check master password for vault file
- Ensure sufficient storage space
- Try exporting again if verification fails

**Backup reminders not showing**
- Check if reminders were dismissed with "Don't remind again"
- Reminders only show once per session
- Export a backup to reset reminder counters

**Auto-backup not working**
- Check browser IndexedDB support
- Verify sufficient storage quota
- Check browser console for errors
- Auto-backup creates backup after each vault modification

### Console Errors Fixed
- ✅ Service Worker cache errors for extensions
- ✅ Auto-lock triggering too frequently  
- ✅ A11y warnings for modal components
- ✅ Svelte version mismatch warnings
- ✅ Dynamic import optimization warnings

## 📊 Performance

- **Bundle size**: ~45KB (gzipped)
- **First load**: <2s on 3G
- **Encryption**: <100ms for typical vault
- **Search**: Real-time filtering
- **Memory usage**: <10MB typical

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow security best practices
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔒 Security Disclosure

For security issues, please email ttd1232004@gmail.com instead of using public issues.

---

**PocketVault** - Your passwords, your device, your control. 🔐
