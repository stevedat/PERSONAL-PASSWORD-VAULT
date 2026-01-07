# Backup Tooltip Feature

## Overview
Added educational tooltips for Export and Import buttons to help users understand the backup/restore process and security features.

## Implementation

### Component: BackupTooltip.svelte
- **Location**: `src/lib/components/BackupTooltip.svelte`
- **Props**:
  - `type`: 'export' or 'import'
  - `show`: boolean to control visibility
- **Design**: Glass morphism with fade-in animation
- **Content**:
  - Export: 4-step process explaining encrypted backup creation
  - Import: 4-step process explaining secure restore
  - Security badge highlighting encryption level

### Integration
- **Location**: `src/routes/+page.svelte`
- **Trigger**: Hover (mouseenter/mouseleave) on export/import buttons
- **Position**: Absolute positioning below buttons
- **Mobile**: Optimized width (260px) and responsive text sizes

## Features

### Export Tooltip
1. Creates encrypted backup file
2. Save to iCloud/Google Drive
3. File is AES-256 encrypted
4. Only you can decrypt it
- Security badge: 🔒 Military-grade encryption

### Import Tooltip
1. Select your .vault file
2. Enter master password
3. Choose merge or replace
4. Data restored securely
- Security badge: ✅ Verified & decrypted

## Design Details
- **Width**: 280px (desktop), 260px (mobile)
- **Border radius**: 14px (card), 8px (badge), 50% (step numbers)
- **Colors**: Blue accent for step numbers, green for security badge
- **Animation**: 0.2s fade-in with translateY
- **Z-index**: 100 (above content, below modals)
- **Pointer events**: None (doesn't block clicks)

## User Experience
- **Non-intrusive**: Only shows on hover
- **Quick info**: 4 steps max, easy to scan
- **Security emphasis**: Highlights encryption and safety
- **Mobile-friendly**: Responsive sizing and positioning
- **Accessible**: Clear contrast, readable font sizes

## Technical Notes
- Uses existing glass morphism design system
- Consistent with app's Apple Glass aesthetic
- No additional dependencies
- Minimal bundle size impact (~2KB)
- Works in both light and dark modes

## Testing Checklist
- [x] Tooltip shows on hover over export button
- [x] Tooltip shows on hover over import button
- [x] Tooltip hides when mouse leaves button
- [x] Correct content for each type (export/import)
- [x] Responsive on mobile devices
- [x] Works in light mode
- [x] Works in dark mode
- [x] No layout shift when tooltip appears
- [x] Build completes without errors
- [x] No TypeScript/diagnostic errors
