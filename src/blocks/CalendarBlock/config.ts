import type { Block } from 'payload'

export const CalendarBlock: Block = {
  slug: 'calendarBlock',
  labels: {
    singular: 'Calendar Block',
    plural: 'Calendar Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false, // Changed to false to prevent immediate validation
      defaultValue: 'SEF Events Calendar',
      admin: {
        description: 'The title that appears above the calendar',
      },
    },
    {
      name: 'events',
      type: 'array',
      labels: {
        singular: 'Event',
        plural: 'Events',
      },
      minRows: 0, // Allow empty events initially
      defaultValue: [], // Empty array by default
      fields: [
        {
          name: 'title',
          type: 'text',
          required: false, // Changed to false
          defaultValue: 'New Event',
          admin: {
            description: 'Event title that appears on the calendar',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: false, // Changed to false
          defaultValue: 'Event description',
          admin: {
            description: 'Detailed description shown in the event modal',
          },
        },
        {
          name: 'date',
          type: 'date',
          required: false, // Changed to false
          defaultValue: () => {
            // Default to today's date
            const today = new Date()
            return today.toISOString().split('T')[0]
          },
          admin: {
            description: 'Event date (YYYY-MM-DD format)',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'yyyy-MM-dd',
            },
          },
        },
        {
          name: 'time',
          type: 'text',
          required: false, // Changed to false
          defaultValue: '10:00',
          admin: {
            description: 'Event time in 24-hour format (e.g., 14:30)',
            placeholder: '14:30',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true // Allow empty since not required
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
            if (!timeRegex.test(value)) {
              return 'Time must be in HH:MM format (e.g., 14:30)'
            }
            return true
          },
        },
        {
          name: 'place',
          type: 'text',
          required: false, // Changed to false
          defaultValue: 'SEF Building',
          admin: {
            description: 'Event location or venue',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional event image shown in the modal',
          },
        },
        {
          name: 'audience',
          type: 'select',
          required: false, // Changed to false
          defaultValue: 'public',
          options: [
            {
              label: 'Open to Everyone',
              value: 'public',
            },
            {
              label: 'SEF Members Only',
              value: 'members-only',
            },
          ],
          admin: {
            description: 'Who can attend this event',
          },
        },
        {
          name: 'category',
          type: 'select',
          required: false, // Changed to false
          defaultValue: 'other',
          options: [
            { label: 'Workshop', value: 'workshop' },
            { label: 'Study Group', value: 'study-group' },
            { label: 'Cultural Event', value: 'cultural' },
            { label: 'Class', value: 'class' },
            { label: 'Seminar', value: 'seminar' },
            { label: 'Entertainment', value: 'entertainment' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            description: 'Event category for organization',
          },
        },
      ],
      admin: {
        description: 'Add events to display on the calendar',
        initCollapsed: true,
      },
    },
  ],
}
