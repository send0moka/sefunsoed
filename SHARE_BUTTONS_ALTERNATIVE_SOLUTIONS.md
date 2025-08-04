# Alternative Solution Using Next.js Router

If the current solution doesn't work, here's an alternative using Next.js useRouter:

## Method 1: Using useRouter (Next.js 13+)
```tsx
'use client'
import { usePathname } from 'next/navigation'

export const PostHero: React.FC<{ post: Post }> = ({ post }) => {
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = React.useState('')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullUrl = `${window.location.origin}${pathname}`
      setCurrentUrl(fullUrl)
    }
  }, [pathname])

  // ... rest of component
}
```

## Method 2: Server-side URL Construction
```tsx
// In the page component (server-side)
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  const fullUrl = `https://sefunsoed.site/posts/${params.slug}`
  
  return <PostHero post={post} postUrl={fullUrl} />
}

// Update PostHero to accept postUrl prop
export const PostHero: React.FC<{ 
  post: Post 
  postUrl?: string 
}> = ({ post, postUrl }) => {
  const currentUrl = postUrl || constructUrlFromSlug(post.slug)
  // ... rest of component
}
```

## Method 3: Using window.location with better error handling
```tsx
React.useEffect(() => {
  const constructUrl = () => {
    try {
      if (typeof window !== 'undefined' && slug) {
        // Try multiple approaches
        const approaches = [
          () => window.location.href,
          () => `${window.location.origin}/posts/${slug}`,
          () => `https://sefunsoed.site/posts/${slug}` // Hardcoded fallback
        ]
        
        for (const approach of approaches) {
          try {
            const url = approach()
            if (url && url.includes(`/posts/${slug}`)) {
              return url
            }
          } catch (e) {
            console.warn('URL construction method failed:', e)
          }
        }
        
        // Final fallback
        return `https://sefunsoed.site/posts/${slug}`
      }
    } catch (error) {
      console.error('URL construction failed:', error)
      return `https://sefunsoed.site/posts/${slug || 'unknown'}`
    }
  }
  
  const url = constructUrl()
  setCurrentUrl(url)
}, [slug])
```
