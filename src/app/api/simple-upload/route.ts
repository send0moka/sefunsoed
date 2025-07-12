import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (limit to 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(uniqueFilename, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json(
        {
          error: 'Upload failed',
          details: uploadError.message,
        },
        { status: 500 },
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(uniqueFilename)

    return NextResponse.json({
      success: true,
      filename: uniqueFilename,
      url: urlData.publicUrl,
      message: 'Upload successful',
    })
  } catch (error) {
    console.error('Simple upload error:', error)
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
