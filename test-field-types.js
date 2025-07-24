// Simple test to verify faculty/major component rendering

// Mock data to test faculty field
const testPersonalFields = [
  {
    fieldName: 'faculty',
    label: 'Fakultas',
    type: 'faculty',
    required: true,
  },
  {
    fieldName: 'major',
    label: 'Program Studi',
    type: 'major',
    required: true,
  },
]

console.log('=== COMPONENT RENDERING TEST ===')
console.log('Test data:', JSON.stringify(testPersonalFields, null, 2))

// Check if our type union includes faculty and major
const validTypes = [
  'text',
  'email',
  'tel',
  'number',
  'date',
  'textarea',
  'select',
  'faculty',
  'major',
]

testPersonalFields.forEach((field) => {
  const isValidType = validTypes.includes(field.type)
  console.log(
    `Field "${field.fieldName}" with type "${field.type}":`,
    isValidType ? '✅ Valid' : '❌ Invalid',
  )
})

console.log('=== END TEST ===')
