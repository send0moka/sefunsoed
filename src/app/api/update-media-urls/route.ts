import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    // Check for authorization
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })

    console.log('Updating media URLs...')

    // Get all media documents
    const mediaItems = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    console.log(`Found ${mediaItems.docs.length} media items`)

    let updatedCount = 0

    // Update each media item
    for (const item of mediaItems.docs) {
      const currentUrl = item.url
      let newUrl = currentUrl

      // Update old API URLs to new media URLs
      if (currentUrl && currentUrl.includes('/api/media/file/')) {
        newUrl = currentUrl.replace('/api/media/file/', '/media/')
        console.log(`Updating ${item.filename}: ${currentUrl} -> ${newUrl}`)

        await payload.update({
          collection: 'media',
          id: item.id,
          data: {
            url: newUrl,
          },
        })

        updatedCount++
      }
    }

    return NextResponse.json({
      message: `Updated ${updatedCount} media URLs successfully`,
      totalItems: mediaItems.docs.length,
      updatedCount,
    })
  } catch (error) {
    console.error('Error updating media URLs:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function GET(_request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Get all media documents to check current URLs
    const mediaItems = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    const urlInfo = mediaItems.docs.map((item) => ({
      id: item.id,
      filename: item.filename,
      url: item.url,
      needsUpdate: item.url && item.url.includes('/api/media/file/'),
    }))

    return NextResponse.json({
      totalItems: mediaItems.docs.length,
      itemsNeedingUpdate: urlInfo.filter((item) => item.needsUpdate).length,
      items: urlInfo,
    })
  } catch (error) {
    console.error('Error fetching media URLs:', error)
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}
