import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add timeout for API routes in production
  if (request.nextUrl.pathname.startsWith('/api/') && process.env.NODE_ENV === 'production') {
    // Set shorter timeout for API routes to prevent 504 errors
    const response = NextResponse.next()
    response.headers.set('X-API-Timeout', '30000') // 30 seconds

    // For specific heavy operations, allow longer timeout
    if (request.nextUrl.pathname.includes('/pages/') && request.url.includes('draft=true')) {
      response.headers.set('X-API-Timeout', '60000') // 60 seconds for draft operations
    }
  }

  // Skip CSP for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add CSP headers
  const cspPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://website-widgets.pages.dev",
    "style-src 'self' 'unsafe-inline' https://website-widgets.pages.dev",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://sefunsoed.site https://www.sefunsoed.site https://sefunsoed.vercel.app https://*.vercel.app",
    "media-src 'self' data: blob: https://sefunsoed.site https://www.sefunsoed.site https://sefunsoed.vercel.app https://*.vercel.app",
    "connect-src 'self' https://sefunsoed.site https://www.sefunsoed.site https://sefunsoed.vercel.app https://*.vercel.app https://website-widgets.pages.dev",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ')

  // Create the response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set CSP header
  response.headers.set('Content-Security-Policy', cspPolicy)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - admin (Payload admin)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (media files)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico|media).*)',
  ],
}
