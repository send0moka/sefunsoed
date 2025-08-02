import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'FAQ Section Title',
      defaultValue: 'Frequently Asked Questions',
      admin: {
        description: 'Main title for the FAQ section',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'FAQ Subtitle',
      admin: {
        description: 'Optional subtitle or description for the FAQ section',
      },
    },
    {
      name: 'enableSearch',
      type: 'checkbox',
      label: 'Enable Search',
      defaultValue: true,
      admin: {
        description: 'Allow users to search through FAQ items',
      },
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder Text',
      defaultValue: 'Search questions...',
      admin: {
        condition: (data) => data.enableSearch,
        description: 'Placeholder text for the search input',
      },
    },
    {
      name: 'enableTopicFilter',
      type: 'checkbox',
      label: 'Enable Topic Filter',
      defaultValue: true,
      admin: {
        description: 'Show topic categories for filtering FAQ items',
      },
    },
    {
      name: 'allTopicsLabel',
      type: 'text',
      label: 'All Topics Label',
      defaultValue: 'All Topics',
      admin: {
        condition: (data) => data.enableTopicFilter,
        description: 'Label for the "all topics" filter option',
      },
    },
    {
      name: 'topicsText',
      type: 'textarea',
      label: 'FAQ Topics (JSON Format)',
      admin: {
        condition: (data) => data.enableTopicFilter,
        description:
          'Enter topics in JSON format. Example: [{"name":"General","slug":"general","description":"General questions"}]',
        placeholder: '[{"name":"General","slug":"general","description":"General questions"}]',
      },
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
          admin: {
            description: 'The FAQ question',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                AlignFeature(),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description: 'The detailed answer to the question',
          },
        },
        {
          name: 'topic',
          type: 'text',
          label: 'Topic',
          required: true,
          admin: {
            description: 'Which topic this FAQ item belongs to (must match a topic slug)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Search Keywords',
          admin: {
            description: 'Additional keywords to help with search (comma-separated)',
          },
        },
        {
          name: 'relatedQuestions',
          type: 'array',
          label: 'Related Questions',
          maxRows: 5,
          admin: {
            description: 'Questions related to this FAQ item',
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              label: 'Related Question',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link (Optional)',
              admin: {
                description: 'Optional link to the related question or page',
              },
            },
          ],
        },
        {
          name: 'priority',
          type: 'number',
          label: 'Priority',
          defaultValue: 0,
          admin: {
            description: 'Higher numbers appear first (0 = normal priority)',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'cards',
      options: [
        {
          label: 'Card Style (Recommended)',
          value: 'cards',
        },
        {
          label: 'List Style',
          value: 'list',
        },
        {
          label: 'Accordion Style (Legacy)',
          value: 'accordion',
        },
      ],
      admin: {
        description:
          'Choose how FAQ items are displayed. Card and List styles show all content immediately. Accordion is kept for backward compatibility.',
      },
    },
    {
      name: 'showRelatedQuestions',
      type: 'checkbox',
      label: 'Show Related Questions',
      defaultValue: true,
      admin: {
        description: 'Display related questions for each FAQ item',
      },
    },
    {
      name: 'maxItemsPerPage',
      type: 'number',
      label: 'Items Per Page',
      defaultValue: 10,
      min: 5,
      max: 50,
      admin: {
        description: 'Maximum number of FAQ items to show per page',
      },
    },
  ],
}
