import React from 'react'
import { CalendarBlock } from '@/blocks/CalendarBlock/Component'

const CalendarDemo = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <CalendarBlock
        id="calendar-demo"
        title="SEF Events Calendar"
        events={[
          {
            id: 'event-test-19',
            title: 'Test Event July 19',
            description: 'This is a test event for July 19, 2025 to verify calendar functionality.',
            date: '2025-07-19',
            time: '10:00',
            place: 'SEF Test Room',
            audience: 'public',
            category: 'test',
          },
          {
            id: 'event-1',
            title: 'English Workshop',
            description:
              'Improve your English speaking skills with native speakers and experienced tutors. This workshop covers pronunciation, conversation techniques, and confidence building.',
            date: '2025-07-20',
            time: '14:00',
            place: 'SEF Learning Center, Room A',
            image: '/media/image-post1.webp',
            audience: 'public',
            category: 'workshop',
          },
          {
            id: 'event-2',
            title: 'Study Group Meeting',
            description:
              'Weekly study group for TOEFL preparation. Members only session focusing on reading comprehension and listening skills.',
            date: '2025-07-22',
            time: '16:30',
            place: 'Room A - SEF Building',
            audience: 'members-only',
            category: 'study-group',
          },
          {
            id: 'event-3',
            title: 'Cultural Exchange',
            description:
              'Meet international students and practice English in a fun, casual environment. Food and games included!',
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
            description:
              'Intensive IELTS preparation session focusing on writing and speaking modules. Advanced level only.',
            date: '2025-07-27',
            time: '10:00',
            place: 'SEF Classroom B',
            audience: 'members-only',
            category: 'class',
          },
          {
            id: 'event-5',
            title: 'English Movie Night',
            description:
              'Watch popular English movies with subtitles and discuss themes afterwards. Popcorn provided!',
            date: '2025-07-30',
            time: '18:30',
            place: 'SEF Auditorium',
            image: '/media/image-post3.webp',
            audience: 'public',
            category: 'entertainment',
          },
          {
            id: 'event-6',
            title: 'Business English Seminar',
            description:
              'Learn professional English communication skills for the workplace. Certificate provided upon completion.',
            date: '2025-08-01',
            time: '09:00',
            place: 'SEF Conference Room',
            audience: 'members-only',
            category: 'seminar',
          },
        ]}
      />
    </div>
  )
}

export default CalendarDemo
