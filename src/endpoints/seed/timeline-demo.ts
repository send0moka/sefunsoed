import type { Page } from '@/payload-types'

export const timelineDemo: Partial<Page> = {
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
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Demonstrasi dari layout Timeline yang baru dengan berbagai format tanggal dan status event.',
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
    links: [],
  },
  layout: [
    {
      blockType: 'timeline',
      blockName: 'Timeline Perjalanan Karir',
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
                      text: 'Memulai karir baru sebagai Senior Frontend Developer di perusahaan teknologi terkemuka. Bertanggung jawab untuk mengembangkan aplikasi web modern menggunakan React dan Next.js.',
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
                      text: 'Menyelesaikan studi S1 Teknik Informatika dengan IPK 3.85. Fokus pada pengembangan web dan mobile application.',
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
        {
          date: '2022-03-15',
          dateFormat: 'full',
          title: 'Magang di Startup Tech',
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
                      text: 'Menjalani program magang selama 6 bulan di startup teknologi. Berkontribusi dalam pengembangan platform e-commerce menggunakan MERN Stack.',
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
        {
          date: '2019-01-01',
          dateFormat: 'year',
          title: 'Memulai Kuliah',
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
                      text: 'Memulai studi di jurusan Teknik Informatika. Aktif dalam organisasi mahasiswa dan berbagai kompetisi programming.',
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
          icon: 'calendar',
        },
      ],
    },
    {
      blockType: 'timeline',
      blockName: 'Timeline Proyek',
      title: 'Rencana Pengembangan Proyek',
      events: [
        {
          date: '2024-08-01',
          dateFormat: 'monthYear',
          title: 'Peluncuran Fitur AI Chat',
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
                      text: 'Implementasi fitur AI Chat menggunakan GPT-4 untuk meningkatkan customer experience.',
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
          status: 'upcoming',
          icon: 'calendar',
        },
        {
          date: '2024-07-15',
          dateFormat: 'full',
          title: 'Testing & Quality Assurance',
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
                      text: 'Melakukan comprehensive testing terhadap semua fitur baru sebelum release ke production.',
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
          icon: 'clock',
        },
        {
          date: '2024-06-01',
          dateFormat: 'monthYear',
          title: 'Development Sprint 1',
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
                      text: 'Memulai development fase pertama dengan fokus pada backend infrastructure dan API design.',
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
    description: 'Demo halaman untuk menampilkan fitur Timeline layout yang baru',
  },
}
