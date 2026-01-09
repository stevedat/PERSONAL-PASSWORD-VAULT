# Deployment Guide - Hướng Dẫn Deploy 🚀

## Quick Deploy Checklist

```bash
# 1. Update cache version
# Edit static/sw.js
const CACHE_NAME = 'pocketvault-v4'; # Increment version

# 2. Build
npm run build

# 3. Test locally
npx serve build

# 4. Deploy build/ folder to your hosting
# (Vercel, Netlify, GitHub Pages, etc.)

# 5. Users will see update notification automatically
```

## Detailed Steps

### 1. Pre-Deploy Checklist

**✅ Code Quality**
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build successful

**✅ Version Management**
```javascript
// static/sw.js - MUST INCREMENT
const CACHE_NAME = 'pocketvault-v4'; // v3 → v4

// package.json - OPTIONAL
"version": "1.0.1" // 1.0.0 → 1.0.1
```

**✅ Security Check**
- [ ] No hardcoded secrets
- [ ] CSP headers configured
- [ ] HTTPS enabled
- [ ] Service Worker HTTPS only

### 2. Build Process

```bash
# Clean previous build
npm run clean

# Build for production
npm run build

# Output: build/ folder
```

**Build Output:**
```
build/
├── _app/
│   ├── immutable/
│   │   ├── assets/
│   │   ├── chunks/
│   │   └── nodes/
│   └── version.json
├── favicon.svg
├── icon.svg
├── manifest.json
├── sw.js
└── index.html
```

### 3. Local Testing

```bash
# Serve build folder
npx serve build

# Open browser
# http://localhost:3000

# Test:
# - PWA install
# - Offline mode
# - Service worker
# - Update detection
```

### 4. Deploy to Hosting

#### Option A: Vercel (Recommended)

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "sveltekit",
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

#### Option B: Netlify

**Setup:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "build"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    Service-Worker-Allowed = "/"
```

#### Option C: GitHub Pages

**Setup:**
```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d build"
}

