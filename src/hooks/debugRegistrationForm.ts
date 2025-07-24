// Custom hook to debug registration form data during save
export const beforeValidate = async ({ data, operation }: { data: any; operation: string }) => {
  if (operation === 'update' || operation === 'create') {
    console.log('=== REGISTRATION FORM BEFORE VALIDATE ===')
    console.log('Operation:', operation)

    // Check if this is a pages collection update with registration form
    if (data.layout) {
      const registrationBlocks = data.layout.filter(
        (block: any) => block.blockType === 'registrationForm',
      )

      if (registrationBlocks.length > 0) {
        console.log('Found registration form blocks:', registrationBlocks.length)

        registrationBlocks.forEach((block: any, blockIndex: number) => {
          console.log(`Block ${blockIndex}:`, {
            blockType: block.blockType,
            personalFieldsCount: block.personalFields?.length || 0,
          })

          if (block.personalFields && Array.isArray(block.personalFields)) {
            block.personalFields.forEach((field: any, fieldIndex: number) => {
              console.log(`  Field ${fieldIndex}:`, {
                fieldName: field.fieldName,
                label: field.label,
                type: field.type,
                typeOf: typeof field.type,
              })

              // Force validation of faculty/major types
              if (field.type === 'faculty' || field.type === 'major') {
                console.log(`  ✅ Valid ${field.type} field detected`)
              } else if (field.fieldName === 'faculty' && field.type !== 'faculty') {
                console.log(`  🔧 Correcting field type from '${field.type}' to 'faculty'`)
                field.type = 'faculty'
              } else if (field.fieldName === 'major' && field.type !== 'major') {
                console.log(`  🔧 Correcting field type from '${field.type}' to 'major'`)
                field.type = 'major'
              }
            })
          }
        })
      }
    }

    console.log('=== END REGISTRATION FORM DEBUG ===')
  }

  return data
}
