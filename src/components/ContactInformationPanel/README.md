# Contact Information Panel

Komponen Contact Information Panel yang menampilkan informasi kontak dalam format kartu yang menarik dan interaktif.

## Fitur Utama

- **Desain Kartu Modern**: Kartu dengan latar putih, sudut membulat, border abu-abu tipis, dan bayangan halus
- **Efek Hover Interaktif**: Animasi scale dan shadow saat hover untuk meningkatkan interaktivitas
- **Responsive Design**: Otomatis menyesuaikan layout untuk berbagai ukuran layar
- **Customizable**: Dapat disesuaikan dengan mudah melalui props
- **TypeScript Support**: Fully typed untuk development experience yang lebih baik

## Spesifikasi Visual

### Desain Kartu
- Background: Putih (`bg-white`)
- Border: Abu-abu tipis (`border-neutral-200`)
- Sudut: Membulat (`rounded-lg`)
- Bayangan: Halus (`shadow-sm`)
- Hover Effect: Scale 105% + shadow lebih dalam

### Skema Warna
- **Email**: Biru (`text-blue-600`, `bg-blue-50`)
- **Telepon**: Hijau (`text-green-600`, `bg-green-50`)
- **Alamat**: Ungu (`text-purple-600`, `bg-purple-50`)
- **WhatsApp**: Emerald (`text-emerald-600`, `bg-emerald-50`)
- **Website**: Indigo (`text-indigo-600`, `bg-indigo-50`)
- **Jam Operasional**: Orange (`text-orange-600`, `bg-orange-50`)

## Penggunaan

### Import Komponen
```typescript
import ContactInformationPanel from '@/components/ContactInformationPanel'
```

### Penggunaan Dasar
```typescript
<ContactInformationPanel />
```

### Penggunaan dengan Props
```typescript
<ContactInformationPanel
  title="Hubungi Kami"
  subtitle="Berbagai cara untuk menghubungi kami"
  layout="horizontal"
  showHoverEffect={true}
  contacts={customContacts}
/>
```

### Custom Contact Data
```typescript
const customContacts = [
  {
    icon: <Mail size={24} />,
    title: "Email",
    content: "info@example.com",
    iconColor: "text-blue-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  // ... more contacts
]
```

## Props

### ContactInformationPanel Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Contact Information"` | Judul panel |
| `subtitle` | `string` | `"Hubungi kami melalui..."` | Subjudul panel |
| `contacts` | `ContactInfo[]` | `defaultContacts` | Array data kontak |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout kartu |
| `showHoverEffect` | `boolean` | `true` | Menampilkan efek hover |
| `className` | `string` | `""` | CSS class tambahan |
| `cardClassName` | `string` | `""` | CSS class untuk kartu |

### ContactInfo Type
```typescript
interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string
  iconColor: string
  textColor: string
  bgColor: string
}
```

## Layout Options

### Horizontal Layout
- Desktop: 3 kolom (lg:grid-cols-3)
- Tablet: 1 kolom (md:grid-cols-1)
- Mobile: 1 kolom (default)

### Vertical Layout
- Semua ukuran layar: 1 kolom (md:grid-cols-1)

## Payload CMS Block

Komponen ini juga tersedia sebagai block untuk Payload CMS:

```typescript
import { ContactInformationBlock } from '@/blocks/ContactInformation'

// Dalam payload.config.ts
blocks: [
  ContactInformationBlock,
  // ... other blocks
]
```

## Demo

Untuk melihat demo lengkap dengan berbagai varian, akses:
```
/contact-demo
```

## Struktur File

```
src/
├── components/
│   └── ContactInformationPanel/
│       ├── index.tsx
│       └── ContactInformationPanel.tsx
├── blocks/
│   └── ContactInformation/
│       ├── index.ts
│       ├── config.ts
│       └── Component.tsx
└── app/
    └── (frontend)/
        └── contact-demo/
            └── page.tsx
```

## Customization

### Mengubah Warna Default
```typescript
// Buat data kontak custom dengan warna berbeda
const customContacts = [
  {
    icon: <Mail size={24} />,
    title: "Email",
    content: "info@example.com",
    iconColor: "text-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50"
  }
]
```

### Menambah Jenis Kontak Baru
```typescript
import { Linkedin } from 'lucide-react'

const linkedinContact = {
  icon: <Linkedin size={24} />,
  title: "LinkedIn",
  content: "company/example",
  iconColor: "text-blue-700",
  textColor: "text-blue-700",
  bgColor: "bg-blue-100"
}
```

## Accessibility

- Semantic HTML dengan proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- High contrast color combinations
- Proper ARIA labels (dapat ditambahkan sesuai kebutuhan)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (dengan polyfills)

## Dependencies

- React 18+
- Lucide React (untuk ikon)
- Tailwind CSS (untuk styling)
- TypeScript (optional, tapi direkomendasikan)
