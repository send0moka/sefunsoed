# ShareButtons Component

Komponen ShareButtons untuk membagikan konten post ke berbagai platform social media dan copy link.

## Fitur

- 📱 **WhatsApp**: Bagikan ke WhatsApp dengan pesan dan link
- 🐦 **Twitter/X**: Bagikan ke Twitter dengan teks dan link
- 📧 **Gmail**: Buat email draft dengan subjek dan body
- 🔗 **Copy Link**: Copy URL ke clipboard dengan feedback visual

## Props

```typescript
interface ShareButtonsProps {
  url: string              // URL yang akan dibagikan
  title: string           // Judul konten
  description?: string    // Deskripsi konten (opsional)
  className?: string      // CSS class tambahan (opsional)
}
```

## Penggunaan

### Di PostHero (Sudah Terintegrasi)
```tsx
import { ShareButtons } from '@/components/ShareButtons'

<ShareButtons 
  url={currentUrl}
  title={postTitle}
  description={postDescription}
/>
```

### Penggunaan Standalone
```tsx
import { ShareButtons } from '@/components/ShareButtons'

function MyComponent() {
  return (
    <ShareButtons
      url="https://example.com/post/my-post"
      title="Judul Post Saya"
      description="Deskripsi singkat tentang post ini"
      className="my-custom-class"
    />
  )
}
```

## Styling

Komponen menggunakan Tailwind CSS dengan:
- **Responsive design**: Tombol akan menyesuaikan di berbagai ukuran layar
- **Dark mode support**: Mendukung tema gelap
- **Hover effects**: Animasi scale saat hover
- **Visual feedback**: Tombol "Copy Link" berubah menjadi "Copied!" dengan icon centang

## Platform yang Didukung

### WhatsApp
- Membuka WhatsApp dengan pesan pre-filled
- Format: `{title} - {description}\n\n{url}`

### Twitter/X
- Membuka Twitter dengan tweet pre-filled
- Format: `{title} - {description}` + URL

### Gmail
- Membuka Gmail dengan email draft
- Subject: `{title}`
- Body: `{title}\n\n{description}\n\nRead more: {url}`

### Copy Link
- Copy URL ke clipboard
- Fallback untuk browser lama
- Visual feedback selama 2 detik

## Browser Compatibility

- **Modern browsers**: Menggunakan `navigator.clipboard.writeText()`
- **Legacy browsers**: Fallback menggunakan `document.execCommand('copy')`

## Customization

Anda dapat mengcustomize tampilan dengan menambahkan `className`:

```tsx
<ShareButtons
  url={url}
  title={title}
  className="bg-neutral-100 p-4 rounded-lg"
/>
```

## Accessibility

- Semua tombol memiliki `title` attribute untuk screen readers
- Keyboard navigation support
- Semantic HTML structure
