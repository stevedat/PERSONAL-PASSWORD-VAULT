# 📋 Quick Reference - PocketVault

## 🚀 Quick Start

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy
./deploy.sh vercel
```

---

## 🔐 Security

- **Encryption**: AES-256-GCM
- **Key Derivation**: PBKDF2 600,000 iterations
- **Hash**: SHA-256
- **Score**: 94/100 ✅
- **Hardcode**: None ✅

---

## 📱 Features

### Core
- ✅ Add/Edit/Delete passwords
- ✅ 7 categories
- ✅ Search & filter
- ✅ Auto-lock (5 min)
- ✅ Dark mode

### Backup
- ✅ Export (.vault)
- ✅ Import (smart merge)
- ✅ Auto-backup (last 3)
- ✅ Reminders

### UI
- ✅ Apple Glass design
- ✅ Mobile-first
- ✅ Bottom navigation
- ✅ Hashtag filters
- ✅ Touch-optimized

---

## 📂 Project Structure

```
src/
├── lib/
│   ├── crypto.ts          # Encryption
│   ├── storage.ts         # IndexedDB
│   ├── backup.ts          # Export
│   ├── restore.ts         # Import
│   ├── stores.ts          # State
│   └── components/
│       ├── UnlockScreen.svelte
│       ├── AddEditForm.svelte
│       └── VaultItem.svelte
├── routes/
│   └── +page.svelte       # Main app
└── app.css                # Styles
```

---

## 🎨 Categories

1. 📧 Email
2. 🏦 Banking
3. 📱 App
4. 🌐 Website
5. 💼 Work
6. 🎮 Games
7. 📌 Other

---

## 🔑 Keyboard Shortcuts

- `Ctrl/Cmd + K` - Search
- `Ctrl/Cmd + N` - New password
- `Ctrl/Cmd + L` - Lock vault
- `Esc` - Close modal

---

## 📊 Performance

- Bundle: ~150KB
- First Load: < 2s
- Encryption: < 100ms
- Search: Instant

---

## 🧪 Testing

```bash
# Quick test
1. Create vault (password: test123)
2. Add password (any category)
3. Search & filter
4. Export backup
5. Lock & unlock
```

---

## 🚀 Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=build
```

### Manual
```bash
npm run build
# Upload build/ folder
```

---

## 📚 Documentation

- `README.md` - Overview
- `SECURITY_AUDIT.md` - Security
- `PRODUCTION_READY.md` - Checklist
- `FINAL_SUMMARY.md` - Complete summary
- `DEPLOYMENT.md` - Deploy guide

---

## 🆘 Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PWA not installing
- Check HTTPS enabled
- Check manifest.json
- Check service worker

### Vault won't unlock
- Check console for errors
- Clear browser cache
- Try different browser

---

## 📞 Support

- **Docs**: Check documentation files
- **Issues**: GitHub Issues
- **Security**: Email privately

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Date**: January 7, 2026
