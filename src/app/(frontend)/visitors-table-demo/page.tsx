'use client'
import React from 'react'
import { VisitorsTable } from '@/components/VisitorsTable'

const VisitorsTableDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Visitors Table Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Demonstrasi visitor statistics table yang menampilkan data dari Vercel Analytics. Table
            ini akan muncul di footer dengan data real-time.
          </p>
        </div>

        {/* Demo Container */}
        <div className="max-w-2xl mx-auto">
          {/* Visitors Table Demo */}
          <div className="bg-black dark:bg-gray-800 p-8 rounded-lg mb-8">
            <h2 className="text-white text-xl font-semibold mb-6">Preview in Footer Context</h2>
            <div className="max-w-xs">
              <VisitorsTable />
            </div>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                📊 Real-time Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Menampilkan data visitor dari Vercel Analytics dengan update otomatis
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🔢 Smart Formatting
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Angka diformat otomatis (1.2K, 5.4M) untuk tampilan yang rapi
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ⚡ Fast Loading
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Caching server-side untuk performa optimal dengan fallback data
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🌓 Theme Adaptive
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Desain yang menyesuaikan dengan light/dark theme otomatis
              </p>
            </div>
          </div>

          {/* Data Structure */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Data Structure
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Today:</span>
                <span className="text-gray-900 dark:text-gray-100">Visitor hari ini</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Week:</span>
                <span className="text-gray-900 dark:text-gray-100">Visitor 7 hari terakhir</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Month:</span>
                <span className="text-gray-900 dark:text-gray-100">Visitor 30 hari terakhir</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">All Time:</span>
                <span className="text-gray-900 dark:text-gray-100">Total visitor keseluruhan</span>
              </div>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              🔧 Setup Vercel Analytics
            </h3>
            <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
              <div>
                <strong>1. Enable Analytics:</strong> Aktifkan Vercel Analytics di dashboard project
              </div>
              <div>
                <strong>2. Get API Token:</strong> Buat API token di Vercel Settings → Tokens
              </div>
              <div>
                <strong>3. Environment Variables:</strong>
                <pre className="mt-2 bg-blue-100 dark:bg-blue-900/40 p-2 rounded text-xs">
                  {`VERCEL_API_TOKEN=your_token_here
VERCEL_TEAM_ID=your_team_id  # Optional`}
                </pre>
              </div>
              <div>
                <strong>Status saat ini:</strong>{' '}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200">
                  🔧 Demo Mode (Mock Data)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorsTableDemoPage
