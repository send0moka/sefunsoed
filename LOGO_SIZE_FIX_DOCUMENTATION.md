# Logo Size Configuration Fix

## Problem Identified

Previously, the logo size configuration was not working correctly because the CSS classes were being applied to the wrapper `div` instead of the actual `img` element. When inspecting the element, the structure was:

```html
<div class="h-6 w-auto max-w-[100px] md:max-w-[120px] object-contain invert dark:invert-0">
  <picture>
    <img alt="" width="1200" height="1202" ... />
  </picture>
</div>
```

The size classes were on the `div`, but the `img` kept its original dimensions.

## Solution Implemented

### 1. **Proper CSS Class Application**
- Used `imgClassName` prop instead of `className` on Media component
- This ensures classes are applied directly to the `img` element

### 2. **Enhanced Size Options**
Added configurable logo sizes in admin panel:
- **Small**: `h-6 w-auto max-w-[100px] md:max-w-[120px]` (24px height)
- **Medium**: `h-8 w-auto max-w-[120px] md:max-w-[160px]` (32px height) - Default
- **Large**: `h-10 w-auto max-w-[140px] md:max-w-[180px]` (40px height)

### 3. **Responsive Design**
- Each size has responsive max-width constraints
- Smaller max-width on mobile, larger on desktop
- `object-contain` ensures proper aspect ratio preservation

## Code Changes

### Header Component (`src/Header/Component.client.tsx`)
```tsx
// Before (incorrect)
<Media
  resource={data.logo}
  className={`${getLogoSizeClasses(data.logoSize)} object-contain invert dark:invert-0`}
  loading="eager"
  priority
/>

// After (correct)
<Media
  resource={data.logo}
  className="block"
  imgClassName={`${getLogoSizeClasses(data.logoSize)} object-contain invert dark:invert-0`}
  loading="eager"
  priority
/>
```

### Header Config (`src/Header/config.ts`)
Added new field:
```typescript
{
  name: 'logoSize',
  type: 'select',
  label: 'Logo Size',
  defaultValue: 'medium',
  options: [
    { label: 'Small (24px height)', value: 'small' },
    { label: 'Medium (32px height)', value: 'medium' },
    { label: 'Large (40px height)', value: 'large' },
  ],
  admin: {
    description: 'Choose the size of the logo in the header',
    condition: (data) => data.logo,
  },
}
```

### Size Function
```typescript
const getLogoSizeClasses = (size?: string | null) => {
  switch (size) {
    case 'small':
      return 'h-6 w-auto max-w-[100px] md:max-w-[120px]'
    case 'large':
      return 'h-10 w-auto max-w-[140px] md:max-w-[180px]'
    default: // medium
      return 'h-8 w-auto max-w-[120px] md:max-w-[160px]'
  }
}
```

## Database Migration Update

Updated Supabase migration to include `logoSize` field:
```sql
ALTER TABLE public.header 
ADD COLUMN IF NOT EXISTS "logoSize" character varying DEFAULT 'medium';
```

## Result

Now when you select "Small" logo size in the admin panel:
```html
<div class="block">
  <picture>
    <img alt="" class="h-6 w-auto max-w-[100px] md:max-w-[120px] object-contain invert dark:invert-0" ... />
  </picture>
</div>
```

The size classes are correctly applied to the `img` element, ensuring the logo displays at the configured size regardless of the original image dimensions.

## Benefits

1. **Consistent Logo Sizing**: Logo size is now independent of original image dimensions
2. **Admin Control**: Easy to configure from admin panel
3. **Responsive**: Works well across all screen sizes
4. **Proper Implementation**: Uses the correct Media component props
5. **Backward Compatible**: Existing logos without size setting default to medium

## Usage

1. Upload logo in `Globals → Header → Logo`
2. Select desired size in `Logo Size` dropdown
3. Save changes
4. Logo will display at the configured size on frontend

The logo sizing now works correctly! 🎉
