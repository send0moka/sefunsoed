import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(req: NextRequest) {
  try {
    console.log('=== SUPABASE UPLOAD START ===')

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File:', file.name, file.size, 'bytes')

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    console.log('Uploading to Supabase Storage...')

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('media') // bucket name
      .upload(filename, buffer, {
        contentType: file.type,
        duplex: 'half',
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: 'Upload failed', message: error.message }, { status: 500 })
    }

    console.log('Upload successful:', data.path)

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(filename)

    const result = {
      success: true,
      filename: filename,
      path: data.path,
      url: publicUrlData.publicUrl,
      originalName: file.name,
      size: file.size,
      type: file.type,
      timestamp: new Date().toISOString(),
    }

    console.log('Public URL:', publicUrlData.publicUrl)
    console.log('=== SUPABASE UPLOAD END ===')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Supabase upload error:', error)
    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Supabase Storage upload endpoint',
    required_env: ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
  })
}
