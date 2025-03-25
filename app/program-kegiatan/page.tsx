'use client'

import { CalendarIcon, BuildingOfficeIcon, TrophyIcon } from '@heroicons/react/24/outline'

const events = [
  {
    id: 1,
    title: 'NUDC Training',
    description: 'Pelatihan persiapan National University Debating Championship.',
    date: '15 Maret 2024',
    location: 'Gedung Student Center',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'TOEFL Workshop',
    description: 'Workshop persiapan TOEFL untuk mahasiswa UNSOED.',
    date: '20 Maret 2024',
    location: 'Ruang Seminar FISIP',
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'English Camp',
    description: 'Program immersive learning bahasa Inggris selama 3 hari.',
    date: '25 Maret 2024',
    location: 'Kampus UNSOED',
    status: 'Upcoming',
  },
]

const achievements = [
  {
    id: 1,
    title: 'Juara 1 NUDC Regional',
    description: 'Tim debat SEF UNSOED berhasil meraih juara pertama di kompetisi regional.',
    date: '10 Februari 2024',
  },
  {
    id: 2,
    title: 'TOEFL Success Rate 95%',
    description: '95% peserta program TOEFL berhasil mencapai skor target.',
    date: '5 Februari 2024',
  },
  {
    id: 3,
    title: 'Best English Club Award',
    description: 'SEF UNSOED meraih penghargaan sebagai English Club terbaik se-Jawa Tengah.',
    date: '1 Februari 2024',
  },
]

const sponsors = [
  {
    id: 1,
    name: 'British Council',
    description: 'Partner dalam pengembangan program bahasa Inggris.',
    logo: '/sponsors/british-council.png',
  },
  {
    id: 2,
    name: 'IDP Education',
    description: 'Partner dalam program TOEFL dan IELTS.',
    logo: '/sponsors/idp.png',
  },
  {
    id: 3,
    name: 'Cambridge Assessment',
    description: 'Partner dalam pengembangan materi pembelajaran.',
    logo: '/sponsors/cambridge.png',
  },
]

export default function ProgramKegiatan() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Program & Kegiatan
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Temukan berbagai program dan kegiatan yang tersedia di SEF UNSOED.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Events</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kegiatan Mendatang
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Berbagai kegiatan yang akan segera dilaksanakan oleh SEF UNSOED.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {events.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== events.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <CalendarIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {event.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                          <p className="mt-2 text-sm text-gray-500">Lokasi: {event.location}</p>
                          <span className="mt-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Achievements section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Achievements</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prestasi Terbaru
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Pencapaian-pencapaian terbaru dari SEF UNSOED.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {achievements.map((achievement, achievementIdx) => (
                <li key={achievement.id}>
                  <div className="relative pb-8">
                    {achievementIdx !== achievements.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <TrophyIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {achievement.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sponsors section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Sponsors</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Partner Strategis
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Partner strategis yang mendukung program dan kegiatan SEF UNSOED.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {sponsors.map((sponsor, sponsorIdx) => (
                <li key={sponsor.id}>
                  <div className="relative pb-8">
                    {sponsorIdx !== sponsors.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <BuildingOfficeIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sponsor.name}</p>
                          <p className="mt-1 text-sm text-gray-500">{sponsor.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 