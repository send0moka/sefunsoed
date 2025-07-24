'use client'

import React from 'react'

// Debug component to log registration form data
export default function RegistrationFormDebugger({ personalFields }: { personalFields: unknown }) {
  React.useEffect(() => {
    console.log('=== REGISTRATION FORM DEBUG ===')
    console.log('personalFields received:', personalFields)

    if (personalFields && Array.isArray(personalFields)) {
      personalFields.forEach((field, index) => {
        console.log(`Field ${index}:`, {
          fieldName: field.fieldName,
          label: field.label,
          type: field.type,
          typeOf: typeof field.type,
          required: field.required,
        })
      })
    } else {
      console.log('No personalFields or not array:', typeof personalFields)
    }

    console.log('=== END DEBUG ===')
  }, [personalFields])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        background: 'red',
        color: 'white',
        padding: '10px',
        zIndex: 9999,
        fontSize: '12px',
      }}
    >
      Debug: {Array.isArray(personalFields) ? personalFields.length : 0} fields
    </div>
  )
}
