// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { RegistrationSubmissions } from './collections/RegistrationSubmissions'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeDashboard: ['@/components/BeforeDashboard'],

      // Add Script Injector to all admin pages
      afterNavLinks: ['@/components/AdminScriptInjector'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      // Optimized settings for production stability
      max: process.env.NODE_ENV === 'production' ? 15 : 20, // Increase pool size
      connectionTimeoutMillis: 30000, // 30 seconds for Vercel cold starts
      idleTimeoutMillis: 60000, // 60 seconds idle timeout
      query_timeout: 45000, // 45 second query timeout
      statement_timeout: 45000, // 45 second statement timeout
      // Add production specific settings
      ...(process.env.NODE_ENV === 'production' && {
        ssl: { rejectUnauthorized: false }, // For production SSL
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
      }),
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users, RegistrationSubmissions],
  serverURL: getServerSideURL(),
  cors: [
    getServerSideURL(),
    'https://sefunsoed.site',
    'https://www.sefunsoed.site',
    'https://sefunsoed.vercel.app',
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '',
  ].filter(Boolean),
  csrf: [
    getServerSideURL(),
    'https://sefunsoed.site',
    'https://www.sefunsoed.site',
    'https://sefunsoed.vercel.app',
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '',
  ].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@sefunsoed.site',
    defaultFromName: 'SEF Unsoed',
    // Use streamTransport for development to avoid SMTP connection
    transportOptions: {
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    },
  }),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
