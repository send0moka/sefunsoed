import { ShareButtons } from '@/components/ShareButtons'
import React from 'react'

export default function ShareButtonsDemo() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Share Buttons Demo
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Demo komponen ShareButtons dengan berbagai platform sharing
            </p>
          </div>

          {/* Demo Section 1: Default */}
          <div className="mb-12 bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
              Default ShareButtons
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              ShareButtons dengan pengaturan default
            </p>
            <ShareButtons
              url="https://example.com/sample-post"
              title="Sample Post Title"
              description="This is a sample description for the post that we want to share."
            />
          </div>

          {/* Demo Section 2: Custom Styling */}
          <div className="mb-12 bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
              ShareButtons dengan Custom Styling
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              ShareButtons dengan custom className dan styling
            </p>
            <ShareButtons
              url={typeof window !== 'undefined' ? window.location.href : 'https://example.com'}
              title="Demo ShareButtons dengan Custom Style"
              description="Ini adalah demo ShareButtons dengan styling yang telah dikustomisasi untuk menunjukkan fleksibilitas komponen."
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800"
            />
          </div>

          {/* Demo Section 3: No Description */}
          <div className="mb-12 bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
              ShareButtons Tanpa Description
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              ShareButtons hanya dengan title tanpa description
            </p>
            <ShareButtons url="https://example.com/minimal-post" title="Post Tanpa Description" />
          </div>

          {/* Features List */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              Fitur ShareButtons
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">
                  Platform yang Didukung
                </h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    WhatsApp - Bagikan dengan pesan pre-filled
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Twitter/X - Bagikan sebagai tweet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Gmail - Buat email draft
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    Copy Link - Copy URL ke clipboard
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">
                  Fitur Teknis
                </h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Responsive design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Dark mode support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    Visual feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Browser compatibility
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
