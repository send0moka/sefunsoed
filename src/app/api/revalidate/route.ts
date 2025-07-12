import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const path = searchParams.get('path')

    // Check secret
    if (secret !== process.env.PREVIEW_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({
      message: `Revalidated ${path} successfully`,
      revalidated: true,
      path,
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const path = searchParams.get('path')

    // Check secret
    if (secret !== process.env.PREVIEW_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({
      message: `Revalidated ${path} successfully`,
      revalidated: true,
      path,
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
