import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Lightweight autosave endpoint with aggressive timeout
export async function POST(request: NextRequest) {
  try {
    console.log('=== QUICK AUTOSAVE START ===')

    const url = new URL(request.url)
    const isDraft = url.searchParams.get('draft') === 'true'
    const isAutosave = url.searchParams.get('autosave') === 'true'

    // Only handle autosave requests to avoid interfering with normal saves
    if (!isAutosave) {
      return NextResponse.json(
        {
          error: 'This endpoint only handles autosave requests',
        },
        { status: 400 },
      )
    }

    const body = await request.json()
    const { collection = 'pages', id, data } = body

    if (!id || collection !== 'pages') {
      return NextResponse.json(
        {
          error: 'Only pages autosave supported',
        },
        { status: 400 },
      )
    }

    // Ultra short timeout for autosave (10 seconds max)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Autosave timeout')), 10000)
    })

    const autosavePromise = async () => {
      const payload = await getPayload({ config })

      console.log(`Quick autosave page ID: ${id}`)

      // Lightweight update - only essential fields
      const essentialData = {
        // Only save critical fields, skip complex validations
        title: data.title || 'Draft Page',
        layout: data.layout || [],
        _status: isDraft ? 'draft' : data._status || 'draft',
      }

      const result = await payload.update({
        collection: 'pages',
        id,
        data: essentialData,
        depth: 0, // No relations to speed up
        autosave: true, // Skip hooks if supported
      })

      return {
        id: result.id,
        updatedAt: result.updatedAt,
        _status: result._status,
      }
    }

    // Race between timeout and autosave
    const result = (await Promise.race([autosavePromise(), timeoutPromise])) as {
      id: string
      updatedAt: string
      _status: string
    }

    console.log('=== QUICK AUTOSAVE SUCCESS ===')
    return NextResponse.json({
      success: true,
      message: 'Autosaved successfully',
      id: result.id,
      updatedAt: result.updatedAt,
      _status: result._status,
    })
  } catch (error: unknown) {
    console.error('=== QUICK AUTOSAVE ERROR ===', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Return success even on timeout to avoid UI errors
    // The previous version is still saved
    if (errorMessage.includes('timeout')) {
      return NextResponse.json({
        success: true,
        message: 'Autosave timed out but previous version preserved',
        timeout: true,
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        message: 'Autosave failed',
      },
      { status: 500 },
    )
  }
}
