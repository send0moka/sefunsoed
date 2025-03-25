import { BookOpenIcon, EnvelopeIcon, CalendarIcon, MicrophoneIcon } from '@heroicons/react/24/outline'

const articles = [
  {
    id: 1,
    title: 'Tips Meningkatkan Kemampuan Speaking',
    description: 'Panduan praktis untuk meningkatkan kemampuan berbicara bahasa Inggris Anda.',
    author: 'John Doe',
    date: '15 Maret 2024',
    readTime: '5 min read',
    category: 'Edukasi',
  },
  {
    id: 2,
    title: 'Strategi Menulis Essay yang Efektif',
    description: 'Belajar teknik menulis essay yang baik dan benar dalam bahasa Inggris.',
    author: 'Jane Smith',
    date: '10 Maret 2024',
    readTime: '7 min read',
    category: 'Edukasi',
  },
  {
    id: 3,
    title: 'Grammar Tips: Present Perfect Tense',
    description: 'Panduan lengkap penggunaan Present Perfect Tense dalam bahasa Inggris.',
    author: 'Mike Johnson',
    date: '5 Maret 2024',
    readTime: '6 min read',
    category: 'Edukasi',
  },
]

const newsletters = [
  {
    id: 1,
    title: 'SEF Newsletter #1',
    description: 'Update terbaru tentang program dan kegiatan SEF UNSOED.',
    date: '1 Maret 2024',
    link: '#',
  },
  {
    id: 2,
    title: 'SEF Newsletter #2',
    description: 'Tips dan trik belajar bahasa Inggris dari para ahli.',
    date: '15 Februari 2024',
    link: '#',
  },
  {
    id: 3,
    title: 'SEF Newsletter #3',
    description: 'Kisah sukses dari alumni SEF UNSOED.',
    date: '1 Februari 2024',
    link: '#',
  },
]

const specialDays = [
  {
    id: 1,
    title: 'International Mother Language Day',
    description: 'Mengenal pentingnya bahasa ibu dan keragaman bahasa di dunia.',
    date: '21 Februari 2024',
    link: '#',
  },
  {
    id: 2,
    title: 'World Poetry Day',
    description: 'Merayakan keindahan puisi dalam berbagai bahasa.',
    date: '21 Maret 2024',
    link: '#',
  },
  {
    id: 3,
    title: 'International Literacy Day',
    description: 'Pentingnya literasi dalam pengembangan masyarakat.',
    date: '8 September 2024',
    link: '#',
  },
]

const podcasts = [
  {
    id: 1,
    title: 'Episode 1: Tips Belajar Bahasa Inggris',
    description: 'Diskusi tentang metode efektif belajar bahasa Inggris.',
    duration: '15:30',
    date: '1 Maret 2024',
    link: '#',
  },
  {
    id: 2,
    title: 'Episode 2: Public Speaking Skills',
    description: 'Cara meningkatkan kemampuan public speaking dalam bahasa Inggris.',
    duration: '20:15',
    date: '15 Februari 2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Episode 3: TOEFL Preparation',
    description: 'Strategi persiapan TOEFL yang efektif.',
    duration: '18:45',
    date: '1 Februari 2024',
    link: '#',
  },
]

export default function Konten() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Konten Edukasi
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Temukan berbagai konten edukasi untuk meningkatkan kemampuan bahasa Inggris Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Artikel</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Artikel Edukasi
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Artikel-artikel yang dapat membantu Anda dalam belajar bahasa Inggris.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="flex flex-col items-start">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={article.date} className="text-gray-500">
                  {article.date}
                </time>
                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {article.category}
                </span>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {article.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.description}</p>
                <div className="mt-6 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {article.author}
                    </p>
                    <p className="text-gray-600">{article.readTime}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Newsletter</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Newsletter SEF
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dapatkan update terbaru tentang program dan kegiatan SEF UNSOED.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {newsletters.map((newsletter, newsletterIdx) => (
                <li key={newsletter.id}>
                  <div className="relative pb-8">
                    {newsletterIdx !== newsletters.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <EnvelopeIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {newsletter.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">{newsletter.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{newsletter.description}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <a href={newsletter.link} className="text-indigo-600 hover:text-indigo-500">
                            Baca selengkapnya <span aria-hidden="true">→</span>
                          </a>
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

      {/* Special Days section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Peringatan Hari</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Artikel Peringatan Hari
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Artikel-artikel yang berkaitan dengan hari-hari penting dalam dunia bahasa dan pendidikan.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {specialDays.map((day, dayIdx) => (
                <li key={day.id}>
                  <div className="relative pb-8">
                    {dayIdx !== specialDays.length - 1 ? (
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
                            {day.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">{day.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{day.description}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <a href={day.link} className="text-indigo-600 hover:text-indigo-500">
                            Baca selengkapnya <span aria-hidden="true">→</span>
                          </a>
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

      {/* Podcast section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Podcast</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            SEF Podcast
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dengarkan podcast kami untuk tips dan trik belajar bahasa Inggris.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {podcasts.map((podcast, podcastIdx) => (
                <li key={podcast.id}>
                  <div className="relative pb-8">
                    {podcastIdx !== podcasts.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <MicrophoneIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {podcast.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">{podcast.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{podcast.description}</p>
                          <p className="mt-2 text-sm text-gray-500">Durasi: {podcast.duration}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <a href={podcast.link} className="text-indigo-600 hover:text-indigo-500">
                            Dengarkan <span aria-hidden="true">→</span>
                          </a>
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