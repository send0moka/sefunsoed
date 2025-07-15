import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: await configPromise })
    const body = await request.json()

    // Type for submission data items
    interface SubmissionDataItem {
      field: string
      value: string
    }

    // Extract selected program and personal info for easy querying
    const submissionData: SubmissionDataItem[] = body.submissionData || []
    const selectedProgram =
      submissionData.find((item) => item.field === 'selectedProgram')?.value || ''
    const personalInfo = submissionData.reduce((acc: Record<string, string>, item) => {
      if (item.field !== 'selectedProgram' && item.field !== 'Terms and Conditions Agreement') {
        acc[item.field] = item.value
      }
      return acc
    }, {})
    const termsAgreed =
      submissionData.find((item) => item.field === 'Terms and Conditions Agreement')?.value ===
      'Agreed'

    // Create registration submission using dedicated collection
    const submission = await payload.create({
      collection: 'registration-submissions',
      data: {
        selectedProgram,
        personalInfo,
        termsAgreed,
        submissionData: body.submissionData,
      },
    })

    return NextResponse.json({
      success: true,
      doc: submission,
      message: 'Registration submitted successfully',
    })
  } catch (error) {
    console.error('Registration submission error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit registration',
        details: error,
      },
      { status: 400 },
    )
  }
}
