import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RegistrationForm: Block = {
  slug: 'registrationForm',
  interfaceName: 'RegistrationFormBlock',
  fields: [
    {
      name: 'formId',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Associated Form',
      admin: {
        description: 'Select the form that will receive submissions from this registration form',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Form Title',
      defaultValue: 'Registration Form',
      admin: {
        description: 'Title displayed at the top of the registration form',
      },
    },
    {
      name: 'programs',
      type: 'array',
      label: 'Available Programs',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'programId',
          type: 'text',
          label: 'Program ID',
          required: true,
          admin: {
            description: 'Unique identifier for this program',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Program Title',
          required: true,
          admin: {
            description: 'Display name of the program',
          },
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Program Description',
          required: true,
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
            description: 'Detailed description shown in collapsible section',
          },
        },
        {
          name: 'price',
          type: 'number',
          label: 'Program Price',
          admin: {
            description: 'Price in IDR (optional)',
          },
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Program Duration',
          admin: {
            description: 'e.g., "6 months", "1 year"',
          },
        },
        {
          name: 'isAvailable',
          type: 'checkbox',
          label: 'Currently Available',
          defaultValue: true,
          admin: {
            description: 'Whether this program is currently accepting registrations',
          },
        },
      ],
    },
    {
      name: 'personalFields',
      type: 'array',
      label: 'Personal Information Fields',
      admin: {
        description: 'Configure which fields to show in step 2',
        initCollapsed: true,
      },
      defaultValue: [
        { fieldName: 'firstName', label: 'First Name', type: 'text', required: true },
        { fieldName: 'lastName', label: 'Last Name', type: 'text', required: true },
        { fieldName: 'email', label: 'Email Address', type: 'email', required: true },
        { fieldName: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { fieldName: 'address', label: 'Address', type: 'textarea', required: false },
      ],
      fields: [
        {
          name: 'fieldName',
          type: 'text',
          label: 'Field Name',
          required: true,
          admin: {
            description: 'Internal field identifier (camelCase)',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Display Label',
          required: true,
          admin: {
            description: 'Label shown to users',
          },
        },
        {
          name: 'type',
          type: 'select',
          label: 'Field Type',
          required: true,
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'tel' },
            { label: 'Number', value: 'number' },
            { label: 'Date', value: 'date' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Faculty', value: 'faculty' },
            { label: 'Major', value: 'major' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required Field',
          defaultValue: false,
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder Text',
          admin: {
            description: 'Placeholder text for input fields',
          },
        },
        {
          name: 'selectOptions',
          type: 'textarea',
          label: 'Select Options (JSON format)',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'select',
            description:
              'Options for select dropdown in JSON format: [{"label":"Option 1","value":"option1"},{"label":"Option 2","value":"option2"}]',
          },
        },
      ],
    },
    {
      name: 'termsAndConditions',
      type: 'richText',
      label: 'Terms and Conditions',
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
        description: 'Terms that users must agree to before submitting',
      },
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Submit Registration',
      admin: {
        description: 'Text displayed on the final submit button',
      },
    },
    {
      name: 'successMessage',
      type: 'richText',
      label: 'Success Message',
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
        description: 'Message shown after successful form submission',
      },
    },
  ],
  labels: {
    plural: 'Registration Forms',
    singular: 'Registration Form',
  },
}
