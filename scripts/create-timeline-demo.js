// Simple script untuk test Timeline Block
// Jalankan dengan: node scripts/create-timeline-demo.js

const payload = require('payload')

const run = async () => {
  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: false, // We're using PostgreSQL, not MongoDB
      local: true,
    })

    const timelineDemo = {
      title: 'Timeline Demo',
      slug: 'timeline-demo',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Timeline Layout Demo',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h1',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        links: [],
      },
      layout: [
        {
          blockType: 'timeline',
          blockName: 'Timeline Demo',
          title: 'Perjalanan Karir & Pendidikan',
          events: [
            {
              date: '2024-01-15',
              dateFormat: 'full',
              title: 'Bergabung sebagai Senior Developer',
              description: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Memulai karir baru sebagai Senior Frontend Developer.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              status: 'in-progress',
              icon: 'star',
            },
            {
              date: '2023-06-01',
              dateFormat: 'monthYear',
              title: 'Lulus S1 Teknik Informatika',
              description: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Menyelesaikan studi S1 dengan IPK 3.85.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              status: 'completed',
              icon: 'check',
            },
          ],
        },
      ],
      meta: {
        title: 'Timeline Demo - Payload CMS',
        description: 'Demo halaman untuk menampilkan fitur Timeline layout',
      },
    }

    // Check if page already exists
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'timeline-demo',
        },
      },
    })

    if (existing.docs.length > 0) {
      console.log('Timeline demo page already exists!')
      process.exit(0)
    }

    // Create the page
    const result = await payload.create({
      collection: 'pages',
      data: timelineDemo,
    })

    console.log('✅ Timeline demo page created successfully!')
    console.log('📝 Page ID:', result.id)
    console.log('🔗 URL: /timeline-demo')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

run()
