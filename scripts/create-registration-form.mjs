import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function createRegistrationForm() {
  try {
    console.log('Creating registration form...')

    const payload = await getPayload({ config: config })

    // Check if registration form already exists
    const existingForms = await payload.find({
      collection: 'forms',
      where: {
        title: {
          equals: 'Registration Form',
        },
      },
    })

    if (existingForms.docs.length > 0) {
      console.log('Registration form already exists with ID:', existingForms.docs[0].id)
      console.log('You can use this ID in your registration form component')
      return existingForms.docs[0].id
    }

    // Create new form
    const newForm = await payload.create({
      collection: 'forms',
      data: {
        title: 'Registration Form',
        fields: [
          {
            name: 'selectedProgram',
            label: 'Selected Program',
            type: 'text',
            required: true,
            blockType: 'text',
          },
          {
            name: 'fullName',
            label: 'Full Name',
            type: 'text',
            required: true,
            blockType: 'text',
          },
          {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            blockType: 'email',
          },
          {
            name: 'agreement',
            label: 'Terms and Conditions Agreement',
            type: 'text',
            required: true,
            blockType: 'text',
          },
        ],
        submitButtonLabel: 'Submit Registration',
        confirmationType: 'message',
        confirmationMessage: [
          {
            children: [
              {
                text: 'Thank you for your registration! We will contact you soon.',
              },
            ],
          },
        ],
      },
    })

    console.log('Registration form created successfully with ID:', newForm.id)
    console.log('Update your registration form component to use this ID')

    return newForm.id
  } catch (error) {
    console.error('Error creating registration form:', error)
    throw error
  }
}

createRegistrationForm()
  .then((formId) => {
    console.log('\n=== SUCCESS ===')
    console.log(`Form ID: ${formId}`)
    console.log('Update your RegistrationForm component formId default value to:', formId)
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n=== ERROR ===')
    console.error(error)
    process.exit(1)
  })
