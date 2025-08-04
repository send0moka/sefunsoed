import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Upload logo image for the header',
      },
    },
    {
      name: 'logoSize',
      type: 'select',
      label: 'Logo Size',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (40px height)',
          value: 'small',
        },
        {
          label: 'Medium (48px height)',
          value: 'medium',
        },
        {
          label: 'Large (56px height)',
          value: 'large',
        },
      ],
      admin: {
        description: 'Choose the size of the logo in the header',
        condition: (data) => data.logo,
      },
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      label: 'Show Search',
      defaultValue: true,
      admin: {
        description: 'Enable/disable search functionality in header',
      },
    },
    {
      name: 'showLanguageSwitcher',
      type: 'checkbox',
      label: 'Show Language Switcher',
      defaultValue: true,
      admin: {
        description: 'Enable/disable language switcher in header',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'link',
              type: 'group',
              admin: {
                hideGutter: true,
                width: '70%',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'type',
                      type: 'radio',
                      admin: {
                        layout: 'horizontal',
                        width: '50%',
                      },
                      defaultValue: 'reference',
                      options: [
                        {
                          label: 'Internal link',
                          value: 'reference',
                        },
                        {
                          label: 'Custom URL',
                          value: 'custom',
                        },
                      ],
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      admin: {
                        style: {
                          alignSelf: 'flex-end',
                        },
                        width: '50%',
                      },
                      label: 'Open in new tab',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'reference',
                      type: 'relationship',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'reference',
                        width: '50%',
                      },
                      label: 'Document to link to',
                      relationTo: ['pages', 'posts'],
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'custom',
                        width: '50%',
                      },
                      label: 'Custom URL',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                      label: 'Label (English)',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'labelIndonesian',
              type: 'text',
              label: 'Label (Indonesian)',
              admin: {
                width: '30%',
                description: 'Indonesian version of the navigation label',
              },
            },
          ],
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
