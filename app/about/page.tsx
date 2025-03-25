'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/translations'

const faqs = [
  {
    question: 'Apa itu SEF UNSOED?',
    answer: 'SEF UNSOED adalah forum mahasiswa yang fokus pada pengembangan kemampuan bahasa Inggris dan kepemimpinan mahasiswa UNSOED.',
  },
  {
    question: 'Bagaimana cara bergabung dengan SEF UNSOED?',
    answer: 'Anda dapat bergabung dengan mengikuti proses pendaftaran yang diadakan setiap semester. Informasi pendaftaran dapat dilihat di halaman Pendaftaran.',
  },
  {
    question: 'Program apa saja yang tersedia di SEF UNSOED?',
    answer: 'SEF UNSOED menyediakan berbagai program seperti persiapan NUDC/KDMI, TOEFL/UEPT, dan layanan penerjemahan & proofreading.',
  },
  {
    question: 'Apakah ada biaya untuk bergabung?',
    answer: 'Ya, ada biaya keanggotaan yang digunakan untuk mendukung kegiatan dan program SEF UNSOED. Informasi detail dapat dilihat saat pendaftaran.',
  },
]

const programKerja = [
  {
    name: 'Program Pembelajaran',
    items: [
      'Persiapan NUDC/KDMI',
      'TOEFL/UEPT Preparation',
      'English Conversation Club',
      'Writing Workshop',
    ],
  },
  {
    name: 'Program Pengembangan',
    items: [
      'Leadership Training',
      'Public Speaking Workshop',
      'Debate Competition',
      'English Camp',
    ],
  },
  {
    name: 'Program Layanan',
    items: [
      'Translation Service',
      'Proofreading Service',
      'English Consultation',
      'Mock Interview',
    ],
  },
]

export default function TentangKami() {
  const { language } = useLanguage()
  const t = translations[language].about

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {t.hero.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {t.hero.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Kerja section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{t.programKerja.title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.programKerja.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.programKerja.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                {t.programKerja.sections.pembelajaran.title}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <ul role="list" className="flex flex-auto flex-col gap-y-4">
                  {t.programKerja.sections.pembelajaran.items.map((item) => (
                    <li key={item} className="flex gap-x-3">
                      <span className="text-indigo-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                {t.programKerja.sections.pengembangan.title}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <ul role="list" className="flex flex-auto flex-col gap-y-4">
                  {t.programKerja.sections.pengembangan.items.map((item) => (
                    <li key={item} className="flex gap-x-3">
                      <span className="text-indigo-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                {t.programKerja.sections.layanan.title}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <ul role="list" className="flex flex-auto flex-col gap-y-4">
                  {t.programKerja.sections.layanan.items.map((item) => (
                    <li key={item} className="flex gap-x-3">
                      <span className="text-indigo-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{t.faq.title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.faq.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.faq.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="space-y-4">
            {t.faq.items.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                      <span>{faq.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-indigo-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{t.contact.title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.contact.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.contact.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="rounded-lg bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-xl lg:mx-0">
              <h3 className="text-lg font-medium tracking-tight text-gray-900">
                {t.contact.address.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                {t.contact.address.content.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-medium tracking-tight text-gray-900">
                  {t.contact.contactInfo.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {t.contact.contactInfo.content.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 