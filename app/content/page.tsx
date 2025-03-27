"use client"

import {
  EnvelopeIcon,
  CalendarIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { Suspense } from "react"

function ContentComponent() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {t.content.hero.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {t.content.hero.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.content.articles.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.content.articles.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.content.articles.description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {t.content.articles.items.map((article) => (
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
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {article.description}
                </p>
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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.content.newsletter.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.content.newsletter.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.content.newsletter.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {t.content.newsletter.items.map((newsletter, newsletterIdx) => (
                <li key={newsletter.id}>
                  <div className="relative pb-8">
                    {newsletterIdx !== t.content.newsletter.items.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <EnvelopeIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {newsletter.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {newsletter.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {newsletter.description}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {t.content.newsletter.readMore}{" "}
                            <span aria-hidden="true">→</span>
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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.content.specialDays.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.content.specialDays.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.content.specialDays.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {t.content.specialDays.items.map((day, dayIdx) => (
                <li key={day.id}>
                  <div className="relative pb-8">
                    {dayIdx !== t.content.specialDays.items.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <CalendarIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">{day.date}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {day.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {day.description}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {t.content.specialDays.readMore}{" "}
                            <span aria-hidden="true">→</span>
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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.content.podcast.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.content.podcast.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.content.podcast.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {t.content.podcast.items.map((podcast, podcastIdx) => (
                <li key={podcast.id}>
                  <div className="relative pb-8">
                    {podcastIdx !== t.content.podcast.items.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <MicrophoneIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {podcast.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {podcast.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {podcast.description}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            {t.content.podcast.duration}: {podcast.duration}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {t.content.podcast.listen}{" "}
                            <span aria-hidden="true">→</span>
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

export default function Konten() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentComponent />
    </Suspense>
  )
}
