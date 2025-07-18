import type { Block } from 'payload'

export const PodcastBlock: Block = {
  slug: 'podcastBlock',
  labels: {
    singular: 'Podcast Block',
    plural: 'Podcast Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Listen to Our Podcasts on Spotify',
    },
    {
      name: 'spotifyUrl',
      type: 'text',
      label: 'Spotify Show URL',
      defaultValue:
        'https://open.spotify.com/show/7MoeAljOnuz3QVMjptb5TQ?si=9zJzTPRUQMutRcUvp4KJiQ',
    },
    {
      name: 'useCustomPlayer',
      type: 'checkbox',
      label: 'Use Custom Audio Player',
      defaultValue: true,
    },
    {
      name: 'spotifyEmbedCode',
      type: 'textarea',
      label: 'Spotify Embed Code',
      admin: {
        condition: (_, siblingData) => !siblingData.useCustomPlayer,
        description: 'Paste the Spotify embed iframe code here',
      },
    },
    {
      name: 'episode',
      type: 'group',
      label: 'Featured Episode',
      admin: {
        condition: (_, siblingData) => siblingData.useCustomPlayer,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Episode Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Episode Description',
          required: true,
        },
        {
          name: 'publishedDate',
          type: 'date',
          label: 'Published Date',
          required: true,
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Cover Image',
        },
        {
          name: 'audioFile',
          type: 'text',
          label: 'Audio File Path',
          admin: {
            description: 'Path to MP3 file in public folder (e.g., /media/episode1.mp3)',
          },
        },
        {
          name: 'duration',
          type: 'number',
          label: 'Duration (seconds)',
          admin: {
            description: 'Episode duration in seconds',
          },
        },
      ],
    },
  ],
}
