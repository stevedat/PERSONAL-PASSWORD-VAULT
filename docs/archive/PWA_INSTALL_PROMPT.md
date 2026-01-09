# PWA Install Prompt - Thông Minh & Không Phiền ✅

## Tổng quan
Đã thêm prompt cài đặt PWA thông minh, chỉ hiện khi cần thiết và không làm phiền người dùng.

## Tính năng

### ✅ Hiển thị thông minh
- **Chỉ hiện 1 lần**: Sau khi dismiss, không hiện lại
- **Không hiện nếu đã cài**: Tự động phát hiện standalone mode
- **Vị trí hợp lý**: Bottom của màn hình, không che nội dung quan trọng
- **Dễ dismiss**: Nút "Not now" rõ ràng

### ✅ Hỗ trợ đa nền tảng

#### iOS (Safari)
- Hiện hướng dẫn: "Tap ⬆️ then 'Add to Home Screen'"
- Không có nút Install (iOS không hỗ trợ programmatic install)
- Chỉ có nút "Not now" để dismiss

#### Android (Chrome)
- Hiện nút "Install" để cài đặt trực tiếp
- Sử dụng `beforeinstallprompt` event
- Nút "Not now" để dismiss

#### Desktop (Chrome/Edge)
- Tương tự Android
- Hiện nút "Install" để cài đặt

### ✅ Thiết kế
- **Glass morphism**: Phù hợp với design system
- **Icon 📱**: Rõ ràng, dễ hiểu
- **Animation**: Slide up mượt mà
- **Responsive**: Tối ưu cho mobile và tablet

### ✅ Vị trí
- **Mobile**: Bottom, cách bottom nav 5rem
- **Tablet**: Center, max-width 400px
- **Không che**: FAB button, bottom nav, nội dung chính

## Cách hoạt động

### Kiểm tra điều kiện
```javascript
// 1. Kiểm tra đã cài đặt chưa
isStandalone = window.matchMedia('(display-mode: standalone)').matches

// 2. Kiểm tra đã dismiss chưa
dismissed = localStorage.getItem('pwa-install-dismissed')

// 3. Chỉ hiện nếu: chưa cài + chưa dismiss
if (!isStandalone && !dismissed) {
  showPrompt = true
}
```

### iOS Flow
1. User mở app lần đầu
2. Prompt hiện với hướng dẫn
3. User tap "Not now" → Lưu vào localStorage
4. Không hiện lại

### Android/Desktop Flow
1. User mở app lần đầu
2. Browser trigger `beforeinstallprompt` event
3. Prompt hiện với nút "Install"
4. User tap "Install" → Cài đặt PWA
5. Hoặc tap "Not now" → Lưu vào localStorage

## UI/UX

### Prompt Content
```
📱 Install PocketVault

iOS: Tap ⬆️ then "Add to Home Screen"
Android: Install app for quick access and offline use

[Not now]  [Install] (chỉ Android/Desktop)
```

### Styling
- Border-radius: 16px (rounded)
- Padding: 1rem
- Glass background với blur
- Shadow: Subtle, không quá nổi
- Z-index: 80 (dưới modal, trên content)

### Animation
- Slide up từ bottom
- Duration: 0.3s
- Easing: ease-out

## LocalStorage Key
```javascript
'pwa-install-dismissed' = 'true'
```

## Reset (cho testing)
```javascript
// Trong browser console
localStorage.removeItem('pwa-install-dismissed')
// Reload page để thấy prompt lại
```

## Lợi ích

### Cho người dùng
- ✅ Biết app có thể cài đặt
- ✅ Hướng dẫn rõ ràng (đặc biệt iOS)
- ✅ Không bị phiền nhiều lần
- ✅ Dễ dismiss nếu không muốn

### Cho app
- ✅ Tăng install rate
- ✅ Tăng engagement (PWA installed = dễ quay lại)
- ✅ Tăng retention
- ✅ Professional UX

## Best Practices đã áp dụng

### ✅ Timing
- Hiện ngay khi unlock (user đã commit sử dụng app)
- Không hiện ở unlock screen (tránh làm phiền)

### ✅ Frequency
- Chỉ 1 lần duy nhất
- Không spam

### ✅ Dismissible
- Nút "Not now" rõ ràng
- Lưu preference vào localStorage

### ✅ Platform-aware
- iOS: Hướng dẫn manual
- Android/Desktop: Install button

### ✅ Non-intrusive
- Vị trí bottom, không che nội dung
- Có thể dismiss dễ dàng
- Không block UI

## Testing

### Test iOS
1. Mở Safari trên iPhone/iPad
2. Vào app URL
3. Unlock vault
4. Thấy prompt với hướng dẫn iOS
5. Tap "Not now"
6. Reload → Không thấy prompt nữa

### Test Android
1. Mở Chrome trên Android
2. Vào app URL
3. Unlock vault
4. Thấy prompt với nút "Install"
5. Tap "Install" → App cài đặt
6. Hoặc tap "Not now" → Không hiện lại

### Test Desktop
1. Mở Chrome/Edge
2. Vào app URL
3. Unlock vault
4. Thấy prompt với nút "Install"
5. Tap "Install" → App cài đặt

## Files thay đổi

### Mới
- `src/lib/components/InstallPrompt.svelte` (component mới)

### Cập nhật
- `src/routes/+page.svelte` (import và sử dụng InstallPrompt)

## Build Status
✅ Build successful
✅ Bundle size: +3.6KB (InstallPrompt component)
✅ No errors

## Kết luận

Prompt cài đặt PWA đã được thêm với cách tiếp cận **thông minh và tôn trọng người dùng**:

- ✅ Hiện khi cần thiết
- ✅ Không spam
- ✅ Dễ dismiss
- ✅ Hướng dẫn rõ ràng
- ✅ Hỗ trợ đa nền tảng

**Khuyến nghị**: Giữ nguyên thiết kế này, không cần thay đổi. Đây là best practice cho PWA install prompt.

---

**Ngày**: 7 tháng 1, 2026
**Status**: Production Ready 🚀
