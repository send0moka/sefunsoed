import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// This endpoint serves as a proxy for Payload admin panel uploads
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

    // Upload to Supabase Storage
    const buffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload to Supabase' }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

    // Return response that matches what Payload expects
    return NextResponse.json({
      doc: {
        id: uniqueFilename,
        filename: file.name,
        url: urlData.publicUrl,
        supabaseUrl: urlData.publicUrl,
        supabaseKey: uniqueFilename,
        filesize: file.size,
        mimeType: file.type,
        width: null,
        height: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Upload proxy error:', error)
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Payload admin upload proxy to Supabase',
    status: 'ready',
  })
}
