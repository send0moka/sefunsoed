'use client'

import { useState } from 'react'

export default function UploadTest() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [endpoint, setEndpoint] = useState('/api/debug-upload')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file) {
      alert('Please select a file')
      setIsUploading(false)
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      setResult(result)

      if (response.ok) {
        alert('Upload successful!')
      } else {
        alert('Upload failed: ' + (result.errors?.[0]?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Upload failed: ' + (error as Error).message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Media Upload</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Endpoint:</label>
        <select
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="/api/debug-upload">Debug Upload (Custom)</option>
          <option value="/api/bypass-upload">Bypass Upload (Override Access)</option>
          <option value="/api/direct-upload">Direct Upload (No Database)</option>
          <option value="/api/media">Official Payload API</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
