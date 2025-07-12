import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../src/payload.config'

export default async function checkAuth() {
  const payload = await getPayloadHMR({ config: configPromise })

  try {
    // Check if any users exist
    const users = await payload.find({
      collection: 'users',
      limit: 10,
    })

    console.log('Users found:', users.docs.length)
    console.log('First user:', users.docs[0]?.email || 'No users')

    // Try to create a test user if none exist
    if (users.docs.length === 0) {
      console.log('Creating test user...')
      const testUser = await payload.create({
        collection: 'users',
        data: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        },
      })
      console.log('Test user created:', testUser.email)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

checkAuth()
