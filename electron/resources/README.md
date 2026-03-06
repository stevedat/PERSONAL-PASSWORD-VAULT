# App Icons

Place your app icons here:

- `icon.icns` - macOS icon (512x512 or larger)
- `icon.ico` - Windows icon (256x256 or larger)  
- `icon.png` - Linux icon (512x512 PNG)

## Quick Icon Generation

You can use the existing `static/favicon.svg` as a base:

### Using Online Tools

1. Go to https://cloudconvert.com/svg-to-png
2. Upload `static/favicon.svg`
3. Convert to PNG at 512x512
4. Save as `icon.png`

5. Go to https://cloudconvert.com/png-to-icns
6. Upload `icon.png`
7. Save as `icon.icns`

8. Go to https://cloudconvert.com/png-to-ico
9. Upload `icon.png`
10. Save as `icon.ico`

### Using Command Line (macOS/Linux)

If you have ImageMagick installed:

```bash
# Convert SVG to PNG
convert -background none -size 512x512 ../static/favicon.svg icon.png

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
```

## Temporary Placeholder

For now, the build will use the favicon.svg from the static folder.
Replace these files before final distribution for better quality icons.
