import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    console.log('=== DIRECT UPLOAD START ===')

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File:', file.name, file.size, 'bytes')

    // Save file directly to public/media directory
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const basename = path.basename(file.name, extension)
    const filename = `${basename}-${timestamp}${extension}`

    const filePath = path.join(process.cwd(), 'public', 'media', filename)

    // Write file
    fs.writeFileSync(filePath, buffer)

    console.log('File saved to:', filePath)

    // Return simple response
    const result = {
      success: true,
      filename: filename,
      url: `/media/${filename}`,
      originalName: file.name,
      size: file.size,
      type: file.type,
      timestamp: new Date().toISOString(),
    }

    console.log('=== DIRECT UPLOAD END ===')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Direct upload error:', error)
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
    message: 'Direct file upload endpoint (no database)',
  })
}
