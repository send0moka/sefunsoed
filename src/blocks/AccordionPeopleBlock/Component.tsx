'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Linkedin, Instagram } from 'lucide-react'

interface PersonProfile {
  id?: string | null
  name: string
  position: string
  major: string
  year: string
  photo: string | { url?: string; filename?: string } | null
  linkedin?: string
  instagram?: string
}

interface AccordionSection {
  id?: string | null
  title: string
  subtitle: string
  description: string
  image: string | { url?: string; filename?: string } | null
  people: PersonProfile[]
}

interface AccordionPeopleBlockProps {
  id?: string
  title?: string
  sections?: AccordionSection[]
}

export const AccordionPeopleBlock: React.FC<AccordionPeopleBlockProps> = (props) => {
  const { id, title = 'Our Team', sections = [] } = props
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hoveredPerson, setHoveredPerson] = useState<string | null>(null)

  // Default sample data for demo
  const defaultSections: AccordionSection[] = [
    {
      id: 'section-1',
      title: 'Board of Directors',
      subtitle: 'Leadership Team',
      description:
        'Meet our experienced leadership team who guide SEF UNSOED towards excellence in English education.',
      image: '/media/image-hero1.webp',
      people: [
        {
          id: 'person-1',
          name: 'Ahmad Rizki',
          position: 'President',
          major: 'Informatics',
          year: '22',
          photo: '/media/3f8fc3122181811.60d459971b6a2.jpg',
          linkedin: 'https://linkedin.com/in/ahmadrizki',
          instagram: 'https://instagram.com/ahmadrizki',
        },
        {
          id: 'person-2',
          name: 'Sari Indah',
          position: 'Vice President',
          major: 'English Literature',
          year: '21',
          photo: '/media/image-post1.webp',
          linkedin: 'https://linkedin.com/in/sariindah',
          instagram: 'https://instagram.com/sariindah',
        },
        {
          id: 'person-3',
          name: 'Budi Santoso',
          position: 'Secretary',
          major: 'Management',
          year: '22',
          photo: '/media/ecc3.png',
          linkedin: 'https://linkedin.com/in/budisantoso',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Program Coordinators',
      subtitle: 'Academic Excellence',
      description:
        'Our dedicated coordinators ensure high-quality programs and student development.',
      image: '/media/image-post2.webp',
      people: [
        {
          id: 'person-4',
          name: 'Lisa Putri',
          position: 'IELTS Coordinator',
          major: 'Psychology',
          year: '21',
          photo: '/media/image-hero1-300x169.webp',
          instagram: 'https://instagram.com/lisaputri',
        },
        {
          id: 'person-5',
          name: 'Andi Wijaya',
          position: 'TOEFL Coordinator',
          major: 'Economics',
          year: '20',
          photo: '/media/3f8fc3122181811.60d459971b6a2-300x300.jpg',
          linkedin: 'https://linkedin.com/in/andiwijaya',
          instagram: 'https://instagram.com/andiwijaya',
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Tutoring Team',
      subtitle: 'Student Support',
      description:
        'Our experienced tutors provide personalized guidance to help students achieve their English proficiency goals.',
      image: '/media/close-up-yellow-lighting-equipment-against-black-background.jpg',
      people: [
        {
          id: 'person-6',
          name: 'Maya Sari',
          position: 'Senior Tutor',
          major: 'Linguistics',
          year: '19',
          photo: '/media/image-post1-1200x630.webp',
          linkedin: 'https://linkedin.com/in/mayasari',
        },
        {
          id: 'person-7',
          name: 'Dani Rahman',
          position: 'Conversation Tutor',
          major: 'Communication',
          year: '21',
          photo: '/media/3f8fc3122181811.60d459971b6a2-500x500.jpg',
          instagram: 'https://instagram.com/danirahman',
        },
        {
          id: 'person-8',
          name: 'Fitri Lestari',
          position: 'Writing Tutor',
          major: 'Literature',
          year: '20',
          photo: '/media/image-hero1-600x338.webp',
          linkedin: 'https://linkedin.com/in/fitrilestari',
          instagram: 'https://instagram.com/fitrilestari',
        },
      ],
    },
  ]

  const currentSections = sections.length > 0 ? sections : defaultSections

  // Helper function to extract URL from various data formats
  const extractUrl = (
    src?: string | { url?: string; filename?: string } | null,
  ): string | undefined => {
    if (typeof src === 'string' && src.trim() !== '') {
      return src
    }

    if (src && typeof src === 'object') {
      if (typeof src.url === 'string' && src.url.trim() !== '') {
        return src.url
      }
      if (typeof src.filename === 'string' && src.filename.trim() !== '') {
        return `/api/media/file/${src.filename}`
      }
    }

    return undefined
  }

  // Toggle accordion section
  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  // Handle social media click
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank')
  }

  // Format major and year
  const formatMajorYear = (major: string, year: string) => {
    return `${major}'${year}`
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

        {/* Accordion Sections */}
        <div className="space-y-6">
          {currentSections.map((section) => {
            const sectionImage = extractUrl(section.image)
            const isActive = activeSection === section.id

            return (
              <div
                key={section.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                {/* Accordion Header */}
                <div className="flex min-h-[200px]">
                  {/* Left Image */}
                  <div className="w-1/3 relative">
                    {sectionImage ? (
                      <Image src={sectionImage} alt={section.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                        <span className="text-neutral-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="w-2/3 p-8 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-lg text-neutral-600 dark:text-neutral-300">
                        {section.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSection(section.id || '')}
                      className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      {isActive ? (
                        <ChevronUp className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Accordion Content */}
                {isActive && (
                  <div className="border-t border-neutral-200 dark:border-neutral-700 p-8">
                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 mb-8 text-lg">
                      {section.description}
                    </p>

                    {/* People Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {section.people.map((person) => {
                        const personPhoto = extractUrl(person.photo)
                        const isHovered = hoveredPerson === person.id

                        return (
                          <div
                            key={person.id}
                            className="relative group"
                            onMouseEnter={() => setHoveredPerson(person.id || '')}
                            onMouseLeave={() => setHoveredPerson(null)}
                          >
                            <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg">
                              {/* Profile Photo */}
                              <div className="relative w-20 h-20 mx-auto mb-4">
                                {personPhoto ? (
                                  <Image
                                    src={personPhoto}
                                    alt={person.name}
                                    fill
                                    className="object-cover rounded-full"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-neutral-300 dark:bg-neutral-600 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-neutral-500">
                                      {person.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Person Info */}
                              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                                {person.name}
                              </h4>
                              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                                {person.position}
                              </p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {formatMajorYear(person.major, person.year)}
                              </p>

                              {/* Social Media Overlay */}
                              {isHovered && (person.linkedin || person.instagram) && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center space-x-4 transition-all duration-300">
                                  {person.linkedin && (
                                    <button
                                      onClick={() => handleSocialClick(person.linkedin!)}
                                      className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                                    >
                                      <Linkedin className="w-5 h-5 text-blue-600" />
                                    </button>
                                  )}
                                  {person.instagram && (
                                    <button
                                      onClick={() => handleSocialClick(person.instagram!)}
                                      className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                                    >
                                      <Instagram className="w-5 h-5 text-pink-600" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
