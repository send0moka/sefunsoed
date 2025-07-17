# Contact Information Panel Implementation

## Overview
Implementasi Contact Information Panel yang sesuai dengan spesifikasi desain yang diminta. Panel ini menampilkan informasi kontak dalam format kartu yang menarik dengan desain modern dan interaktif.

## Fitur Utama

### 1. Desain Visual
- **Kartu dengan latar putih**: `bg-white`
- **Sudut membulat**: `rounded-lg`
- **Border abu-abu tipis**: `border-neutral-200`
- **Bayangan halus**: `shadow-sm`
- **Efek hover**: Transform scale 105% + shadow lebih dalam

### 2. Skema Warna Konsisten
- **Email**: Biru (`text-blue-600`, `bg-blue-50`)
- **Telepon**: Hijau (`text-green-600`, `bg-green-50`)
- **Alamat**: Ungu (`text-purple-600`, `bg-purple-50`)
- **WhatsApp**: Emerald (`text-emerald-600`, `bg-emerald-50`)
- **Website**: Indigo (`text-indigo-600`, `bg-indigo-50`)
- **Jam Operasional**: Orange (`text-orange-600`, `bg-orange-50`)

### 3. Layout Responsif
- **Desktop**: 3 kolom horizontal
- **Tablet**: 1 kolom
- **Mobile**: 1 kolom
- **Vertikal**: 1 kolom di semua ukuran

### 4. Interaktivitas
- Efek hover dengan animasi smooth
- Click handlers untuk aksi custom
- Link eksternal otomatis
- Keyboard navigation support
- Accessibility features

## Struktur File

```
src/
├── components/
│   └── ContactInformationPanel/
│       ├── index.tsx                           # Export utama
│       ├── ContactInformationPanel.tsx         # Komponen utama
│       ├── AdvancedContactInformationPanel.tsx # Versi advanced
│       ├── ContactUtils.tsx                    # Helper utilities
│       ├── styles.css                          # Custom styles
│       └── README.md                           # Dokumentasi
├── blocks/
│   └── ContactInformation/
│       ├── index.ts                            # Export block
│       ├── config.ts                           # Payload CMS config
│       └── Component.tsx                       # Block component
└── app/
    └── (frontend)/
        ├── contact-demo/
        │   └── page.tsx                        # Demo basic
        ├── advanced-contact-demo/
        │   └── page.tsx                        # Demo advanced
        └── contact-utils-demo/
            └── page.tsx                        # Demo utilities
```

## Komponen yang Tersedia

### 1. ContactInformationPanel (Basic)
Komponen dasar dengan fitur standard.

```typescript
import ContactInformationPanel from '@/components/ContactInformationPanel'

<ContactInformationPanel
  title="Contact Information"
  subtitle="Hubungi kami melalui berbagai saluran komunikasi"
  layout="horizontal"
  showHoverEffect={true}
  contacts={customContacts}
/>
```

### 2. AdvancedContactInformationPanel
Versi advanced dengan fitur tambahan.

```typescript
import AdvancedContactInformationPanel from '@/components/ContactInformationPanel/AdvancedContactInformationPanel'

<AdvancedContactInformationPanel
  title="Hubungi Kami"
  contacts={extendedContacts}
  showExternalLinkIcon={true}
  onContactClick={handleContactClick}
/>
```

### 3. ContactUtils
Helper functions untuk membuat contact data.

```typescript
import { createEmailContact, createPhoneContact, templates } from '@/components/ContactInformationPanel/ContactUtils'

const contacts = [
  createEmailContact('info@sefunsoed.com'),
  createPhoneContact('+62 281 123 4567'),
  // atau gunakan template
  ...templates.sefunsoed.basic
]
```

## Payload CMS Integration

Block untuk Payload CMS tersedia dengan konfigurasi lengkap:

```typescript
// payload.config.ts
import { ContactInformationBlock } from '@/blocks/ContactInformation'

export default buildConfig({
  blocks: [
    ContactInformationBlock,
    // ... other blocks
  ]
})
```

## API Reference

### ContactInformationPanel Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Contact Information"` | Judul panel |
| `subtitle` | `string` | `"Hubungi kami..."` | Subjudul panel |
| `contacts` | `ContactInfo[]` | `defaultContacts` | Array data kontak |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout kartu |
| `showHoverEffect` | `boolean` | `true` | Menampilkan efek hover |
| `className` | `string` | `""` | CSS class tambahan |
| `cardClassName` | `string` | `""` | CSS class untuk kartu |

### ContactInfo Interface
```typescript
interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string
  iconColor: string
  textColor: string
  bgColor: string
  href?: string
  onClick?: () => void
  ariaLabel?: string
}
```

### ContactUtils Functions
```typescript
// Helper functions
createEmailContact(email: string, title?: string, colorScheme?: ColorScheme)
createPhoneContact(phone: string, title?: string, colorScheme?: ColorScheme)
createAddressContact(address: string, title?: string, colorScheme?: ColorScheme)
createWhatsAppContact(phone: string, title?: string, colorScheme?: ColorScheme)
createWebsiteContact(website: string, title?: string, colorScheme?: ColorScheme)
createSocialContact(type: SocialType, username: string, title?: string, colorScheme?: ColorScheme)
createInteractiveContact(type: ContactType, content: string, onClick: () => void, title?: string, colorScheme?: ColorScheme)
```

