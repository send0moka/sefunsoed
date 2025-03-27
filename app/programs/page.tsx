"use client"

import {
  CalendarIcon,
  BuildingOfficeIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"

export default function ProgramsPage() {
  const { language } = useLanguage()
  const t = translations[language].programs

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

      {/* Events section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.events.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.events.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.events.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {t.events.items.map((event, eventIdx) => (
                <li key={event.title}>
                  <div className="relative pb-8">
                    {eventIdx !== t.events.items.length - 1 ? (
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
                          <p className="text-sm text-gray-500">{event.date}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {event.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {event.description}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            {t.events.locationLabel}: {event.location}
                          </p>
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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.achievements.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.achievements.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.achievements.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {t.achievements.items.map((achievement, achievementIdx) => (
                <li key={achievement.title}>
                  <div className="relative pb-8">
                    {achievementIdx !== t.achievements.items.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <TrophyIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {achievement.date}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {achievement.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {achievement.description}
                          </p>
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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.sponsors.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.sponsors.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.sponsors.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {t.sponsors.items.map((sponsor, sponsorIdx) => (
                <li key={sponsor.name}>
                  <div className="relative pb-8">
                    {sponsorIdx !== t.sponsors.items.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <BuildingOfficeIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {sponsor.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {sponsor.description}
                          </p>
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
