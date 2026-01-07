#!/bin/bash

# PocketVault - Fix Vercel Deployment Script
# This script performs a clean rebuild and pushes to trigger fresh Vercel deployment

echo "🔧 PocketVault - Fixing Vercel Deployment"
echo "=========================================="
echo ""

# Step 1: Clean build artifacts
echo "📦 Step 1: Cleaning build artifacts..."
npm run clean
echo "✅ Clean complete"
echo ""

# Step 2: Fresh install (optional, uncomment if needed)
# echo "📦 Step 2: Fresh npm install..."
# rm -rf node_modules package-lock.json
# npm install
# echo "✅ Install complete"
# echo ""

# Step 3: Build locally to verify
echo "🔨 Step 2: Building locally..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi
echo "✅ Build successful"
echo ""

# Step 4: Test preview (optional)
echo "🧪 Step 3: Testing preview..."
echo "Run 'npm run preview' in another terminal to test locally"
echo "Press Enter when ready to continue, or Ctrl+C to abort"
read -r
echo ""

# Step 5: Git commit and push
echo "📤 Step 4: Committing and pushing to trigger Vercel deployment..."
git add .
git commit -m "fix: clean rebuild for Vercel deployment with enhanced backup system"
git push

if [ $? -ne 0 ]; then
    echo "❌ Git push failed! Check your git configuration."
    exit 1
fi

echo ""
echo "✅ All done!"
echo ""
echo "🚀 Vercel will now rebuild your app with:"
echo "   - Clean build cache"
echo "   - New asset hashes"
echo "   - Proper cache headers"
echo ""
echo "📊 Monitor deployment at: https://vercel.com/dashboard"
echo ""
echo "⏱️  Deployment usually takes 1-2 minutes"
echo "🔄 After deployment, hard refresh your browser (Ctrl+Shift+R)"
echo ""