# Deploy
npm run deploy
```

**Note:** GitHub Pages requires base path configuration for SvelteKit.

#### Option D: Custom Server (nginx)

**nginx.conf:**
```nginx
server {
    listen 443 ssl http2;
    server_name pocketvault.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/pocketvault/build;
    index index.html;
    
    # Service Worker
    location /sw.js {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        add_header Service-Worker-Allowed "/";
    }
    
    # Static assets
    location /_app/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 5. Post-Deploy Verification

**✅ PWA Features**
```bash
# Open Chrome DevTools
# Application → Service Workers
# Should see: pocketvault-v4 (new version)

# Application → Manifest
# Should see: PocketVault manifest

# Lighthouse → PWA
# Should score: 100/100
```

**✅ Update System**
```bash
# 1. Open PWA (old version)
# 2. Deploy new version
# 3. Wait 60 seconds or refresh
# 4. Should see: "Update Available!" banner
# 5. Click "Update Now"
# 6. App reloads with new version
```

**✅ Security**
```bash
# Check HTTPS
curl -I https://your-domain.com

# Check CSP headers
curl -I https://your-domain.com | grep -i content-security

# Check Service Worker
curl https://your-domain.com/sw.js
```

## Version Management

### Semantic Versioning

```
MAJOR.MINOR.PATCH
1.0.0 → 1.0.1 (patch: bug fix)
1.0.1 → 1.1.0 (minor: new feature)
1.1.0 → 2.0.0 (major: breaking change)
```

### Cache Versioning

```javascript
// Always increment on deploy
const CACHE_NAME = 'pocketvault-v1'; // Initial
const CACHE_NAME = 'pocketvault-v2'; // Bug fix
const CACHE_NAME = 'pocketvault-v3'; // New feature
const CACHE_NAME = 'pocketvault-v4'; // Breaking change
```

### Git Tagging

```bash
# Tag release
git tag -a v1.0.1 -m "Release 1.0.1"

# Push tag
git push origin v1.0.1

# List tags
git tag -l
```

## Rollback Strategy

### If New Version Has Issues

**1. Revert Cache Name**
```javascript
// static/sw.js
const CACHE_NAME = 'pocketvault-v3'; // v4 → v3 (rollback)
```

**2. Rebuild & Redeploy**
```bash
npm run build
vercel --prod # or your hosting
```

**3. Users Will Auto-Update**
```
Users open app → See update banner
→ Update to "old" version
→ Issues resolved
```

### Git Revert

```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert <commit-hash>

# Push
git push origin main
```

## Monitoring

### Service Worker Status

**Check in DevTools:**
```
Chrome DevTools → Application → Service Workers
- Status: activated
- Version: pocketvault-v4
- Clients: 1
```

**Check in Code:**
```javascript
navigator.serviceWorker.ready.then((registration) => {
  console.log('SW active:', registration.active);
  console.log('SW waiting:', registration.waiting);
  console.log('SW installing:', registration.installing);
});
```

### Update Analytics

**Track Updates:**
```javascript
// In UpdateNotification.svelte
function reloadApp() {
  // Track update event
  if (window.gtag) {
    gtag('event', 'pwa_update', {
      from_version: oldVersion,
      to_version: newVersion
    });
  }
  
  window.location.reload();
}
```

## Troubleshooting

### Issue: Update not detected

**Symptoms:**
- New version deployed
- Users don't see update banner
- Old version still running

**Solutions:**
1. Check cache name incremented
2. Check SW file deployed
3. Hard refresh (Ctrl+Shift+R)
4. Clear browser cache

### Issue: Service Worker not registering

**Symptoms:**
- PWA features not working
- No offline support
- No update detection

**Solutions:**
1. Check HTTPS enabled
2. Check SW file accessible
3. Check browser console for errors
4. Check SW scope

### Issue: Old cache not clearing

**Symptoms:**
- New version deployed
- Old assets still loading
- Mixed old/new content

**Solutions:**
1. Check cache deletion in activate event
2. Check skipWaiting() called
3. Check clients.claim() called
4. Manual cache clear

## Best Practices

### ✅ Do's

1. **Always increment cache version**
2. **Test locally before deploy**
3. **Use semantic versioning**
4. **Monitor update adoption**
5. **Keep rollback plan ready**
6. **Document changes**
7. **Test on multiple devices**
8. **Check HTTPS certificate**

### ❌ Don'ts

1. **Don't skip cache version increment**
2. **Don't deploy without testing**
3. **Don't force immediate reload**
4. **Don't break backward compatibility**
5. **Don't forget to update docs**
6. **Don't deploy on Friday** 😄

## Deployment Frequency

### Recommended Schedule

**Bug Fixes:**
- Deploy ASAP
- Increment patch version (1.0.0 → 1.0.1)

**New Features:**
- Deploy weekly/bi-weekly
- Increment minor version (1.0.0 → 1.1.0)

**Breaking Changes:**
- Deploy quarterly
- Increment major version (1.0.0 → 2.0.0)
- Communicate to users

## CI/CD Integration

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Kết Luận

### ✅ Deployment Ready

**Checklist:**
- [x] Build successful
- [x] Service Worker configured
- [x] Update system working
- [x] HTTPS enabled
- [x] PWA manifest valid
- [x] Security headers set
- [x] Rollback plan ready

### 🚀 Deploy Command

```bash
# 1. Increment cache version in static/sw.js
# 2. Build
npm run build

# 3. Deploy (choose one)
vercel --prod              # Vercel
netlify deploy --prod      # Netlify
npm run deploy             # GitHub Pages
```

### 📊 Success Metrics

- **Update detection**: < 60 seconds
- **Update adoption**: > 90% in 24 hours
- **Rollback time**: < 5 minutes
- **Zero downtime**: Always

---

**Ngày**: 7 tháng 1, 2026
**Status**: Production Ready 🚀
**Next Deploy**: Increment CACHE_NAME to v4
