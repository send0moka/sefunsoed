'use client'
import React from 'react'
import ContactInformationPanel from '../../../components/ContactInformationPanel'
import {
  createEmailContact,
  createPhoneContact,
  createAddressContact,
  createWhatsAppContact,
  createSocialContact,
  createInteractiveContact,
  templates,
} from '../../../components/ContactInformationPanel/ContactUtils'

const ContactUtilsDemoPage: React.FC = () => {
  // Using helper functions
  const simpleContacts = [
    createEmailContact('info@sefunsoed.com'),
    createPhoneContact('+62 281 123 4567'),
    createAddressContact(
      'Jl. Prof. Dr. Boenyamin No.708, Grendeng, Kec. Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53122',
    ),
  ]

  // Using custom colors
  const customColorContacts = [
    createEmailContact('admin@sefunsoed.ac.id', 'Email Utama', 'red'),
    createPhoneContact('+62 281 123 4567', 'Telepon Kantor', 'emerald'),
    createWhatsAppContact('6281234567890', 'WhatsApp', 'green'),
  ]

  // Social media contacts
  const socialContacts = [
    createSocialContact('instagram', 'sefunsoed', 'Instagram'),
    createSocialContact('facebook', 'sefunsoed', 'Facebook'),
    createSocialContact('twitter', 'sefunsoed', 'Twitter'),
    createSocialContact('linkedin', 'company/sefunsoed', 'LinkedIn'),
    createSocialContact('youtube', 'sefunsoed', 'YouTube'),
  ]

  // Interactive contacts
  const interactiveContacts = [
    createInteractiveContact(
      'support',
      'Klik untuk membuka tiket support',
      () => {
        alert('Membuka sistem tiket support...')
      },
      'Tim Support',
      'blue',
    ),
    createInteractiveContact(
      'appointment',
      'Klik untuk jadwalkan pertemuan',
      () => {
        alert('Membuka kalender untuk jadwal pertemuan...')
      },
      'Jadwal Pertemuan',
      'green',
    ),
    createInteractiveContact(
      'document',
      'Klik untuk download dokumen',
      () => {
        alert('Mengunduh dokumen...')
      },
      'Dokumen',
      'neutral',
    ),
  ]

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Contact Utils Demo</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Demonstrasi penggunaan ContactUtils untuk membuat contact data dengan mudah
          </p>
        </div>

        {/* Simple Contacts */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Simple Helper Functions
            </h2>
            <p className="text-neutral-600">
              Menggunakan fungsi helper untuk membuat contact data dengan cepat
            </p>
          </div>
          <ContactInformationPanel
            title="Kontak Sederhana"
            subtitle="Dibuat dengan helper functions"
            contacts={simpleContacts}
            layout="horizontal"
          />
        </div>

        {/* Custom Colors */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Custom Color Schemes</h2>
            <p className="text-neutral-600">Menggunakan skema warna yang dapat disesuaikan</p>
          </div>
          <ContactInformationPanel
            title="Kontak dengan Warna Custom"
            subtitle="Setiap kontak menggunakan warna yang berbeda"
            contacts={customColorContacts}
            layout="horizontal"
          />
        </div>

        {/* Social Media */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Social Media Contacts</h2>
            <p className="text-neutral-600">Kontak media sosial dengan link otomatis</p>
          </div>
          <ContactInformationPanel
            title="Media Sosial"
            subtitle="Ikuti kami di berbagai platform media sosial"
            contacts={socialContacts}
            layout="horizontal"
          />
        </div>

        {/* Interactive Contacts */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Interactive Contacts</h2>
            <p className="text-neutral-600">Kontak dengan aksi interaktif custom</p>
          </div>
          <ContactInformationPanel
            title="Layanan Interaktif"
            subtitle="Klik untuk mengakses layanan"
            contacts={interactiveContacts}
            layout="horizontal"
          />
        </div>

        {/* Template Usage */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Pre-defined Templates</h2>
            <p className="text-neutral-600">Menggunakan template yang sudah disediakan</p>
          </div>
          <ContactInformationPanel
            title="Template SEFUNSOED"
            subtitle="Menggunakan template yang sudah disediakan"
            contacts={templates.sefunsoed.extended}
            layout="horizontal"
          />
        </div>

        {/* Code Examples */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Contoh Penggunaan Code</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-medium text-neutral-900 mb-4">Helper Functions</h4>
                <pre className="bg-neutral-100 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{`// Import helper functions
import { 
  createEmailContact, 
  createPhoneContact, 
  createAddressContact 
} from './ContactUtils'

// Create contacts easily
const contacts = [
  createEmailContact('info@sefunsoed.com'),
  createPhoneContact('+62 281 123 4567'),
  createAddressContact('Jl. Prof. Dr. Boenyamin...')
]`}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-medium text-neutral-900 mb-4">Custom Colors</h4>
                <pre className="bg-neutral-100 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{`// Using custom color schemes
const customContacts = [
  createEmailContact(
    'admin@sefunsoed.ac.id', 
    'Email Utama', 
    'red'
  ),
  createPhoneContact(
    '+62 281 123 4567', 
    'Telepon Kantor', 
    'emerald'
  )
]`}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-medium text-neutral-900 mb-4">Social Media</h4>
                <pre className="bg-neutral-100 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{`// Social media contacts
const socialContacts = [
  createSocialContact('instagram', 'sefunsoed'),
  createSocialContact('facebook', 'sefunsoed'),
  createSocialContact('twitter', 'sefunsoed')
]`}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-medium text-neutral-900 mb-4">Interactive</h4>
                <pre className="bg-neutral-100 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{`// Interactive contacts
const interactiveContacts = [
  createInteractiveContact(
    'support', 
    'Klik untuk membuka tiket support', 
    () => alert('Opening support...')
  )
]`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUtilsDemoPage
