import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function createAdminUser() {
  const payload = await getPayload({
    config,
  })

  try {
    // Check if any admin users exist
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('No users found, creating admin user...')

      const user = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@sefunsoed.site',
          password: 'admin123',
          name: 'Admin User',
        },
      })

      console.log('Admin user created:', user.email)
    } else {
      console.log('Users already exist:', users.docs.length)
      console.log('First user email:', users.docs[0].email)
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
  }

  process.exit(0)
}

createAdminUser()
