import type { StaticHandler } from 'payload'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const supabaseStaticHandler: StaticHandler = async (req, { params }) => {
  try {
    const { filename } = params

    // Get file from Supabase Storage
    const { data, error } = await supabase.storage.from('media').download(filename)

    if (error) {
      console.error('Supabase download error:', error)
      return new Response('File not found', { status: 404 })
    }

    // Convert blob to buffer
    const buffer = await data.arrayBuffer()

    // Get content type from Supabase metadata if available
    const { data: fileInfo } = await supabase.storage.from('media').list('', { search: filename })

    const file = fileInfo?.[0]
    const contentType = file?.metadata?.mimetype || 'application/octet-stream'

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Static handler error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
