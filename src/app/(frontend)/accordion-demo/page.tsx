import React from 'react'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'

const faqData: AccordionBlockProps = {
  blockType: 'accordion',
  title: 'Frequently Asked Questions',
  allowMultiple: false,
  panels: [
    {
      title: 'Apa itu Payload CMS?',
      content: {
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
                  text: 'Payload CMS adalah headless content management system yang dibangun dengan Node.js dan TypeScript. Payload memberikan fleksibilitas penuh untuk developer dalam membangun aplikasi web modern dengan backend yang powerful dan admin panel yang user-friendly.',
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
      isOpenByDefault: true,
      variant: 'default',
      id: '1',
    },
    {
      title: 'Bagaimana cara menggunakan Accordion Layout?',
      content: {
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
                  text: 'Accordion layout dapat digunakan dengan mudah melalui admin panel Payload CMS. Anda dapat menambahkan panel accordion baru, mengatur konten rich text, memilih variant styling, dan mengatur apakah panel terbuka secara default atau tidak.',
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
      isOpenByDefault: false,
      variant: 'bordered',
      id: '2',
    },
    {
      title: 'Apa keunggulan menggunakan Timeline dan Accordion Layout?',
      content: {
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
                  text: 'Timeline dan Accordion layout memberikan cara yang efektif untuk menyajikan informasi secara terstruktur. Timeline cocok untuk menampilkan kronologi event, sedangkan Accordion sangat berguna untuk FAQ, dokumentasi, atau konten yang panjang yang perlu diorganisir dengan baik.',
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
      isOpenByDefault: false,
      variant: 'filled',
      id: '3',
    },
    {
      title: 'Apakah layout ini responsive?',
      content: {
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
                  text: 'Ya, semua layout yang kami buat menggunakan pendekatan mobile-first dan fully responsive. Layout akan menyesuaikan dengan baik di berbagai ukuran layar mulai dari smartphone hingga desktop.',
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
      isOpenByDefault: false,
      variant: 'ghost',
      id: '4',
    },
  ],
}

const multipleAccordionData: AccordionBlockProps = {
  blockType: 'accordion',
  title: 'Product Features (Multiple Open)',
  allowMultiple: true,
  panels: [
    {
      title: 'Rich Text Editor',
      content: {
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
                  text: 'Editor rich text yang powerful dengan support untuk headings, formatting, links, dan custom blocks.',
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
      isOpenByDefault: true,
      variant: 'default',
      id: '5',
    },
    {
      title: 'Layout Builder',
      content: {
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
                  text: 'Sistem layout builder yang fleksibel dengan berbagai block components seperti Timeline, Accordion, Media, CTA, dan lainnya.',
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
      isOpenByDefault: true,
      variant: 'bordered',
      id: '6',
    },
    {
      title: 'Type Safety',
      content: {
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
                  text: 'Full TypeScript support dengan auto-generated types untuk semua collections dan fields.',
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
      isOpenByDefault: false,
      variant: 'filled',
      id: '7',
    },
  ],
}

export default function AccordionDemoPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Accordion Block Demo</h1>
          <p className="text-muted-foreground">
            Demo halaman untuk menampilkan Accordion layout dengan berbagai variant styling dan
            konfigurasi.
          </p>
        </div>

        {/* FAQ Accordion (Single Open) */}
        <AccordionBlock {...faqData} />

        {/* Features Accordion (Multiple Open) */}
        <AccordionBlock {...multipleAccordionData} />

        {/* Demo variant-variant yang berbeda */}
        <AccordionBlock
          blockType="accordion"
          title="Styling Variants Demo"
          allowMultiple={true}
          panels={[
            {
              title: 'Default Variant',
              content: {
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
                          text: 'Ini adalah variant default dengan card styling dan shadow.',
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
              variant: 'default',
              isOpenByDefault: false,
              id: '8',
            },
            {
              title: 'Bordered Variant',
              content: {
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
                          text: 'Variant dengan border yang jelas dan clean.',
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
              variant: 'bordered',
              isOpenByDefault: false,
              id: '9',
            },
            {
              title: 'Filled Variant',
              content: {
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
                          text: 'Variant dengan background yang filled untuk emphasis.',
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
              variant: 'filled',
              isOpenByDefault: false,
              id: '10',
            },
            {
              title: 'Ghost Variant',
              content: {
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
                          text: 'Variant minimal dengan styling ghost yang subtle.',
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
              variant: 'ghost',
              isOpenByDefault: false,
              id: '11',
            },
          ]}
        />
      </div>
    </main>
  )
}
