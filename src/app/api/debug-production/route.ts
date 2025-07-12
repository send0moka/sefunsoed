import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Test environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        {
          error: 'Missing environment variables',
          supabaseUrl: supabaseUrl ? 'set' : 'missing',
          serviceKey: serviceKey ? 'set' : 'missing',
        },
        { status: 500 },
      )
    }

    // Test Supabase connection
    const supabase = createClient(supabaseUrl, serviceKey)

    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
      return NextResponse.json(
        {
          error: 'Supabase connection failed',
          details: error,
          environment: process.env.NODE_ENV,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: 'Supabase connection successful',
      environment: process.env.NODE_ENV,
      buckets: buckets?.map((b) => b.name) || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV,
      },
      { status: 500 },
    )
  }
}
