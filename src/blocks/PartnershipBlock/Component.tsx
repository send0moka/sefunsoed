'use client'
import React from 'react'
import Image from 'next/image'

interface Partner {
  id?: string | null
  name: string
  logo: string | { url?: string; filename?: string } | null
  website?: string
}

interface PartnershipBlockProps {
  id?: string
  title?: string
  partners?: Partner[]
}

export const PartnershipBlock: React.FC<PartnershipBlockProps> = (props) => {
  const { id, title = 'Our Partnership', partners = [] } = props

  // Default sample partners for demo
  const defaultPartners: Partner[] = [
    {
      id: 'partner-1',
      name: 'Unsoed University',
      logo: '/media/unsoed-logo.png',
      website: 'https://unsoed.ac.id',
    },
    {
      id: 'partner-2',
      name: 'British Council',
      logo: '/media/british-council-logo.png',
      website: 'https://britishcouncil.org',
    },
    {
      id: 'partner-3',
      name: 'Cambridge English',
      logo: '/media/cambridge-logo.png',
      website: 'https://cambridgeenglish.org',
    },
    {
      id: 'partner-4',
      name: 'IELTS',
      logo: '/media/ielts-logo.png',
      website: 'https://ielts.org',
    },
    {
      id: 'partner-5',
      name: 'TOEFL',
      logo: '/media/toefl-logo.png',
      website: 'https://toefl.org',
    },
    {
      id: 'partner-6',
      name: 'ETS',
      logo: '/media/ets-logo.png',
      website: 'https://ets.org',
    },
  ]

  const currentPartners = partners.length > 0 ? partners : defaultPartners

  // Helper function to extract URL from various data formats
  const extractUrl = (
    logo?: string | { url?: string; filename?: string } | null,
  ): string | undefined => {
    if (typeof logo === 'string' && logo.trim() !== '') {
      return logo
    }

    if (logo && typeof logo === 'object') {
      if (typeof logo.url === 'string' && logo.url.trim() !== '') {
        return logo.url
      }
      if (typeof logo.filename === 'string' && logo.filename.trim() !== '') {
        return `/api/media/file/${logo.filename}`
      }
    }

    return undefined
  }

  // Handle partner click
  const handlePartnerClick = (partner: Partner) => {
    if (partner.website) {
      window.open(partner.website, '_blank')
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {currentPartners.map((partner, index) => {
            const logoUrl = extractUrl(partner.logo)

            if (!logoUrl) return null

            return (
              <div
                key={partner.id || index}
                className={`group flex items-center justify-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:shadow-md ${
                  partner.website ? 'cursor-pointer' : ''
                }`}
                onClick={() => handlePartnerClick(partner)}
              >
                <div className="relative w-full h-16 flex items-center justify-center">
                  <Image
                    src={logoUrl}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<div class="text-sm font-medium text-neutral-600 dark:text-neutral-400 text-center">${partner.name}</div>`
                      }
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Interested in becoming our partner? Let&apos;s collaborate to create better educational
            opportunities.
          </p>
          <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </div>
  )
}
