import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Accordion Title',
      admin: {
        description: 'Optional title for the accordion section',
      },
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      label: 'Allow Multiple Panels Open',
      defaultValue: false,
      admin: {
        description: 'Allow multiple accordion panels to be open at the same time',
      },
    },
    {
      name: 'panels',
      type: 'array',
      label: 'Accordion Panels',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Panel Title',
          required: true,
          admin: {
            description: 'The header text for this accordion panel',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Panel Content',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description: 'The content that will be shown when panel is expanded',
          },
        },
        {
          name: 'isOpenByDefault',
          type: 'checkbox',
          label: 'Open by Default',
          defaultValue: false,
          admin: {
            description: 'Whether this panel should be open when the page loads',
          },
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Panel Variant',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Bordered',
              value: 'bordered',
            },
            {
              label: 'Filled',
              value: 'filled',
            },
            {
              label: 'Ghost',
              value: 'ghost',
            },
          ],
          admin: {
            description: 'Visual style variant for this panel',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Accordions',
    singular: 'Accordion',
  },
}
