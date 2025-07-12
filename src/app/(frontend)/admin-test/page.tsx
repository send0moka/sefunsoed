import React from 'react'

export default function AdminTestPage() {
  const [mediaData, setMediaData] = React.useState<object | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const testApiCall = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/media?depth=0&fallback-locale=null', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setMediaData(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin API Test Page</h1>

      <div className="space-y-4">
        <button
          onClick={testApiCall}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test /api/media API'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {mediaData && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Success!</strong> API call successful.
            <pre className="mt-2 text-sm overflow-auto">{JSON.stringify(mediaData, null, 2)}</pre>
          </div>
        )}

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>
            <strong>Current URL:</strong>{' '}
            {typeof window !== 'undefined' ? window.location.href : 'SSR'}
          </p>
          <p>
            <strong>Expected API:</strong> /api/media?depth=0&fallback-locale=null
          </p>
        </div>
      </div>
    </div>
  )
}
