'use client'
import React, { useState, useEffect } from 'react'

interface VisitorStats {
  today: number
  lastWeek: number
  lastMonth: number
  allTime: number
  lastUpdated?: string
  source?: 'vercel' | 'mock' | 'fallback'
}

export const VisitorsTable: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats>({
    today: 0,
    lastWeek: 0,
    lastMonth: 0,
    allTime: 0,
    source: 'mock',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        // Call our API endpoint to get Vercel Analytics data
        const response = await fetch('/api/analytics/visitors')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          // Fallback to mock data if API fails
          setStats({
            today: Math.floor(Math.random() * 100) + 50,
            lastWeek: Math.floor(Math.random() * 500) + 200,
            lastMonth: Math.floor(Math.random() * 2000) + 800,
            allTime: Math.floor(Math.random() * 10000) + 5000,
            source: 'fallback',
          })
        }
      } catch (error) {
        console.error('Failed to fetch visitor stats:', error)
        // Fallback to mock data
        setStats({
          today: Math.floor(Math.random() * 100) + 50,
          lastWeek: Math.floor(Math.random() * 500) + 200,
          lastMonth: Math.floor(Math.random() * 2000) + 800,
          allTime: Math.floor(Math.random() * 10000) + 5000,
          source: 'fallback',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorStats()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  const visitorData = [
    { label: 'Today', value: stats.today },
    { label: 'Last Week', value: stats.lastWeek },
    { label: 'Last Month', value: stats.lastMonth },
    { label: 'All Time', value: stats.allTime },
  ]

  return (
    <div className="bg-gray-900 dark:bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Visitors</h3>
      <div className="space-y-2">
        {visitorData.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-gray-300 dark:text-gray-400">{item.label}</span>
            <span className="text-white dark:text-gray-100 font-medium tabular-nums">
              {loading ? (
                <div className="w-8 h-4 bg-gray-700 animate-pulse rounded"></div>
              ) : (
                formatNumber(item.value)
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          {stats.source === 'vercel' && '📊 Live data • '}
          {stats.source === 'mock' && '🔧 Demo data • '}
          {stats.source === 'fallback' && '⚠️ Fallback • '}
          Updated{' '}
          {new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}
