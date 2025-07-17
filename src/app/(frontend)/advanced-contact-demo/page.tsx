'use client'
import React from 'react'
import AdvancedContactInformationPanel, {
  ContactInfo,
} from '../../../components/ContactInformationPanel/AdvancedContactInformationPanel'
import { Mail, Phone, MapPin, MessageCircle, Globe, Clock, Users, Calendar } from 'lucide-react'

const AdvancedContactDemoPage: React.FC = () => {
  // Extended contact data with more functionality
  const extendedContacts: ContactInfo[] = [
    {
      icon: <Mail size={24} />,
      title: 'Email Utama',
      content: 'admin@sefunsoed.ac.id',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: 'mailto:admin@sefunsoed.ac.id',
      ariaLabel: 'Kirim email ke admin@sefunsoed.ac.id',
    },
    {
      icon: <Phone size={24} />,
      title: 'Telepon Kantor',
      content: '+62 281 123 4567',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      href: 'tel:+62281123456',
      ariaLabel: 'Hubungi telepon kantor',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp',
      content: '+62 812 3456 7890',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      href: 'https://wa.me/6281234567890',
      ariaLabel: 'Hubungi WhatsApp',
    },
    {
      icon: <Globe size={24} />,
      title: 'Website',
      content: 'www.sefunsoed.ac.id',
      iconColor: 'text-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      href: 'https://www.sefunsoed.ac.id',
      ariaLabel: 'Kunjungi website',
    },
    {
      icon: <Clock size={24} />,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08:00 - 16:00 WIB',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      ariaLabel: 'Jam operasional kantor',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Lokasi',
      content: 'Fakultas Ekonomi dan Bisnis, Universitas Jenderal Soedirman, Purwokerto',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: 'https://maps.google.com/?q=Fakultas+Ekonomi+dan+Bisnis+Universitas+Jenderal+Soedirman+Purwokerto',
      ariaLabel: 'Lihat lokasi di Google Maps',
    },
  ]

  // Interactive contact data with onClick handlers
  const interactiveContacts: ContactInfo[] = [
    {
      icon: <Users size={24} />,
      title: 'Hubungi Tim Support',
      content: 'Klik untuk menghubungi tim support kami',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      onClick: () => alert('Menghubungi tim support...'),
      ariaLabel: 'Hubungi tim support',
    },
    {
      icon: <Calendar size={24} />,
      title: 'Jadwalkan Pertemuan',
      content: 'Klik untuk membuat janji temu',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: () => alert('Membuka kalender untuk jadwal pertemuan...'),
      ariaLabel: 'Jadwalkan pertemuan',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Live Chat',
      content: 'Mulai chat dengan customer service',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      onClick: () => alert('Membuka live chat...'),
      ariaLabel: 'Mulai live chat',
    },
  ]

  const handleContactClick = (contact: ContactInfo, index: number) => {
    console.log('Contact clicked:', contact, 'at index:', index)
    // Custom logic for handling contact clicks
    if (contact.href) {
      window.open(contact.href, '_blank')
    } else {
      alert(`Kontak ${contact.title} diklik!`)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Advanced Contact Information Panel
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Versi advanced dengan fitur interaktif, accessibility, dan customization lebih lanjut
          </p>
        </div>

        {/* Extended Contacts with External Links */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Extended Contact Information
            </h2>
            <p className="text-neutral-600">
              Kontak lengkap dengan link eksternal dan ikon indicator
            </p>
          </div>
          <AdvancedContactInformationPanel
            title="Hubungi Fakultas"
            subtitle="Berbagai cara untuk menghubungi Fakultas Ekonomi dan Bisnis"
            contacts={extendedContacts}
            layout="horizontal"
            showExternalLinkIcon={true}
          />
        </div>

        {/* Interactive Contacts */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Interactive Contacts</h2>
            <p className="text-neutral-600">Kontak dengan aksi custom dan event handlers</p>
          </div>
          <AdvancedContactInformationPanel
            title="Layanan Interaktif"
            subtitle="Klik pada kartu untuk mengakses layanan"
            contacts={interactiveContacts}
            layout="horizontal"
            showExternalLinkIcon={false}
          />
        </div>

        {/* Vertical Layout with Custom Handler */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Vertical Layout with Custom Handler
            </h2>
            <p className="text-neutral-600">Layout vertikal dengan custom click handler</p>
          </div>
          <AdvancedContactInformationPanel
            title="Kontak Vertikal"
            subtitle="Setiap kontak memiliki aksi yang dapat disesuaikan"
            contacts={extendedContacts.slice(0, 3)}
            layout="vertical"
            onContactClick={handleContactClick}
            showExternalLinkIcon={true}
          />
        </div>

        {/* Without Hover Effects */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Static Version</h2>
            <p className="text-neutral-600">
              Versi statis tanpa efek hover untuk tampilan yang lebih formal
            </p>
          </div>
          <AdvancedContactInformationPanel
            title="Informasi Kontak Resmi"
            subtitle="Kontak resmi tanpa efek interaktif"
            contacts={extendedContacts.slice(0, 3)}
            layout="horizontal"
            showHoverEffect={false}
            showExternalLinkIcon={false}
          />
        </div>

        {/* Features Documentation */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Advanced Features</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Interactivity:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Click handlers</li>
                  <li>• External links</li>
                  <li>• Custom actions</li>
                  <li>• Keyboard navigation</li>
                  <li>• Focus management</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Accessibility:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• ARIA labels</li>
                  <li>• Keyboard support</li>
                  <li>• Screen reader friendly</li>
                  <li>• Focus indicators</li>
                  <li>• Semantic HTML</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Customization:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Custom contact data</li>
                  <li>• Flexible layouts</li>
                  <li>• Configurable styling</li>
                  <li>• Event handlers</li>
                  <li>• Icon indicators</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-neutral-900 mb-3">Technical:</h4>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• TypeScript support</li>
                  <li>• Responsive design</li>
                  <li>• Performance optimized</li>
                  <li>• SEO friendly</li>
                  <li>• Modern React patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedContactDemoPage
