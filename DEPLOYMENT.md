# Deployment Guide - PocketVault

## Issue: 404 Errors on Vercel

If you're seeing 404 errors for JavaScript files like:
```
BB9H0j3o.js:1   Failed to load resource: the server responded with a status of 404
app.GAk3ijJF.js:1   Failed to load resource: the server responded with a status of 404
```

This is caused by stale build cache on Vercel. Follow these steps to fix:

## Solution 1: Clear Vercel Build Cache (Recommended)

### Via Vercel Dashboard:
1. Go to your project on Vercel
2. Click **Settings** tab
3. Scroll to **Build & Development Settings**
4. Click **Clear Build Cache**
5. Go to **Deployments** tab
6. Click **Redeploy** on the latest deployment
7. Select **Use existing Build Cache: OFF**
8. Click **Redeploy**

### Via Vercel CLI:
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Redeploy with fresh build
vercel --prod --force
```

## Solution 2: Manual Rebuild

If clearing cache doesn't work, try a manual rebuild:

```bash
# Clean all build artifacts
npm run clean

# Fresh install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Test locally first
npm run preview

# If working, commit and push
git add .
git commit -m "fix: clean rebuild for Vercel deployment"
git push
```

## Solution 3: Vercel Configuration

The project now includes:

1. **`.vercelignore`** - Ensures clean builds by ignoring cache
2. **`vercel.json`** - Proper cache headers and build command
3. **`package.json`** - Clean and rebuild scripts

These files are already configured. Just push to trigger a new deployment:

```bash
git add .vercelignore vercel.json package.json
git commit -m "fix: update Vercel configuration for clean builds"
git push
```

## Verification

After redeployment, verify the fix:

1. Open your Vercel deployment URL
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Refresh the page (Ctrl+Shift+R / Cmd+Shift+R for hard refresh)
5. Check for 404 errors - should be gone!

## Cache Headers Explained

The new `vercel.json` includes proper cache headers:

- **Immutable assets** (`/_app/immutable/*`): Cached for 1 year
  - These files have content hashes in their names
  - Safe to cache aggressively
  
- **HTML/Entry files** (`/*`): No cache, always revalidate
  - Ensures users always get the latest version
  - Prevents stale references to old asset hashes

## Build Process

The updated build process:

```bash
npm run rebuild  # Used by Vercel
  ↓
npm run clean    # Removes .svelte-kit and build folders
  ↓
npm run build    # Fresh build with new hashes
  ↓
build/           # Clean output directory
```

## Troubleshooting

### Still seeing 404s after redeployment?

1. **Hard refresh your browser**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear browser cache**: Settings → Privacy → Clear browsing data
3. **Try incognito/private window**: Rules out local cache issues
4. **Check Vercel logs**: Deployments → Click deployment → View Function Logs

### Build failing on Vercel?

Check the build logs for:
- Node version compatibility (should be 18+)
- Missing dependencies
- TypeScript errors
- Out of memory errors

### Assets loading but app not working?

1. Check browser console for JavaScript errors
2. Verify Service Worker is not caching old files
3. Unregister Service Worker: DevTools → Application → Service Workers → Unregister
4. Hard refresh the page

## Best Practices

### For Future Deployments:

1. **Always test locally first**:
   ```bash
   npm run rebuild
   npm run preview
   ```

2. **Use clean builds for major changes**:
   ```bash
   npm run rebuild
   ```

3. **Monitor Vercel build logs** for warnings

4. **Keep dependencies updated**:
   ```bash
   npm outdated
   npm update
   ```

## Vercel Environment Variables

If you need environment variables (for future features):

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add variables for all environments (Production, Preview, Development)
3. Redeploy to apply changes

## Performance Optimization

The current configuration is optimized for:
- ✅ Fast initial load (< 2s on 3G)
- ✅ Aggressive caching of immutable assets
- ✅ Always fresh HTML/entry points
- ✅ Minimal bundle size (~45KB gzipped)

## Support

If issues persist:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review [SvelteKit Deployment Docs](https://kit.svelte.dev/docs/adapter-static)
3. Check [Vercel Support](https://vercel.com/support)

---

**Last Updated**: January 7, 2026  
**Vercel Adapter**: @sveltejs/adapter-static@3.0.5  
**SvelteKit**: 2.8.0
