import { getPayload } from 'payload'
import config from '@payload-config'

export async function updateMediaUrls() {
  try {
    const payload = await getPayload({ config })

    console.log('Updating media URLs...')

    // Get all media documents
    const mediaItems = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    console.log(`Found ${mediaItems.docs.length} media items`)

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
      }
    }

    console.log('Media URLs updated successfully')
  } catch (error) {
    console.error('Error updating media URLs:', error)
  }
}

// Run the update
updateMediaUrls()
