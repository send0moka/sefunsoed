'use client'
import React from 'react'
import ContactInformationPanel, { ContactInfo } from '../../../components/ContactInformationPanel'
import { Mail, Phone, MapPin, MessageCircle, Globe, Clock } from 'lucide-react'

const ContactDemoPage: React.FC = () => {
  // Custom contact data example
  const customContacts: ContactInfo[] = [
    {
      icon: <Mail size={24} />,
      title: 'Email Utama',
      content: 'admin@sefunsoed.ac.id',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Phone size={24} />,
      title: 'Telepon Kantor',
      content: '+62 281 123 4567',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp',
      content: '+62 812 3456 7890',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <Globe size={24} />,
      title: 'Website',
      content: 'www.sefunsoed.ac.id',
      iconColor: 'text-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: <Clock size={24} />,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08:00 - 16:00 WIB',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Lokasi',
      content: 'Fakultas Ekonomi dan Bisnis, Universitas Jenderal Soedirman, Purwokerto',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Contact Information Panel Demo
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Demo implementasi Contact Information Panel dengan desain kartu berlatar putih, sudut
            membulat, dan efek hover yang interaktif
          </p>
        </div>

        {/* Layout Default (Horizontal) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Layout Default (Horizontal)
            </h2>
            <p className="text-neutral-600">
              Tata letak horizontal dengan 3 kolom untuk tampilan desktop
            </p>
          </div>
          <ContactInformationPanel />
        </div>

        {/* Layout Vertical */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Layout Vertical</h2>
            <p className="text-neutral-600">
              Tata letak vertikal dengan satu kolom untuk tampilan yang lebih rapi
            </p>
          </div>
          <ContactInformationPanel
            layout="vertical"
            title="Kontak Kami"
            subtitle="Dapatkan informasi lebih lanjut melalui kontak berikut"
          />
        </div>

        {/* Custom Contacts */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Custom Contact Information
            </h2>
            <p className="text-neutral-600">
              Implementasi dengan data kontak yang dapat disesuaikan
            </p>
          </div>
          <ContactInformationPanel
            title="Hubungi Fakultas"
            subtitle="Berbagai cara untuk menghubungi Fakultas Ekonomi dan Bisnis"
            contacts={customContacts}
            layout="horizontal"
          />
        </div>

        {/* Without Hover Effect */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Tanpa Efek Hover</h2>
            <p className="text-neutral-600">
              Versi statis tanpa efek hover untuk tampilan yang lebih sederhana
            </p>
          </div>
          <ContactInformationPanel
            showHoverEffect={false}
            title="Informasi Kontak"
            subtitle="Kontak resmi Fakultas Ekonomi dan Bisnis"
          />
        </div>

        {/* Features Documentation */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Fitur dan Spesifikasi</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Design Features:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Kartu dengan latar putih</li>
                  <li>• Sudut membulat (rounded-lg)</li>
                  <li>• Border abu-abu tipis</li>
                  <li>• Bayangan halus (shadow-sm)</li>
                  <li>• Efek hover interaktif</li>
                  <li>• Transisi smooth 300ms</li>
                  <li>• Scale transform saat hover</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Color Scheme:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>
                    • <span className="text-blue-600 font-medium">Biru</span> untuk email
                  </li>
                  <li>
                    • <span className="text-green-600 font-medium">Hijau</span> untuk telepon
                  </li>
                  <li>
                    • <span className="text-purple-600 font-medium">Ungu</span> untuk alamat
                  </li>
                  <li>• Background pastel kontras</li>
                  <li>• Konsistensi visual terjaga</li>
                  <li>• Warna dapat disesuaikan</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Customization:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Title & subtitle dapat diubah</li>
                  <li>• Layout vertical/horizontal</li>
                  <li>• Custom contact data</li>
                  <li>• Custom className</li>
                  <li>• Toggle hover effects</li>
                  <li>• Responsive design</li>
                  <li>• TypeScript support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDemoPage
