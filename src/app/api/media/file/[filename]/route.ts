import { NextRequest, NextResponse } from 'next/server'

// In-memory cache for media URLs
const mediaCache = new Map<string, string>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const cacheTimestamps = new Map<string, number>()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params
  const cleanFilename = filename.split('?')[0]

  try {
    // Check cache first
    const cached = mediaCache.get(cleanFilename)
    const cacheTime = cacheTimestamps.get(cleanFilename)

    if (cached && cacheTime && Date.now() - cacheTime < CACHE_TTL) {
      console.log(`Cache hit for ${cleanFilename}, redirecting to: ${cached}`)
      return NextResponse.redirect(cached, 302)
    }

    // For known image files, directly redirect to Supabase
    // This avoids slow database queries
    const supabaseUrl = `https://zpepmvbjkbdpjaprhypy.supabase.co/storage/v1/object/public/media/${cleanFilename}`

    // Cache the URL
    mediaCache.set(cleanFilename, supabaseUrl)
    cacheTimestamps.set(cleanFilename, Date.now())

    console.log(`Redirecting ${cleanFilename} to Supabase URL: ${supabaseUrl}`)
    return NextResponse.redirect(supabaseUrl, 302)
  } catch (error) {
    console.error('Error serving media via API:', error)
    // If all else fails, try direct Supabase URL
    const fallbackUrl = `https://zpepmvbjkbdpjaprhypy.supabase.co/storage/v1/object/public/media/${cleanFilename}`
    return NextResponse.redirect(fallbackUrl, 302)
  }
}
