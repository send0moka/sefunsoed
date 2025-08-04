# Fix ShareButtons Copy Link Issue in Production

## Problem
Di production (https://sefunsoed.site), ketika menggunakan fitur "Copy Link" pada ShareButtons, URL yang dicopy hanya `https://sefunsoed.site/` instead of the full post URL like `https://sefunsoed.site/posts/post-slug`.

## Root Cause
- Server-side rendering issue: `window.location.href` tidak tersedia atau memberikan nilai yang salah saat komponen di-render di server
- Production environment berbeda dengan localhost dalam hal URL handling

## Solution Implemented

### 1. URL Construction with useEffect
```tsx
const [currentUrl, setCurrentUrl] = React.useState('')

React.useEffect(() => {
  if (typeof window !== 'undefined' && slug) {
    // Construct the full URL using current domain and post slug
    const protocol = window.location.protocol
    const host = window.location.host
    const fullUrl = `${protocol}//${host}/posts/${slug}`
    setCurrentUrl(fullUrl)
  }
}, [slug])
```

### 2. Conditional Rendering
```tsx
{currentUrl && (
  <div className="mt-6">
    <ShareButtons url={currentUrl} title={postTitle} description={postDescription} />
  </div>
)}
```

### 3. Debug Logging
Added console.log for production troubleshooting:
```tsx
console.log('PostHero URL Debug:', {
  slug,
  protocol,
  host,
  fullUrl,
  currentLocation: window.location.href
})
```

## Key Changes

1. **Added `slug` to destructuring**: `const { ..., slug } = post`
2. **useState for URL**: Store URL in state instead of direct window.location.href
3. **useEffect for URL construction**: Safely construct URL after component mounts
4. **Conditional rendering**: Only show ShareButtons when URL is available
5. **Debug logging**: For production troubleshooting

## Files Modified
- `src/heros/PostHero/index.tsx`

## Testing
1. Build passes without errors
2. ShareButtons only renders when valid URL is constructed
3. URL is properly constructed as `${protocol}//${host}/posts/${slug}`
4. Debug logs available in browser console for troubleshooting

## Expected Result
Copy Link akan mencopy URL lengkap seperti:
`https://sefunsoed.site/posts/wave-goodbye-to-the-old-say-hello-to-sef-2025-the-welcoming-wave-begins`

## Fallback Strategy
If issue persists, consider:
1. Using Next.js useRouter hook
2. Passing URL from parent component
3. Server-side URL construction
