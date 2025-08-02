# SEFUNSOED - Student English Forum Universitas Jenderal Soedirman

Website resmi **Student English Forum (SEF) Universitas Jenderal Soedirman** yang dibangun menggunakan **Payload CMS** dengan Next.js. Platform digital modern untuk mendukung aktivitas organisasi, event management, dan pengembangan komunitas mahasiswa dalam bidang bahasa Inggris.

## � Tentang Student English Forum

Student English Forum (SEF) adalah organisasi kemahasiswaan di Universitas Jenderal Soedirman yang fokus pada pengembangan kemampuan bahasa Inggris mahasiswa melalui berbagai program dan kegiatan. Website ini berfungsi sebagai:

- **Portal Informasi** - Berita, pengumuman, dan update kegiatan SEF
- **Event Management** - Pendaftaran dan pengelolaan acara/workshop
- **Resource Center** - Materi pembelajaran dan sumber daya bahasa Inggris
- **Community Hub** - Platform interaksi antar member dan alumni
- **Portfolio Showcase** - Dokumentasi kegiatan dan pencapaian organisasi

## 🌟 Fitur Website

### 🎯 Fitur Utama Organisasi
- **Content Management**: Admin panel untuk mengelola konten website
- **Event System**: Sistem pendaftaran dan pengelolaan event/workshop
- **Member Portal**: Area khusus untuk member dengan konten eksklusif
- **Responsive Design**: Tampilan optimal di semua perangkat
- **SEO Optimized**: Optimisasi untuk mesin pencari
- **Multi-language**: Support Bahasa Indonesia dan Inggris
- **Dark Mode**: Tema gelap dan terang

### 📱 Komponen Website
Website SEF dilengkapi dengan berbagai komponen untuk mendukung aktivitas organisasi:

1. **Timeline Block** - Timeline kegiatan dan sejarah organisasi
2. **Accordion Block** - FAQ dan informasi program yang dapat dilipat
3. **Registration Form** - Form pendaftaran member dan event multi-step
4. **Contact Information Panel** - Informasi kontak pengurus dan divisi
5. **Plan Layout** - Paket membership dan program pelatihan
6. **Calendar Block** - Kalender kegiatan dan jadwal event
7. **Carousel Block** - Gallery foto kegiatan dan dokumentasi
8. **Podcast Block** - English podcast dan audio learning materials
9. **Partnership Block** - Showcase sponsor dan partner organisasi
10. **FAQ Block** - Pertanyaan umum tentang organisasi
11. **Archive Block** - Arsip artikel dan materi pembelajaran
12. **Media Block** - Gallery media dan dokumentasi
13. **Content Block** - Artikel, berita, dan konten pembelajaran
14. **Banner/Hero** - Hero section untuk promosi event utama
15. **Form Builder** - Custom form untuk berbagai keperluan organisasi

### 🔧 Fitur Lanjutan
- **Live Preview**: Preview konten secara real-time sebelum publish
- **Draft Preview**: Review konten draft sebelum dipublikasikan
- **Access Control**: Sistem permission untuk admin, pengurus, dan member
- **Search Functionality**: Pencarian artikel dan materi pembelajaran
- **Category Filter**: Filter konten berdasarkan kategori dan topik
- **Media Management**: Upload dan kelola foto/video kegiatan
- **Email Integration**: Notifikasi email untuk member dan event
- **Analytics**: Tracking pengunjung dan engagement website
- **Member Database**: Database member dengan sistem keanggotaan

## 🚀 Setup Development

### Prerequisites
- Node.js >= 18.20.2
- pnpm >= 9 (recommended) atau npm
- PostgreSQL database (atau Supabase)
- Akses ke repository GitHub

### Local Development Setup

1. **Clone Repository**
```bash
git clone https://github.com/send0moka/sefunsoed.git
cd sefunsoed
cp .env.example .env
pnpm install
```

