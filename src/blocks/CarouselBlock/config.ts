import type { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      maxRows: 10,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: false,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          required: false,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: true,
        },
      ],
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      label: 'Auto Play Interval (seconds)',
      defaultValue: 5,
      min: 3,
      max: 30,
      admin: {
        step: 1,
        description: 'How many seconds between automatic slide transitions',
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      label: 'Show Navigation Dots',
      defaultValue: true,
    },
    {
      name: 'pauseOnHover',
      type: 'checkbox',
      label: 'Pause on Hover',
      defaultValue: true,
    },
  ],
}
