import type { Block } from 'payload'

export const PartnershipBlock: Block = {
  slug: 'partnershipBlock',
  interfaceName: 'PartnershipBlock',
  labels: {
    singular: 'Partnership Block',
    plural: 'Partnership Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Our Partnership',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Partner Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          label: 'Partner Logo',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
          label: 'Partner Website URL',
          admin: {
            placeholder: 'https://example.com',
          },
        },
      ],
    },
  ],
}
