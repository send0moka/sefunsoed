# Footer Management Enhancement

## Overview
Enhanced footer management functionality in admin panel with logo upload capability and theme selector control.

## New Features Added

### 1. Logo Management
- **Logo Upload**: Ability to upload custom logo for footer
- **Logo Size Options**: 
  - Small (32px height)
  - Medium (40px height) 
  - Large (48px height)
- **Fallback**: Uses default Logo component if no custom logo is uploaded

### 2. Theme Selector Control
- **Toggle Control**: Admin can enable/disable theme switcher display
- **Default**: Theme selector is enabled by default
- **Conditional Rendering**: Theme selector only shows if enabled in admin

## Files Modified

### Configuration
- `src/Footer/config.ts`: Added logo upload, logo size selection, and theme selector toggle fields

### Component
- `src/Footer/Component.tsx`: Updated to support custom logo rendering with Media component and conditional theme selector

### Types
- `src/payload-types.ts`: Auto-generated types updated to include new footer fields

## Admin Interface
The footer admin panel now includes:
1. **Footer Logo**: Upload field for custom logo image
2. **Logo Size**: Dropdown to select logo size (conditional on logo upload)
3. **Show Theme Selector**: Checkbox to control theme switcher display
4. **Nav Items**: Existing navigation links management

## Implementation Details

### Logo Sizing
```typescript
const getLogoSizeClasses = (size?: string | null) => {
  switch (size) {
    case 'small':
      return 'h-8 w-auto max-w-[120px] md:max-w-[140px]'
    case 'large':
      return 'h-12 w-auto max-w-[180px] md:max-w-[200px]'
    default: // medium
      return 'h-10 w-auto max-w-[140px] md:max-w-[160px]'
  }
}
```

### Conditional Rendering
- Logo: Custom logo if uploaded, otherwise default Logo component
- Theme Selector: Only renders if `showThemeSelector` is true

## Usage
1. Access Admin Panel → Globals → Footer
2. Upload custom logo (optional)
3. Select logo size if logo is uploaded
4. Toggle theme selector visibility
5. Manage navigation links as before
6. Save configuration

## Benefits
- Consistent branding with custom footer logo
- Better control over footer functionality
- Improved admin user experience
- Maintains backward compatibility with existing setups
