import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Timeline Title',
      admin: {
        description: 'Optional title for the timeline section',
      },
    },
    {
      name: 'events',
      type: 'array',
      label: 'Timeline Events',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'date',
          type: 'date',
          label: 'Event Date',
          required: true,
          admin: {
            description: 'The date when this event occurred',
          },
        },
        {
          name: 'dateFormat',
          type: 'select',
          label: 'Date Display Format',
          defaultValue: 'full',
          options: [
            {
              label: 'Full Date (DD/MM/YYYY)',
              value: 'full',
            },
            {
              label: 'Month & Year (MM/YYYY)',
              value: 'monthYear',
            },
            {
              label: 'Year Only (YYYY)',
              value: 'year',
            },
          ],
          admin: {
            description: 'Choose how the date should be displayed',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Event Title',
          required: true,
          admin: {
            description: 'The main title of the event',
          },
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Event Description',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4', 'h5', 'h6'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description: 'Detailed description of the event',
          },
        },
        {
          name: 'status',
          type: 'select',
          label: 'Event Status',
          defaultValue: 'completed',
          options: [
            {
              label: 'Completed',
              value: 'completed',
            },
            {
              label: 'In Progress',
              value: 'in-progress',
            },
            {
              label: 'Upcoming',
              value: 'upcoming',
            },
            {
              label: 'Cancelled',
              value: 'cancelled',
            },
          ],
          admin: {
            description: 'Current status of the event for visual distinction',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Timeline Icon',
          defaultValue: 'circle',
          options: [
            {
              label: 'Circle',
              value: 'circle',
            },
            {
              label: 'Check (Completed)',
              value: 'check',
            },
            {
              label: 'Clock (In Progress)',
              value: 'clock',
            },
            {
              label: 'Calendar (Upcoming)',
              value: 'calendar',
            },
            {
              label: 'X (Cancelled)',
              value: 'x',
            },
            {
              label: 'Star',
              value: 'star',
            },
          ],
          admin: {
            description: 'Icon to display on the timeline node',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Timelines',
    singular: 'Timeline',
  },
}
