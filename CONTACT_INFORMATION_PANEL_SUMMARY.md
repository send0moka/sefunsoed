# Contact Information Panel - Quick Reference

## 🎯 Spesifikasi Terpenuhi

✅ **Tata letak vertikal yang rapi**
- Layout vertical dan horizontal tersedia
- Responsive design untuk semua ukuran layar
- Grid system yang fleksibel

✅ **Tiga kartu kontak dengan saluran berbeda**
- Email dengan warna biru
- Telepon dengan warna hijau  
- Alamat dengan warna ungu
- Dapat diperluas hingga 6+ kartu

✅ **Desain kartu berlatar putih**
- Background: `bg-white`
- Sudut membulat: `rounded-lg`
- Spacing yang seimbang: `p-6`

✅ **Border abu-abu tipis**
- Border: `border border-neutral-200`
- Konsisten di semua kartu

✅ **Bayangan halus**
- Shadow: `shadow-sm`
- Efek hover: `hover:shadow-lg`

✅ **Efek melayang saat hover**
- Transform: `hover:scale-105`
- Transition: `transition-all duration-300`
- Cursor pointer untuk interaktivitas

✅ **Ikon berwarna dalam kotak pastel**
- Ikon 24px dengan warna sesuai tema
- Background pastel kontras (blue-50, green-50, purple-50)
- Padding dan border-radius yang sesuai

✅ **Struktur seragam**
- Layout flex dengan spacing konsisten
- Ikon di kiri, konten di kanan
- Hierarki visual yang jelas

✅ **Judul dengan font tebal**
- Font: `text-lg font-semibold text-neutral-900`
- Margin bottom: `mb-2`

✅ **Informasi kontak dengan warna senada**
- Warna teks sesuai dengan warna ikon
- Konsistensi visual terjaga

✅ **Spasi yang seimbang**
- Horizontal spacing: `space-x-4`
- Vertical spacing: `gap-6`
- Padding yang konsisten

✅ **Keterbacaan dan estetika bersih**
- Typography hierarchy jelas
- Kontras warna yang baik
- Layout yang tidak cluttered

✅ **Judul panel dengan font besar dan tebal**
- Font: `text-3xl font-bold text-neutral-900`
- Margin bottom: `mb-3`

✅ **Deskripsi singkat dengan teks abu-abu**
- Color: `text-neutral-600`
- Font size: `text-lg`

✅ **Hierarki visual yang jelas**
- Heading → Subheading → Cards
- Consistent spacing dan typography

✅ **Wadah yang terpusat**
- Max width: `max-w-4xl`
- Margin auto untuk centering
- Padding yang sesuai

## 🚀 Fitur Tambahan

### Interaktivitas
- Click handlers untuk aksi custom
- External links otomatis
- Keyboard navigation support
- Accessibility features (ARIA labels)

### Customization
- Multiple layout options (horizontal/vertical)
- Custom color schemes
- Configurable hover effects
- Template system untuk kemudahan

### Technical Features
- TypeScript support penuh
- Responsive design
- Performance optimized
- SEO friendly
- Modern React patterns

## 📱 Demo Pages

1. **Basic Demo**: `/contact-demo`
   - Implementasi dasar dengan berbagai layout
   - Showcase fitur utama
   - Responsive testing

2. **Advanced Demo**: `/advanced-contact-demo`
   - Fitur interaktif
   - Custom click handlers
   - External link indicators
   - Multiple use cases

3. **Utils Demo**: `/contact-utils-demo`
   - Helper functions
   - Template usage
   - Code examples
   - Best practices

## 🎨 Color Schemes Available

| Type | Primary | Background | Usage |
|------|---------|------------|--------|
| Blue | `text-blue-600` | `bg-blue-50` | Email, Website, General |
| Green | `text-green-600` | `bg-green-50` | Phone, WhatsApp |
| Purple | `text-purple-600` | `bg-purple-50` | Address, Location |
| Emerald | `text-emerald-600` | `bg-emerald-50` | WhatsApp, Success |
| Indigo | `text-indigo-600` | `bg-indigo-50` | Website, Links |
| Orange | `text-orange-600` | `bg-orange-50` | Hours, Time |
| Red | `text-red-600` | `bg-red-50` | Emergency, Important |
| Pink | `text-pink-600` | `bg-pink-50` | Social Media |

## 📦 Quick Start

```typescript
import ContactInformationPanel from '@/components/ContactInformationPanel'

// Basic usage
<ContactInformationPanel />

// With custom props
<ContactInformationPanel
  title="Hubungi Kami"
  layout="horizontal"
  showHoverEffect={true}
/>

// With helper functions
import { createEmailContact, createPhoneContact } from '@/components/ContactInformationPanel/ContactUtils'

const contacts = [
  createEmailContact('info@sefunsoed.com'),
  createPhoneContact('+62 281 123 4567')
]

<ContactInformationPanel contacts={contacts} />
```

## 🔧 Configuration Options

```typescript
interface ContactInformationPanelProps {
  title?: string                    // Panel title
  subtitle?: string                 // Panel subtitle
  contacts?: ContactInfo[]          // Contact data array
  layout?: 'vertical' | 'horizontal' // Layout type
  showHoverEffect?: boolean         // Enable hover effects
  className?: string               // Additional CSS classes
  cardClassName?: string           // Card-specific CSS classes
  showExternalLinkIcon?: boolean   // Show external link indicators
  onContactClick?: (contact, index) => void // Custom click handler
}
```

## 🌟 Best Practices

1. **Accessibility First**
   - Gunakan ARIA labels
   - Implementasikan keyboard navigation
   - Pastikan kontras warna yang cukup

2. **Performance**
   - Lazy load ikon jika diperlukan
   - Optimize assets
   - Gunakan React.memo jika perlu

3. **Responsive Design**
   - Test di berbagai ukuran layar
   - Gunakan breakpoints yang sesuai
   - Pastikan touch targets cukup besar

4. **Content Strategy**
   - Gunakan informasi kontak yang akurat
   - Update secara berkala
   - Sediakan alternatif kontak

## 🎯 Production Ready

✅ **Fully Tested**
- Multiple demo scenarios
- Responsive design tested
- Accessibility compliance
- Performance optimization

✅ **Type Safe**
- Full TypeScript support
- Comprehensive interfaces
- Error handling

✅ **Documented**
- Comprehensive documentation
- Code examples
- API reference
- Best practices guide

✅ **Maintainable**
- Clean code architecture
- Modular components
- Consistent patterns
- Easy to extend

Ready for production use! 🚀
