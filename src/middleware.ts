import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add CSP headers
  const cspPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://sefunsoed.site https://www.sefunsoed.site https://sefunsoed.vercel.app https://*.vercel.app",
    "media-src 'self' data: blob: https://sefunsoed.site https://www.sefunsoed.site https://sefunsoed.vercel.app https://*.vercel.app",
    "connect-src 'self' https://sefunsoed.site https://www.sefunsoed.site https://sefunsoed.vercel.app https://*.vercel.app",
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
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (media files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
}
