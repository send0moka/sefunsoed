import type { Block } from 'payload'

export const ContactInformationBlock: Block = {
  slug: 'contactInformation',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Panel',
      defaultValue: 'Contact Information',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subjudul',
      defaultValue: 'Hubungi kami melalui berbagai saluran komunikasi berikut ini',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        {
          label: 'Horizontal (3 kolom)',
          value: 'horizontal',
        },
        {
          label: 'Vertical (1 kolom)',
          value: 'vertical',
        },
      ],
      defaultValue: 'horizontal',
    },
    {
      name: 'showHoverEffect',
      type: 'checkbox',
      label: 'Tampilkan Efek Hover',
      defaultValue: true,
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Informasi Kontak',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'iconType',
          type: 'select',
          label: 'Jenis Ikon',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Telepon', value: 'phone' },
            { label: 'Alamat', value: 'address' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Website', value: 'website' },
            { label: 'Jam Operasional', value: 'time' },
          ],
          defaultValue: 'email',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          required: true,
        },
        {
          name: 'content',
          type: 'text',
          label: 'Konten',
          required: true,
        },
        {
          name: 'colorScheme',
          type: 'select',
          label: 'Skema Warna',
          options: [
            { label: 'Biru', value: 'blue' },
            { label: 'Hijau', value: 'green' },
            { label: 'Ungu', value: 'purple' },
            { label: 'Emerald', value: 'emerald' },
            { label: 'Indigo', value: 'indigo' },
            { label: 'Orange', value: 'orange' },
            { label: 'Red', value: 'red' },
            { label: 'Pink', value: 'pink' },
          ],
          defaultValue: 'blue',
        },
      ],
    },
  ],
}