## Cara Penggunaan

### 1. Basic Usage
```typescript
import ContactInformationPanel from '@/components/ContactInformationPanel'

const MyPage = () => {
  return (
    <div>
      <ContactInformationPanel />
    </div>
  )
}
```

### 2. Custom Contacts
```typescript
import ContactInformationPanel from '@/components/ContactInformationPanel'
import { Mail, Phone, MapPin } from 'lucide-react'

const customContacts = [
  {
    icon: <Mail size={24} />,
    title: "Email Utama",
    content: "admin@sefunsoed.ac.id",
    iconColor: "text-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "mailto:admin@sefunsoed.ac.id"
  },
  // ... more contacts
]

const MyPage = () => {
  return (
    <ContactInformationPanel
      title="Hubungi Kami"
      contacts={customContacts}
      layout="horizontal"
    />
  )
}
```

### 3. Using Helper Functions
```typescript
import ContactInformationPanel from '@/components/ContactInformationPanel'
import { createEmailContact, createPhoneContact, templates } from '@/components/ContactInformationPanel/ContactUtils'

const MyPage = () => {
  const contacts = [
    createEmailContact('info@sefunsoed.com'),
    createPhoneContact('+62 281 123 4567'),
    // atau gunakan template
    ...templates.sefunsoed.basic
  ]

  return (
    <ContactInformationPanel
      contacts={contacts}
      layout="horizontal"
    />
  )
}
```

## Demo Pages

### 1. Basic Demo
```
http://localhost:3000/contact-demo
```
Menampilkan implementasi dasar dengan berbagai layout dan konfigurasi.

### 2. Advanced Demo
```
http://localhost:3000/advanced-contact-demo
```
Menampilkan fitur advanced dengan interaktivitas dan customization.

### 3. Utils Demo
```
http://localhost:3000/contact-utils-demo
```
Menampilkan penggunaan helper functions dan templates.

## Customization

### 1. Mengubah Warna
```typescript
// Custom color scheme
const customContact = {
  icon: <Mail size={24} />,
  title: "Email",
  content: "info@example.com",
  iconColor: "text-red-600",
  textColor: "text-red-600",
  bgColor: "bg-red-50"
}
```

### 2. Menambah Jenis Kontak Baru
```typescript
import { Linkedin } from 'lucide-react'

const linkedinContact = {
  icon: <Linkedin size={24} />,
  title: "LinkedIn",
  content: "company/sefunsoed",
  iconColor: "text-blue-700",
  textColor: "text-blue-700",
  bgColor: "bg-blue-100",
  href: "https://linkedin.com/company/sefunsoed"
}
```

### 3. Custom Click Handler
```typescript
const interactiveContact = {
  icon: <Users size={24} />,
  title: "Support",
  content: "Klik untuk membuka tiket support",
  iconColor: "text-blue-600",
  textColor: "text-blue-600",
  bgColor: "bg-blue-50",
  onClick: () => {
    // Custom action
    openSupportTicket()
  }
}
```

## Best Practices

### 1. Accessibility
- Gunakan `ariaLabel` untuk screen readers
- Implementasikan keyboard navigation
- Pastikan kontras warna yang cukup
- Gunakan semantic HTML

### 2. Performance
- Lazy load ikon jika diperlukan
- Optimize gambar dan assets
- Gunakan React.memo untuk komponen yang tidak berubah
- Implementasikan virtualization untuk list panjang

### 3. Responsive Design
- Test di berbagai ukuran layar
- Gunakan breakpoints yang sesuai
- Pastikan touch targets cukup besar
- Implementasikan proper spacing

### 4. Content Strategy
- Gunakan informasi kontak yang akurat
- Update secara berkala
- Pertimbangkan timezone untuk jam operasional
- Sediakan alternatif kontak

## Troubleshooting

### 1. Ikon tidak muncul
- Pastikan lucide-react terinstall
- Check import statement
- Verify ikon name yang benar

### 2. Styling tidak sesuai
- Pastikan Tailwind CSS terkonfigurasi
- Check class names
- Verify custom CSS tidak conflict

### 3. Click handler tidak berfungsi
- Check event handler syntax
- Verify onClick prop
- Debug dengan console.log

### 4. Responsive issue
- Test di berbagai device
- Check breakpoints
- Verify grid classes

## Future Enhancements

### 1. Fitur Tambahan
- Animation yang lebih complex
- Loading states
- Error handling
- Internationalization

### 2. Integration
- Analytics tracking
- CRM integration
- API endpoints
- Real-time updates

### 3. Accessibility
- High contrast mode
- Keyboard shortcuts
- Voice commands
- Screen reader improvements

## Dependencies

```json
{
  "react": "^18.0.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.0.0"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (dengan polyfills)

## License

MIT License - dapat digunakan secara bebas dalam proyek komersial maupun non-komersial.
