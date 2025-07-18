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
      required: true,
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
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Event title that appears on the calendar',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Detailed description shown in the event modal',
          },
        },
        {
          name: 'date',
          type: 'date',
          required: true,
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
          required: true,
          admin: {
            description: 'Event time in 24-hour format (e.g., 14:30)',
            placeholder: '14:30',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return 'Time is required'
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
          required: true,
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
          required: true,
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
