import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
      admin: {
        description:
          'Upload logo image for the footer (optional, will use default logo if not set)',
      },
    },
    {
      name: 'logoSize',
      type: 'select',
      label: 'Logo Size',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (32px height)',
          value: 'small',
        },
        {
          label: 'Medium (40px height)',
          value: 'medium',
        },
        {
          label: 'Large (48px height)',
          value: 'large',
        },
      ],
      admin: {
        description: 'Choose the size of the logo in the footer',
        condition: (data) => data.logo,
      },
    },
    {
      name: 'showThemeSelector',
      type: 'checkbox',
      label: 'Show Theme Selector',
      defaultValue: true,
      admin: {
        description: 'Enable/disable theme switcher in footer',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
