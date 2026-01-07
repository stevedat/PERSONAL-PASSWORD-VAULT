# Mobile & Tablet Optimization

## Tối ưu hoá cho thiết bị di động

PocketVault được thiết kế **100% cho mobile và tablet**, không cần desktop/laptop.

## Thay đổi chính

### 1. Viewport & Meta Tags
```html
<!-- Ngăn zoom, tối ưu cho mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />

<!-- PWA mobile -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="mobile-web-app-capable" content="yes" />
```

### 2. Touch Targets (44px minimum)
Tất cả buttons và interactive elements có kích thước tối thiểu 44x44px theo Apple Human Interface Guidelines:

- ✅ Buttons: `min-height: 44px`
- ✅ Inputs: `min-height: 44px`
- ✅ FAB: `3.5rem` (56px) mobile, `4rem` (64px) tablet
- ✅ Icon buttons: `min-width: 44px; min-height: 44px`

### 3. Font Size (Prevent iOS Zoom)
```css
.glass-input {
  font-size: 16px; /* iOS không zoom khi focus nếu >= 16px */
}
```

### 4. Modal Behavior

**Mobile (< 768px)**:
- Modal xuất hiện từ dưới lên (bottom sheet style)
- Full width, rounded top corners only
- `align-items: flex-end`

**Tablet/iPad (≥ 768px)**:
- Modal center màn hình
- Max-width: 500px
- Rounded all corners
- `align-items: center`

**iPad Pro (≥ 1024px)**:
- Max-width: 600px

### 5. Responsive Breakpoints

```css
/* Mobile-first (default) */
.glass-modal {
  width: 100%;
  border-radius: 18px 18px 0 0;
}

/* Tablet/iPad */
@media (min-width: 768px) {
  .glass-modal {
    max-width: 500px;
    border-radius: 18px;
  }
}

/* Large tablets/iPad Pro */
@media (min-width: 1024px) {
  .glass-modal {
    max-width: 600px;
  }
}
```

### 6. Touch Optimizations

```css
body {
  /* Ngăn text selection */
  -webkit-user-select: none;
  
  /* Xóa highlight khi tap */
  -webkit-tap-highlight-color: transparent;
  
  /* Ngăn callout menu */
  -webkit-touch-callout: none;
  
  /* Tối ưu touch response */
  touch-action: manipulation;
}
```

### 7. iOS Safe Areas

```css
.glass-header {
  /* Tránh notch/Dynamic Island */
  padding-top: max(1rem, env(safe-area-inset-top));
}
```

### 8. Layout Changes

**Header**:
- Title: `1.5rem` (lớn hơn)
- Buttons: Wrap khi cần, justify-end
- Icons: `1.25rem` (dễ nhìn hơn)
- Gap: `0.75rem` (thoáng hơn)

**Main Content**:
- No max-width constraint (full width)
- Padding bottom: `6rem` (tránh FAB)
- Gap between items: `0.875rem`

**FAB**:
- Position: `bottom: 2rem; right: 1.5rem`
- Size: `3.5rem` mobile, `4rem` tablet
- Font-size: `2rem` (dễ tap)

**Empty State**:
- Icon: `4rem` (lớn hơn)
- Title: `1.5rem`
- Text: `1rem`

## Kích thước màn hình được tối ưu

### Mobile Phones
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13/14/15 (390px)
- ✅ iPhone 12/13/14/15 Pro Max (428px)
- ✅ Android phones (360px - 480px)

### Tablets
- ✅ iPad Mini (768px)
- ✅ iPad (810px)
- ✅ iPad Air (820px)
- ✅ iPad Pro 11" (834px)
- ✅ iPad Pro 12.9" (1024px)

### Orientations
- ✅ Portrait (dọc)
- ✅ Landscape (ngang)

## Testing Checklist

### Mobile (< 768px)
- [ ] Modal slides up from bottom
- [ ] Full width modal
- [ ] All buttons ≥ 44px touch target
- [ ] No horizontal scroll
- [ ] FAB không che nội dung
- [ ] Header buttons wrap properly
- [ ] Input không zoom khi focus (iOS)

### Tablet (≥ 768px)
- [ ] Modal centered
- [ ] Max-width 500px
- [ ] Larger buttons and inputs
- [ ] Larger FAB (4rem)
- [ ] Content centered with padding

### iOS Specific
- [ ] Safe area respected (notch/island)
- [ ] No text selection
- [ ] No tap highlight
- [ ] No callout menu
- [ ] PWA status bar translucent

### Android Specific
- [ ] Theme color applied
- [ ] PWA install prompt
- [ ] Navigation gestures work

## Performance

- ✅ No desktop CSS overhead
- ✅ Mobile-first approach
- ✅ GPU-accelerated animations
- ✅ Touch-optimized interactions
- ✅ Minimal reflows/repaints

## Files Modified

1. **src/app.css**
   - Mobile-first base styles
   - Touch target sizes
   - Responsive breakpoints
   - iOS optimizations

2. **src/app.html**
   - Viewport meta tags
   - PWA meta tags
   - Mobile-specific settings

3. **src/routes/+page.svelte**
   - Larger header elements
   - Button wrapping
   - Full-width layout
   - Optimized spacing

4. **src/lib/components/AddEditForm.svelte**
   - Bottom sheet on mobile
   - Centered on tablet
   - Responsive modal

## Build Status

```bash
npm run build
✓ built in 1.38s
```

---

**Optimized for**: 📱 Mobile & 📱 Tablet only  
**No support for**: 🖥️ Desktop/Laptop  
**Date**: January 7, 2026  
**Status**: ✅ Complete
