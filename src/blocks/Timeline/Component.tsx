import React from 'react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'

// Icon components untuk timeline nodes
const TimelineIcon: React.FC<{ icon: string; status: string }> = ({ icon, status }) => {
  const getIconComponent = () => {
    switch (icon) {
      case 'check':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'clock':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'calendar':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'x':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'star':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      default: // circle
        return <div className="w-3 h-3 rounded-full bg-current" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-blue-600 bg-blue-100'
      case 'upcoming':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-neutral-600 bg-neutral-100'
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-lg relative z-10',
        getStatusColor(),
      )}
    >
      {getIconComponent()}
    </div>
  )
}

// Komponen untuk format tanggal
const TimelineDate: React.FC<{ date: string; format: string }> = ({ date, format: dateFormat }) => {
  const formatDate = (dateString: string, formatType: string) => {
    const parsedDate = parseISO(dateString)

    switch (formatType) {
      case 'full':
        return format(parsedDate, 'dd/MM/yyyy', { locale: id })
      case 'monthYear':
        return format(parsedDate, 'MM/yyyy', { locale: id })
      case 'year':
        return format(parsedDate, 'yyyy', { locale: id })
      default:
        return format(parsedDate, 'dd/MM/yyyy', { locale: id })
    }
  }

  return (
    <div className="text-sm font-medium text-muted-foreground mb-2">
      {formatDate(date, dateFormat)}
    </div>
  )
}

// Komponen utama Timeline
export const TimelineBlock: React.FC<TimelineBlockProps> = ({ title, events }) => {
  if (!events || events.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
      )}

      <div className="relative max-w-4xl mx-auto">
        {/* Garis vertikal utama timeline */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />

        <div className="space-y-8">
          {events.map((event, index) => {
            const { date, dateFormat, title: eventTitle, description, status, icon } = event

            return (
              <div key={index} className="relative flex items-start">
                {/* Timeline node/icon */}
                <div className="flex-shrink-0">
                  <TimelineIcon icon={icon || 'circle'} status={status || 'completed'} />
                </div>

                {/* Content card */}
                <div className="flex-1 ml-6">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Tanggal */}
                    <TimelineDate date={date} format={dateFormat || 'full'} />

                    {/* Judul event */}
                    <h3 className="text-xl font-bold text-foreground mb-3">{eventTitle}</h3>

                    {/* Deskripsi */}
                    {description && (
                      <div className="text-muted-foreground prose prose-sm max-w-none">
                        <RichText data={description} enableGutter={false} />
                      </div>
                    )}

                    {/* Status badge */}
                    <div className="mt-4">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          {
                            'bg-green-100 text-green-800': status === 'completed',
                            'bg-blue-100 text-blue-800': status === 'in-progress',
                            'bg-yellow-100 text-yellow-800': status === 'upcoming',
                            'bg-red-100 text-red-800': status === 'cancelled',
                            'bg-neutral-100 text-neutral-800': !status || status === 'completed',
                          },
                        )}
                      >
                        {status === 'completed' && 'Completed'}
                        {status === 'in-progress' && 'In Progress'}
                        {status === 'upcoming' && 'Upcoming'}
                        {status === 'cancelled' && 'Cancelled'}
                        {!status && 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Connector line to next event */}
                  {index < events.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-8 bg-border" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
