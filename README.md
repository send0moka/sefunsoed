# SEFUNSOED - Website Template dengan Payload CMS

Website template modern yang dibangun menggunakan **Payload CMS** dengan Next.js, dilengkapi fitur-fitur advanced untuk website institusi pendidikan, organisasi, atau perusahaan.

## 🌟 Fitur Utama

### 🎯 Core Features
- **Payload CMS**: Headless CMS dengan admin panel yang powerful
- **Next.js 15**: Framework React dengan App Router dan TypeScript
- **PostgreSQL Database**: Database yang robust dengan integrasi Supabase
- **Responsive Design**: Mobile-first approach dengan Tailwind CSS
- **SEO Optimized**: Meta tags, sitemap, dan optimasi performance
- **Dark Mode**: Support tema gelap dan terang
- **Multi-language**: Support Bahasa Indonesia dan Inggris

### 📱 Layout Builder Blocks
Template ini dilengkapi dengan berbagai layout blocks yang dapat dikustomisasi:

1. **Timeline Block** - Timeline interaktif dengan berbagai format tanggal dan status
2. **Accordion Block** - Panel yang dapat dilipat dengan 4 style variant
3. **Registration Form** - Form pendaftaran multi-step dengan stepper navigation
4. **Contact Information Panel** - Panel kontak dengan desain card yang menarik
5. **Plan Layout** - Pricing plan dengan fitur dan tombol aksi
6. **Calendar Block** - Kalender event dengan integrasi
7. **Carousel Block** - Carousel gambar responsive
8. **Podcast Block** - Player podcast dengan controls
9. **Partnership Block** - Showcase partner dan sponsor
10. **FAQ Block** - Frequently Asked Questions dengan accordion
11. **Archive Block** - Archive post dengan filter dan pagination
12. **Media Block** - Gallery media dengan berbagai layout
13. **Content Block** - Rich text content dengan styling
14. **Banner/Hero** - Hero section dengan call-to-action
15. **Form Builder** - Custom form builder dengan validation

### 🔧 Advanced Features
- **Live Preview**: Preview konten secara real-time
- **Draft Preview**: Preview draft sebelum publish
- **Access Control**: Role-based permission system
- **Search Functionality**: Full-text search dengan filter
- **Category Filter**: Filter post berdasarkan kategori
- **Media Management**: Upload dan manage media dengan Supabase Storage
- **Email Integration**: Nodemailer untuk email notifications
- **Analytics**: Vercel Analytics integration
- **Error Handling**: Comprehensive error handling dan logging

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.20.2
- pnpm >= 9 (recommended) atau npm
- PostgreSQL database (atau Supabase)

### Development Setup

1. **Clone dan Install Dependencies**
```bash
git clone <repository-url>
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
Buka `http://localhost:3000/admin` dan buat user admin pertama.

### Production Deployment

1. **Build untuk Production**
```bash
pnpm build
pnpm start
```

2. **Docker Deployment**
```bash
docker build -t sefunsoed .
docker run -p 3000:3000 sefunsoed
```

3. **Vercel Deployment**
- Connect repository ke Vercel
- Configure environment variables
- Deploy otomatis dari branch main

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

## 🎨 Demo Pages

Template ini menyediakan berbagai demo pages untuk showcase fitur:

- `/accordion-demo` - Demo accordion layouts
- `/timeline-demo` - Demo timeline components
- `/registration-form-demo` - Demo form pendaftaran
- `/contact-demo` - Demo contact information panel
- `/plan-layout-demo` - Demo pricing plans
- `/calendar-demo` - Demo calendar events
- `/carousel-demo` - Demo image carousel
- `/podcast-demo` - Demo podcast player

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

## 🗃️ Collections

### Pages
- Layout builder enabled
- SEO fields
- Draft preview support
- Multi-language content

### Posts
- Blog posts dan articles
- Category taxonomy
- Related posts
- Publication workflow
- Multi-language content

### Users
- Authentication system
- Role-based access control
- Admin panel access

### Media
- File upload dengan Supabase Storage
- Image optimization
- Multiple sizes support
- Focal point selection

### Categories
- Nested categories support
- Taxonomy untuk posts
- Hierarchy management

### Registration Submissions
- Custom collection untuk form submissions
- Structured data storage
- Admin management interface
## 🔐 Access Control

- **Public**: Dapat mengakses published content
- **Users**: Dapat mengakses admin panel dan manage content
- **Admins**: Full access ke semua fitur

## 🌐 Internationalization

Support untuk multi-language dengan:
- Field untuk konten Bahasa Indonesia dan Inggris
- Language switcher di frontend
- Context provider untuk language state
- Dynamic content rendering

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

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

Jika ada pertanyaan atau masalah:
- Buat issue di GitHub repository
- Hubungi tim development
- Lihat dokumentasi lengkap di folder docs

## 🎯 Roadmap

### Phase 1 (Completed ✅)
- [x] Basic Payload CMS setup
- [x] Timeline block implementation
- [x] Accordion block implementation
- [x] Registration form implementation
- [x] Contact information panel
- [x] Multi-language support
- [x] Category filtering

### Phase 2 (In Progress 🚧)
- [ ] Advanced user roles
- [ ] Email notification system
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Mobile app integration

### Phase 3 (Planned 📋)
- [ ] Multi-tenant support
- [ ] Advanced workflow management
- [ ] Real-time collaboration
- [ ] Advanced reporting
- [ ] API documentation

---

**Dibuat dengan ❤️ untuk komunitas pendidikan Indonesia**



