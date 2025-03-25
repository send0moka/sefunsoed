import { UserGroupIcon, AcademicCapIcon, DocumentTextIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'

const registrationOptions = [
  {
    name: 'NUDC/KDMI',
    description: 'Pendaftaran untuk program persiapan kompetisi debat nasional dan internasional.',
    icon: AcademicCapIcon,
    href: '/pendaftaran/nudc-kdmi',
    status: 'Open',
  },
  {
    name: 'Webinar',
    description: 'Pendaftaran untuk berbagai webinar bahasa Inggris dan pengembangan diri.',
    icon: UserGroupIcon,
    href: '/pendaftaran/webinar',
    status: 'Open',
  },
  {
    name: 'TOEFL/UEPT',
    description: 'Pendaftaran untuk program persiapan TOEFL dan UEPT.',
    icon: DocumentTextIcon,
    href: '/pendaftaran/toefl-uept',
    status: 'Open',
  },
  {
    name: 'Panitia',
    description: 'Pendaftaran untuk menjadi panitia di berbagai acara SEF UNSOED.',
    icon: UserIcon,
    href: '/pendaftaran/panitia',
    status: 'Open',
  },
  {
    name: 'Anggota SEF',
    description: 'Pendaftaran untuk menjadi anggota SEF UNSOED.',
    icon: UsersIcon,
    href: '/pendaftaran/anggota',
    status: 'Open',
  },
]

export default function Pendaftaran() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Pendaftaran
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Pilih program yang sesuai dengan kebutuhan Anda dan daftar sekarang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration options section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Program Pendaftaran</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Pilih Program Anda
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            SEF UNSOED menyediakan berbagai program yang dapat Anda pilih sesuai dengan kebutuhan dan minat Anda.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {registrationOptions.map((option) => (
              <div key={option.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <option.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {option.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{option.description}</p>
                  <p className="mt-6">
                    <a
                      href={option.href}
                      className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Daftar sekarang <span aria-hidden="true">→</span>
                    </a>
                  </p>
                  <span className="mt-4 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {option.status}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Requirements section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Persyaratan</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Persyaratan Umum
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Berikut adalah persyaratan umum yang harus dipenuhi untuk mendaftar di program SEF UNSOED.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm">1</span>
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Mahasiswa aktif UNSOED
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm">2</span>
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Memiliki minat dalam pengembangan bahasa Inggris
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm">3</span>
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Bersedia mengikuti program secara aktif
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 