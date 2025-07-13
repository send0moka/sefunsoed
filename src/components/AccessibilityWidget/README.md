# Accessibility Widget by Sienna

This component integrates the free Sienna Accessibility Widget into your Next.js application. The widget provides comprehensive accessibility features to make your website more inclusive.

## Features

- **Screen Reader Support** - Enhanced compatibility with screen readers
- **Keyboard Navigation** - Improved keyboard navigation throughout the site
- **Text Adjustment** - Font size, spacing, and contrast adjustments
- **Color Options** - High contrast modes and color filters
- **Seizure Safety** - Reduces animations and flashing content
- **ADHD Friendly** - Focus highlighting and content simplification
- **Voice Navigation** - Voice commands support
- **Completely Free** - No cost or registration required

## Usage

The widget is automatically included in the frontend layout and will appear as a floating accessibility icon in the bottom-right corner of your website.

### Basic Implementation

```tsx
import { AccessibilityWidget } from '@/components/AccessibilityWidget'

export default function Layout() {
  return (
    <div>
      <main>Your content</main>
      <AccessibilityWidget />
    </div>
  )
}
```

### Custom Configuration

```tsx
<AccessibilityWidget 
  account="sienna"
  position="bottom-left"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `account` | `string` | `"sienna"` | Widget account identifier |
| `position` | `string` | `"bottom-right"` | Widget position on screen |

## Position Options

- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

## How It Works

1. The component dynamically loads the Sienna accessibility script
2. The script creates a floating accessibility button on your site
3. Users can click the button to access various accessibility tools
4. All settings are saved per user and persist across sessions

## Browser Support

- Chrome/Chromium-based browsers
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy

The Sienna Accessibility Widget:
- Does not collect personal data
- Stores accessibility preferences locally
- No tracking or analytics
- GDPR and CCPA compliant

## Legal Compliance

This widget helps your website comply with:
- **ADA** (Americans with Disabilities Act)
- **WCAG 2.1** (Web Content Accessibility Guidelines)
- **Section 508** (US Federal accessibility requirements)
- **EN 301 549** (European accessibility standard)

## Support

For technical support or questions about the accessibility widget, visit:
- [Sienna Support](https://www.userway.org/support)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
