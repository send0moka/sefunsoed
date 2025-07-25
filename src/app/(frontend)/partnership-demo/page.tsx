import { PartnershipBlock } from '@/blocks/PartnershipBlock/Component'

export default function PartnershipDemoPage() {
  const demoPartners = [
    {
      id: 'partner-1',
      name: 'Universitas Jenderal Soedirman',
      logo: '/media/3f8fc3122181811.60d459971b6a2.jpg',
      website: 'https://unsoed.ac.id',
    },
    {
      id: 'partner-2',
      name: 'British Council',
      logo: '/media/image-post1.webp',
      website: 'https://britishcouncil.org',
    },
    {
      id: 'partner-3',
      name: 'Cambridge English',
      logo: '/media/ecc3.png',
      website: 'https://cambridgeenglish.org',
    },
    {
      id: 'partner-4',
      name: 'IELTS',
      logo: '/media/image-hero1.webp',
      website: 'https://ielts.org',
    },
    {
      id: 'partner-5',
      name: 'TOEFL',
      logo: '/media/image-post1-1200x630.webp',
      website: 'https://toefl.org',
    },
    {
      id: 'partner-6',
      name: 'Educational Testing Service',
      logo: '/media/3f8fc3122181811.60d459971b6a2-300x300.jpg',
      website: 'https://ets.org',
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="py-16">
        <div className="container text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Partnership Block Demo
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Demonstrating the Partnership block with neutralscale hover effects
          </p>
        </div>

        <PartnershipBlock
          id="demo-partnership"
          title="Our Trusted Partners"
          partners={demoPartners}
        />
      </div>
    </div>
  )
}
