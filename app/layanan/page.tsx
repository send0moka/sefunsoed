import { DocumentTextIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Translation Service',
    description: 'Layanan penerjemahan dokumen dari Bahasa Indonesia ke Bahasa Inggris dan sebaliknya.',
    icon: DocumentTextIcon,
    features: [
      'Dokumen akademik',
      'Dokumen bisnis',
      'Dokumen legal',
      'Artikel dan konten',
    ],
    pricing: 'Mulai dari Rp 50.000/halaman',
    turnaround: '2-3 hari kerja',
  },
  {
    name: 'Proofreading Service',
    description: 'Layanan pengecekan dan perbaikan tata bahasa, ejaan, dan format dokumen dalam Bahasa Inggris.',
    icon: CheckCircleIcon,
    features: [
      'Tesis dan skripsi',
      'Jurnal akademik',
      'Dokumen bisnis',
      'Artikel dan konten',
    ],
    pricing: 'Mulai dari Rp 30.000/halaman',
    turnaround: '1-2 hari kerja',
  },
]

const process = [
  {
    name: 'Submit Dokumen',
    description: 'Kirimkan dokumen yang ingin diterjemahkan atau diperiksa melalui form pendaftaran.',
  },
  {
    name: 'Review & Quotation',
    description: 'Tim kami akan mereview dokumen dan memberikan penawaran harga.',
  },
  {
    name: 'Konfirmasi & Pembayaran',
    description: 'Setelah konfirmasi, lakukan pembayaran sesuai dengan penawaran yang diberikan.',
  },
  {
    name: 'Proses',
    description: 'Tim kami akan memproses dokumen sesuai dengan layanan yang dipilih.',
  },
  {
    name: 'Review & Revisi',
    description: 'Dokumen akan direview dan direvisi jika diperlukan.',
  },
  {
    name: 'Pengiriman Hasil',
    description: 'Dokumen yang sudah selesai akan dikirimkan sesuai dengan waktu yang disepakati.',
  },
]

export default function Layanan() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Layanan Kami
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  SEF UNSOED menyediakan layanan penerjemahan dan proofreading berkualitas untuk memenuhi kebutuhan Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Layanan</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Layanan yang Tersedia
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Pilih layanan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <service.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900">Fitur:</h3>
                    <ul className="mt-2 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <svg
                            className="h-5 w-5 flex-none text-indigo-600 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex items-center gap-x-4">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2 text-sm text-gray-500">{service.pricing}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2 text-sm text-gray-500">{service.turnaround}</span>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Process section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Proses</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Proses Layanan
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Berikut adalah proses layanan yang akan Anda alami.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {process.map((step, stepIdx) => (
                <li key={step.name}>
                  <div className="relative pb-8">
                    {stepIdx !== process.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <span className="text-white text-sm">{stepIdx + 1}</span>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{step.name}</span>
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{step.description}</p>
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