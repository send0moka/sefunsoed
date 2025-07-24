// Debug script to verify Registration Form configuration
import { readFileSync } from 'fs'

console.log('=== REGISTRATION FORM CONFIG DEBUG ===')

try {
  // Read the config file directly
  const configContent = readFileSync('./src/blocks/RegistrationForm/config.ts', 'utf8')

  // Check if faculty and major are in the options
  const hasFacultyOption = configContent.includes("{ label: 'Faculty', value: 'faculty' }")
  const hasMajorOption = configContent.includes("{ label: 'Major', value: 'major' }")

  console.log('Faculty option in config:', hasFacultyOption)
  console.log('Major option in config:', hasMajorOption)

  // Check component file for FACULTY_MAJOR_DATA
  const componentContent = readFileSync('./src/blocks/RegistrationForm/Component.tsx', 'utf8')
  const hasFacultyData = componentContent.includes('FACULTY_MAJOR_DATA')
  const hasFacultyHandling = componentContent.includes("field.type === 'faculty'")
  const hasMajorHandling = componentContent.includes("field.type === 'major'")

  console.log('FACULTY_MAJOR_DATA present:', hasFacultyData)
  console.log('Faculty type handling:', hasFacultyHandling)
  console.log('Major type handling:', hasMajorHandling)

  // Check payload-types.ts
  const typesContent = readFileSync('./src/payload-types.ts', 'utf8')
  const hasTypesUpdated = typesContent.includes("'faculty' | 'major'")

  console.log('TypeScript types updated:', hasTypesUpdated)
} catch (error) {
  console.error('Error reading files:', error.message)
}

console.log('=== END DEBUG ===')
