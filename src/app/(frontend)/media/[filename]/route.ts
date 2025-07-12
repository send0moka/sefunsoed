import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    // Get the file path
    const filePath = path.join(process.cwd(), 'public', 'media', params.filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // Determine content type
    const contentType = getContentType(params.filename)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error serving media:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const contentTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }

  return contentTypes[ext] || 'application/octet-stream'
}
