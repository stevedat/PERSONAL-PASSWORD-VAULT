# Categories & Dark Mode Improvements

## Tính năng mới: Category Tags

### Categories Available
- 📧 **Email** - Email accounts
- 🏦 **Banking** - Banking & financial
- 📱 **App** - Mobile apps
- 🌐 **Website** - Websites
- 💼 **Work** - Work-related
- 🎮 **Games** - Gaming accounts
- 📌 **Other** - Everything else

### Features
1. **Quick Selection**: Tap để chọn category khi thêm/sửa password
2. **Visual Tags**: Mỗi category có màu và icon riêng
3. **Easy Identification**: Nhìn là biết loại password ngay
4. **Optional**: Không bắt buộc, mặc định là "Other"

### UI/UX
- **Add/Edit Form**: Category selector với 7 options
- **Vault Item**: Category tag hiển thị bên cạnh title
- **Color-coded**: Mỗi category có màu riêng (light & dark mode)
- **Touch-friendly**: Buttons ≥ 44px touch target

## Dark Mode Improvements

### Tương phản được cải thiện

#### Before (Old)
```css
.dark .glass {
  background: rgba(0,0,0,0.4);  /* Too transparent */
  color: rgba(255,255,255,0.9); /* Not bright enough */
}
```

#### After (New)
```css
.dark .glass {
  background: rgba(30,30,40,0.75);  /* More solid, better contrast */
  color: rgba(255,255,255,0.95);    /* Brighter text */
}
```

### Changes

**Glass Background**:
- Before: `rgba(0,0,0,0.4)` - quá mờ
- After: `rgba(30,30,40,0.75)` - đậm hơn, dễ đọc hơn

**Text Color**:
- Before: `rgba(255,255,255,0.9)` - hơi mờ
- After: `rgba(255,255,255,0.95)` - sáng hơn

**Secondary Text**:
- Before: `rgba(255,255,255,0.7)` - khó đọc
- After: `rgba(255,255,255,0.75)` - rõ hơn

**Input Background**:
- Added: `rgba(30,30,40,0.5)` - nền riêng cho inputs

**Border**:
- Before: `rgba(255,255,255,0.15)` - mờ
- After: `rgba(255,255,255,0.2)` - rõ hơn

**Shadow**:
- Before: `rgba(0,0,0,0.3)` - nhạt
- After: `rgba(0,0,0,0.5)` - đậm hơn, depth tốt hơn

## Category Colors

### Light Mode
- Email: Blue `#3b82f6`
- Banking: Green `#22c55e`
- App: Purple `#a855f7`
- Website: Orange `#f97316`
- Work: Indigo `#6366f1`
- Games: Pink `#ec4899`
- Other: Gray `#6b7280`

### Dark Mode
- Email: Light Blue `#60a5fa`
- Banking: Light Green `#4ade80`
- App: Light Purple `#c084fc`
- Website: Light Orange `#fb923c`
- Work: Light Indigo `#818cf8`
- Games: Light Pink `#f472b6`
- Other: Light Gray `#9ca3af`

## Data Structure

### VaultItem Interface
```typescript
export type CategoryType = 'email' | 'banking' | 'app' | 'website' | 'work' | 'games' | 'other';

export interface VaultItem {
  id: string;
  title: string;
  username: string;
  password: string;
  note?: string;
  category?: CategoryType;  // NEW!
}
```

### Backward Compatible
- Existing vaults without category will work fine
- Category defaults to 'other' if not set
- Optional field, không breaking changes

## UI Components

### AddEditForm
- Category selector với 7 buttons
- Selected state với scale animation
- Haptic feedback on tap
- Default: 'other'

### VaultItem
- Category tag bên cạnh title
- Icon + label
- Color-coded theo category
- Responsive sizing

## CSS Classes

```css
.category-tag {
  /* Base style */
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-tag.selected {
  /* Selected state */
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Individual category colors */
.category-email { /* ... */ }
.category-banking { /* ... */ }
/* etc. */
```

## Testing

### Category Selection
1. Add new password
2. See category selector with 7 options
3. Tap different categories
4. See selected state (scale + shadow)
5. Save and verify category displays

### Dark Mode Contrast
1. Toggle dark mode
2. Check text readability
3. Verify glass backgrounds are solid enough
4. Check category colors are visible
5. Test inputs have proper contrast

### Backward Compatibility
1. Load existing vault (no categories)
2. Verify items display correctly
3. Edit old item, add category
4. Save and verify

## Files Modified

1. **src/lib/crypto.ts**
   - Added `CategoryType` type
   - Added `category` field to `VaultItem`

2. **src/app.css**
   - Improved dark mode contrast
   - Added category tag styles
   - Added category color classes

3. **src/lib/components/AddEditForm.svelte**
   - Added category selector
   - Added categories array
   - Updated save logic

4. **src/lib/components/VaultItem.svelte**
   - Added category display
   - Added category icons/labels
   - Updated layout

## Build Status

```bash
npm run build
✓ built in 1.39s
```

---

**Features**: ✅ Categories + ✅ Dark Mode Contrast  
**Backward Compatible**: ✅ Yes  
**Date**: January 7, 2026  
**Status**: ✅ Complete