2. **Configure Environment Variables**
```bash
# Database
DATABASE_URI=your_postgresql_connection_string

# Payload
PAYLOAD_SECRET=your-payload-secret-key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Supabase (optional, untuk media storage)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (optional)
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

3. **Start Development Server**
```bash
pnpm dev
```

4. **Create Admin User**
Buka `http://localhost:3000/admin` dan buat user admin pertama untuk mengelola website SEF.

### Production Deployment

Website SEF di-deploy menggunakan Vercel:

1. **Build untuk Production**
```bash
pnpm build
pnpm start
```

2. **Vercel Deployment**
- Repository terhubung dengan Vercel
- Environment variables dikonfigurasi untuk production
- Auto-deploy dari branch main

## 📚 Struktur Proyek

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Frontend pages
│   ├── (payload)/         # Payload admin
│   └── api/               # API routes
├── blocks/                # Layout builder blocks
│   ├── Timeline/          # Timeline component
│   ├── Accordion/         # Accordion component
│   ├── RegistrationForm/  # Registration form
│   └── ...               # Other blocks
├── collections/           # Payload collections
│   ├── Pages.ts          # Pages collection
│   ├── Posts/            # Posts collection
│   ├── Users/            # Users collection
│   └── Media.ts          # Media collection
├── components/            # Reusable components
├── providers/             # Context providers
├── utilities/             # Helper functions
└── payload.config.ts      # Payload configuration
```

## 🎨 Halaman Demo

Website menyediakan berbagai halaman demo untuk showcase fitur:

- `/accordion-demo` - Demo FAQ dan informasi program
- `/timeline-demo` - Demo timeline sejarah dan kegiatan SEF
- `/registration-form-demo` - Demo form pendaftaran member/event
- `/contact-demo` - Demo informasi kontak pengurus
- `/plan-layout-demo` - Demo paket membership dan program
- `/calendar-demo` - Demo kalender kegiatan
- `/carousel-demo` - Demo gallery foto kegiatan
- `/podcast-demo` - Demo English podcast materials

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test:unit      # Unit tests
pnpm test:int       # Integration tests
pnpm test:e2e       # End-to-end tests
pnpm test:lang      # Language translation tests
```

### Test Coverage
- **Collections Testing**: CRUD operations untuk semua collections
- **Supabase API Testing**: Integrasi dengan Supabase Storage
- **API Validation**: Testing validasi data dan error handling
- **Environment Testing**: Testing konfigurasi environment

## 🗃️ Struktur Konten

### Pages
- Halaman statis (About, Programs, Contact)
- Layout builder enabled untuk fleksibilitas
- SEO optimization
- Multi-language content

### Posts  
- Artikel dan berita SEF
- Materi pembelajaran bahasa Inggris
- Dokumentasi kegiatan
- Kategori berdasarkan topik
- Multi-language content

### Users
- Admin: Full access untuk mengelola website
- Pengurus: Akses untuk manage konten dan event
- Member: Akses terbatas ke area member

### Media
- Upload foto dan video kegiatan
- Gallery dokumentasi SEF
- Learning materials (audio, PDF)
- Optimisasi gambar otomatis

### Categories
- Program SEF (Speaking, Writing, TOEFL Prep, etc.)
- Event types (Workshop, Seminar, Competition)
- Content topics (Grammar, Vocabulary, Tips)
- Organisasi struktur konten

### Registration Submissions
- Data pendaftaran member baru
- Registrasi event dan workshop
- Formulir contact dan feedback
- Admin dashboard untuk management
## 🔐 Access Control

- **Public**: Pengunjung dapat mengakses konten umum
- **Member**: Member SEF dapat mengakses konten eksklusif dan area member
- **Pengurus**: Pengurus dapat mengelola konten, event, dan member
- **Admin**: Full access untuk semua fitur website dan database

## 🌐 Multi-language Support

Website mendukung dua bahasa:
- **Bahasa Indonesia** - Untuk audience lokal dan mahasiswa Unsoed
- **English** - Untuk konten pembelajaran dan international visitors
- Language switcher di setiap halaman
- Dynamic content rendering berdasarkan preferensi bahasa

