import type { CollectionConfig } from 'payload'

export const RegistrationSubmissions: CollectionConfig = {
  slug: 'registration-submissions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'selectedProgram', 'createdAt'],
  },
  fields: [
    {
      name: 'selectedProgram',
      type: 'text',
      label: 'Selected Program',
      admin: {
        description: 'Program yang dipilih oleh pendaftar',
      },
    },
    {
      name: 'personalInfo',
      type: 'json',
      label: 'Personal Information',
      admin: {
        description: 'Informasi pribadi pendaftar dalam format JSON',
      },
    },
    {
      name: 'termsAgreed',
      type: 'checkbox',
      label: 'Terms & Conditions Agreed',
      defaultValue: false,
    },
    {
      name: 'submissionData',
      type: 'array',
      label: 'Submission Data',
      fields: [
        {
          name: 'field',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
