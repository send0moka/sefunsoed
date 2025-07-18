import type { Block } from 'payload'

export const AccordionPeopleBlock: Block = {
  slug: 'accordionPeopleBlock',
  interfaceName: 'AccordionPeopleBlock',
  labels: {
    singular: 'Accordion People Block',
    plural: 'Accordion People Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Our Team',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Section Subtitle',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Section Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Section Image',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'people',
          type: 'array',
          label: 'People',
          minRows: 1,
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Full Name',
              required: true,
            },
            {
              name: 'position',
              type: 'text',
              label: 'Position/Role',
              required: true,
            },
            {
              name: 'major',
              type: 'text',
              label: 'Major/Field of Study',
              required: true,
            },
            {
              name: 'year',
              type: 'text',
              label: 'Year/Batch (e.g., 22 for 2022)',
              required: true,
              admin: {
                placeholder: '22',
              },
            },
            {
              name: 'photo',
              type: 'upload',
              label: 'Profile Photo',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
              admin: {
                placeholder: 'https://linkedin.com/in/username',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
              admin: {
                placeholder: 'https://instagram.com/username',
              },
            },
          ],
        },
      ],
    },
  ],
}
