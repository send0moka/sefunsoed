'use client'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, X } from 'lucide-react'
import Image from 'next/image'

interface CalendarEvent {
  id?: string | null
  title: string
  description: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  place: string
  image?: string | null
  audience: 'public' | 'members-only'
  category?: string
}

interface CalendarBlockProps {
  id?: string
  title?: string
  events?: CalendarEvent[]
}

export const CalendarBlock: React.FC<CalendarBlockProps> = (props) => {
  const { id, title = 'SEF Events Calendar', events = [] } = props

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('CalendarBlock props:', props)
    console.log('Events array:', events)
    console.log('Events length:', events?.length)
  }

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Default sample events for demo
  const defaultEvents: CalendarEvent[] = [
    {
      id: 'event-1',
      title: 'English Workshop',
      description:
        'Improve your English speaking skills with native speakers and experienced tutors.',
      date: '2025-07-20',
      time: '14:00',
      place: 'SEF Learning Center',
      image: '/media/image-post1.webp',
      audience: 'public',
      category: 'workshop',
    },
    {
      id: 'event-2',
      title: 'Study Group Meeting',
      description: 'Weekly study group for TOEFL preparation. Members only session.',
      date: '2025-07-22',
      time: '16:30',
      place: 'Room A - SEF Building',
      audience: 'members-only',
      category: 'study-group',
    },
    {
      id: 'event-3',
      title: 'Cultural Exchange',
      description: 'Meet international students and practice English in a fun, casual environment.',
      date: '2025-07-25',
      time: '19:00',
      place: 'SEF Community Hall',
      image: '/media/image-post2.webp',
      audience: 'public',
      category: 'cultural',
    },
    {
      id: 'event-4',
      title: 'IELTS Preparation Class',
      description: 'Intensive IELTS preparation session focusing on writing and speaking modules.',
      date: '2025-07-27',
      time: '10:00',
      place: 'SEF Classroom B',
      audience: 'members-only',
      category: 'class',
    },
  ]

  // Transform events from CMS to ensure correct date format
  const transformedEvents =
    events?.map((event) => ({
      ...event,
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : event.date,
    })) || []

  const currentEvents = transformedEvents.length > 0 ? transformedEvents : defaultEvents

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Transformed events:', transformedEvents)
    console.log('Current events being used:', currentEvents)
  }

  // Calendar navigation
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  // Get events for specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return currentEvents.filter((event) => event.date === dateString)
  } // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = (event: CalendarEvent) => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE'

    // Format date and time for Google Calendar
    const eventDate = new Date(`${event.date}T${event.time}:00`)
    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    // End time (1 hour after start time by default)
    const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000)
    const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

    const params = new URLSearchParams({
      text: event.title,
      dates: `${startTime}/${endTime}`,
      details: event.description,
      location: event.place,
      ctz: 'Asia/Jakarta', // Indonesia timezone
    })

    return `${baseUrl}&${params.toString()}`
  }

  // Handle add to Google Calendar
  const handleAddToGoogleCalendar = (event: CalendarEvent) => {
    const googleCalendarUrl = generateGoogleCalendarUrl(event)
    window.open(googleCalendarUrl, '_blank')
  }

  // Helper function to validate image src
  const isValidSrc = (src?: string | null | unknown): src is string => {
    if (typeof src === 'string') {
      return src.trim() !== ''
    }

    if (src && typeof src === 'object') {
      const obj = src as Record<string, unknown>
      if (typeof obj.url === 'string') {
        return obj.url.trim() !== ''
      }
      if (typeof obj.filename === 'string') {
        return obj.filename.trim() !== ''
      }
    }

    return false
  }

  // Extract URL from various data formats
  const extractUrl = (src?: string | null | unknown): string | undefined => {
    if (typeof src === 'string' && src.trim() !== '') {
      return src
    }

    if (src && typeof src === 'object') {
      const obj = src as Record<string, unknown>
      if (typeof obj.url === 'string' && obj.url.trim() !== '') {
        return obj.url
      }
      if (typeof obj.filename === 'string' && obj.filename.trim() !== '') {
        return `/api/media/file/${obj.filename}`
      }
    }

    return undefined
  }

  const calendarDays = getCalendarDays()

  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

        {/* Calendar Header Controls */}
        <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Today
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day)
                const isTodayCell = isToday(day)
                const isCurrentMonthCell = isCurrentMonth(day)

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg ${
                      isTodayCell
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
                        : 'bg-white dark:bg-neutral-950'
                    } ${!isCurrentMonthCell ? 'opacity-40' : ''}`}
                  >
                    <div
                      className={`text-sm font-medium mb-2 ${
                        isTodayCell
                          ? 'text-blue-600 dark:text-blue-400'
                          : isCurrentMonthCell
                            ? 'text-neutral-900 dark:text-white'
                            : 'text-neutral-400 dark:text-neutral-600'
                      }`}
                    >
                      {day.getDate()}
                    </div>

                    {/* Events for this day */}
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <button
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`w-full text-left p-1 rounded text-xs font-medium transition-colors ${
                            event.audience === 'members-only'
                              ? 'bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}
                        >
                          {event.time} - {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {selectedEvent.title}
                  </h3>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEvent.audience === 'members-only'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    {selectedEvent.audience === 'members-only'
                      ? 'SEF Members Only'
                      : 'Open to Everyone'}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>

              {/* Event Image */}
              {isValidSrc(selectedEvent.image) && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={extractUrl(selectedEvent.image)!}
                    alt={selectedEvent.title}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Event Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    Description
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Date & Time
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                        <Clock className="w-4 h-4" />
                        {formatDate(selectedEvent.date)}
                      </div>
                      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                        <Clock className="w-4 h-4" />
                        {selectedEvent.time}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      Location
                    </h4>
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.place}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleAddToGoogleCalendar(selectedEvent)}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
                    </svg>
                    Add to Google Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
