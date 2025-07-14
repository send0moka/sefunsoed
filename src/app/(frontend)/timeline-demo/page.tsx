import React from 'react'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'

const timelineData: TimelineBlockProps = {
  blockType: 'timeline',
  title: 'Timeline Demo - Perjalanan Karir',
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
}

export default function TimelineDemoPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Timeline Block Demo</h1>
          <p className="text-muted-foreground">
            Demo halaman untuk menampilkan Timeline layout yang baru dengan berbagai format tanggal
            dan status event.
          </p>
        </div>

        <TimelineBlock {...timelineData} />

        {/* Timeline kedua untuk demo variasi */}
        <TimelineBlock
          blockType="timeline"
          title="Rencana Pengembangan Proyek"
          events={[
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
              date: '2024-05-01',
              dateFormat: 'monthYear',
              title: 'Proyek Dibatalkan',
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
                          text: 'Proyek ini dibatalkan karena perubahan prioritas bisnis.',
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
              status: 'cancelled',
              icon: 'x',
            },
          ]}
        />
      </div>
    </main>
  )
}
