# SEF UNSOED Website

This is the official website for SEFUN SOED, built with [Next.js](https://nextjs.org).

## About This Project

This website serves as a platform for SEFUN SOED organization, providing information about:
- Programs and activities
- Services offered
- Registration information
- Content resources
- About the organization

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: CSS modules with PostCSS
- **Authentication**: Clerk
- **Internationalization**: Supported via translations directory

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Project Structure

- `app/` - All pages and routes using Next.js App Router
- `components/` - Reusable UI components
- `contexts/` - React context providers
- `public/` - Static assets
- `translations/` - Internationalization files

## Environment Setup

Create a `.env.local` file in the root directory with necessary environment variables (refer to `.env.local` for the required variables).

## Contributing

If you're contributing to this project, please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Deployment

This Next.js application can be easily deployed on [Vercel](https://vercel.com), the platform from the creators of Next.js.

For alternative deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).