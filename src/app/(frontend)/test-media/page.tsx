import React from 'react'
import { Media } from '@/components/Media'
import Image from 'next/image'

// Mock media object untuk testing
const testMedia = {
  id: 1,
  url: '/media/image-hero1.webp',
  filename: 'image-hero1.webp',
  mimeType: 'image/webp',
  filesize: 49432,
  width: 1920,
  height: 1080,
  alt: 'Test Hero Image',
  updatedAt: '2025-07-12T11:29:56.000Z',
  createdAt: '2025-07-12T11:29:56.000Z',
}

export default function MediaTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Media Test Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 1: Media Component with Mock Data</h2>
          <Media resource={testMedia} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test 2: Next.js Image with Relative Path</h2>
          <Image
            src="/media/image-hero1.webp"
            alt="Direct image test"
            width={800}
            height={450}
            className="w-full max-w-md"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test 3: Next.js Image with Full URL</h2>
          <Image
            src="https://sefunsoed.site/media/image-hero1.webp"
            alt="Full URL image test"
            width={800}
            height={450}
            className="w-full max-w-md"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test 4: URL Debug Info</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>
              <strong>Mock Media URL:</strong> {testMedia.url}
            </p>
            <p>
              <strong>Current Domain:</strong>{' '}
              {typeof window !== 'undefined' ? window.location.origin : 'SSR'}
            </p>
            <p>
              <strong>Test Full URL:</strong> https://sefunsoed.site/media/image-hero1.webp
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
