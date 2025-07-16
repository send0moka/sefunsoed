import type { Block } from 'payload'

export const PlanLayout: Block = {
  slug: 'planLayout',
  interfaceName: 'PlanLayoutBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Main title for the plan section',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Section Subtitle',
      admin: {
        description: 'Subtitle or description text below the main title',
      },
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Service Plans',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Plan Title',
          required: true,
          admin: {
            description: 'Name of the service plan',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Plan Description',
          required: true,
          admin: {
            description: 'Brief description of the service plan',
          },
        },
        {
          name: 'price',
          type: 'number',
          label: 'Price',
          required: true,
          admin: {
            description: 'Price in IDR',
          },
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Duration',
          admin: {
            description: 'e.g., "3 months", "6 weeks"',
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name',
          admin: {
            description: 'Lucide icon name (e.g., "BookOpen", "Globe", "Award")',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Plan Features',
          minRows: 1,
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature Text',
              required: true,
            },
          ],
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Mark as Popular',
          defaultValue: false,
          admin: {
            description: 'Show "Most Popular" badge on this plan',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Register Now',
          admin: {
            description: 'Text displayed on the register button',
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
          admin: {
            description: 'URL or path for the register button',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Plan Layouts',
    singular: 'Plan Layout',
  },
}
