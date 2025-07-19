import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'

export default async function CreateAdminPage() {
  const payload = await getPayload({
    config: configPromise,
  })

  try {
    // Check if any admin users exist
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      const user = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@sefunsoed.site',
          password: 'admin123',
          name: 'Admin User',
        },
      })

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Admin User Created</h1>
          <p>Admin user created successfully:</p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Name:</strong> {user.name}
            </li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-blue-800">Login Details:</h2>
            <p className="text-blue-700">Email: admin@sefunsoed.site</p>
            <p className="text-blue-700">Password: admin123</p>
            <p className="text-blue-700 mt-2">
              <Link href="/admin" className="underline">
                Go to Admin Panel
              </Link>
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Users Already Exist</h1>
          <p>Found {users.docs.length} users in the database.</p>
          <p className="mt-2">First user email: {users.docs[0].email}</p>
          <div className="mt-6">
            <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      )
    }
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p>Error creating admin user:</p>
        <pre className="mt-4 p-4 bg-red-50 rounded overflow-x-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    )
  }
}
