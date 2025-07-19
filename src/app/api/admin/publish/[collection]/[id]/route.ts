import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(
  request: NextRequest,
  { params }: { params: { collection: string; id: string } },
) {
  try {
    const { collection, id } = params

    // Set aggressive timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Publish timeout')), 20000) // 20 seconds
    })

    const publishPromise = async () => {
      const payload = await getPayload({ config })

      // Get the current document first
      const doc = await payload.findByID({
        collection,
        id,
        depth: 0, // Minimal depth for speed
      })

      if (!doc) {
        throw new Error('Document not found')
      }

      // Simple update to trigger publish
      const result = await payload.update({
        collection,
        id,
        data: {
          ...doc,
          _status: 'published',
        },
        depth: 0, // Minimal depth
      })

      return result
    }

    // Race between timeout and publish
    const result = await Promise.race([publishPromise(), timeoutPromise])

    return NextResponse.json({
      success: true,
      result,
      message: 'Published successfully',
    })
  } catch (error: unknown) {
    console.error('Publish error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: 'Failed to publish - try again',
      },
      { status: 500 },
    )
  }
}