## 🎯 SEO & Performance

- **Meta Tags**: Dynamic meta tags untuk setiap page
- **Sitemap**: Auto-generated XML sitemap
- **Image Optimization**: Next.js Image component dengan multiple sizes
- **Caching**: Built-in caching untuk performance
- **Analytics**: Vercel Analytics integration

## 📖 Documentation

Dokumentasi lengkap tersedia untuk setiap fitur:
- `TIMELINE_IMPLEMENTATION.md` - Timeline block documentation
- `ACCORDION_IMPLEMENTATION.md` - Accordion block documentation
- `REGISTRATION_FORM_IMPLEMENTATION.md` - Registration form documentation
- `CONTACT_INFORMATION_PANEL_IMPLEMENTATION.md` - Contact panel documentation
- `CATEGORY_FILTER_IMPLEMENTATION.md` - Category filter documentation
- `SUPABASE_SETUP.md` - Supabase integration setup
- `TESTING_README.md` - Testing guide

## 🛠️ Tech Stack

### Backend
- **Payload CMS** 3.46.0 - Headless CMS
- **PostgreSQL** - Database dengan Supabase
- **Node.js** - Runtime environment
- **TypeScript** - Type safety

### Frontend
- **Next.js** 15.3.3 - React framework
- **React** 19.1.0 - UI library
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Lucide React** - Icon library

### Tools & Utilities
- **Vite** - Testing framework
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Sharp** - Image processing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Configure environment variables
3. Deploy otomatis dari branch main

### Docker
```bash
docker build -t sefunsoed .
docker run -p 3000:3000 sefunsoed
```

### Manual Server
```bash
pnpm build
pnpm start
```

## 🔧 Environment Variables

Semua environment variables yang diperlukan:

```bash
# Required
DATABASE_URI=your_postgresql_connection_string
PAYLOAD_SECRET=your-payload-secret-key

# Optional
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## 📝 Contributing

Untuk berkontribusi pada website SEF:

1. Fork repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit perubahan (`git commit -m 'Add NewFeature for SEF'`)
4. Push ke branch (`git push origin feature/NewFeature`)
5. Buat Pull Request

### Guidelines untuk Kontributor
- Ikuti coding standards yang ada
- Test fitur sebelum submit PR
- Update dokumentasi jika diperlukan
- Koordinasi dengan pengurus SEF untuk perubahan besar

## 📄 License

Website ini dibuat khusus untuk Student English Forum Universitas Jenderal Soedirman. Kode tersedia di bawah MIT License untuk keperluan pembelajaran.

## 🤝 Support & Contact

Untuk pertanyaan teknis atau dukungan:
- **Email**: sefunsoed@gmail.com
- **Instagram**: @sefunsoed
- **GitHub Issues**: Untuk bug reports dan feature requests
- **SEF Pengurus**: Hubungi pengurus SEF untuk akses admin

## 🎯 Development Roadmap

### Phase 1 (Completed ✅)
- [x] Basic website setup dengan Payload CMS
- [x] Timeline untuk sejarah dan kegiatan SEF
- [x] Accordion untuk FAQ dan program info
- [x] Registration form untuk member dan event
- [x] Contact panel untuk informasi pengurus
- [x] Multi-language support (ID/EN)
- [x] Category system untuk konten

### Phase 2 (In Progress 🚧)
- [ ] Member portal dengan login system
- [ ] Email notification untuk event registration
- [ ] Payment integration untuk membership fee
- [ ] Advanced analytics dan reporting
- [ ] Mobile app integration
- [ ] Learning management system

### Phase 3 (Planned 📋)
- [ ] Alumni network platform
- [ ] Online TOEFL simulation system
- [ ] Real-time chat untuk member
- [ ] Advanced course management
- [ ] Certificate generation system
- [ ] API untuk integrasi dengan sistem kampus

---

**Dibuat dengan ❤️ untuk Student English Forum Universitas Jenderal Soedirman**



