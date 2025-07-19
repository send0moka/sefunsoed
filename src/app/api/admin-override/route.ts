// Custom publish endpoint yang akan di-inject ke admin panel
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    console.log('=== ADMIN OVERRIDE PUBLISH ===')

    // Parse form data or JSON
    let collection, id, data

    const contentType = request.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      const body = await request.json()
      collection = body.collection
      id = body.id
      data = body.data || {}
    } else {
      // Handle form data from admin panel
      const formData = await request.formData()
      collection = formData.get('collection') || 'pages'
      id = formData.get('id')

      // Extract all form fields
      data = {} as Record<string, unknown>
      for (const [key, value] of formData.entries()) {
        if (key !== 'collection' && key !== 'id') {
          data[key] = value
        }
      }
    }

    if (!id) {
      return NextResponse.json(
        {
          error: 'ID required',
          message: 'Please provide document ID',
        },
        { status: 400 },
      )
    }

    // Force pages collection
    collection = 'pages'

    console.log(`Admin override publishing ${collection} ID: ${id}`)

    const payload = await getPayload({ config })

    // Get current document first
    const currentDoc = await payload.findByID({
      collection: 'pages',
      id,
      depth: 0,
    })

    if (!currentDoc) {
      return NextResponse.json(
        {
          error: 'Document not found',
          message: 'Page not found',
        },
        { status: 404 },
      )
    }

    // Merge current data with new data and set published status
    const updateData = {
      ...currentDoc,
      ...data,
      _status: 'published',
    }

    // Remove system fields that shouldn't be updated
    delete updateData.id
    delete updateData.createdAt
    delete updateData.updatedAt

    // Ultra fast update with minimal processing
    const result = await payload.update({
      collection: 'pages',
      id,
      data: updateData,
      depth: 0, // No relations
    })

    console.log('=== ADMIN OVERRIDE SUCCESS ===')

    // Return in format admin panel expects
    return NextResponse.json({
      message: 'Published successfully',
      doc: result,
      _status: 'published',
    })
  } catch (error: unknown) {
    console.error('=== ADMIN OVERRIDE ERROR ===', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        message: 'Publish failed',
        error: errorMessage,
        _status: 'draft',
      },
      { status: 500 },
    )
  }
}
