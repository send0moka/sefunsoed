"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { useSearchParams } from "next/navigation"
import { JSX, Suspense } from "react"
import Image from "next/image"

function HomeComponent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()

  const getLinkWithLang = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", language)
    return `${href}?${params.toString()}`
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto mt-10 sm:mt-24 lg:mt-32 max-w-7xl px-6 py-12 sm:py-16 lg:py-24 lg:px-8">
          {/* Hero Header */}
          <div className="flex flex-col lg:flex-row lg:items-end sm:gap-x-6">
            <h1 className="text-[2.12rem] sm:text-5xl lg:text-7xl font-semibold lg:font-bold tracking-tighter lg:tracking-tight text-gray-900">
              {translations[language].home.hero.title}
            </h1>
            <div className="flex flex-col lg:flex-row -space-x-6 mt-1 lg:mt-0 gap-1 lg:gap-0">
              <div className="flex gap-3 items-center">
                <Image 
                  src="/lamp.svg" 
                  alt="Lamp" 
                  width={125} 
                  height={125}
                  className="size-12 sm:size-24 lg:size-32" 
                />
                <h1 className="lg:hidden text-[2.12rem] sm:text-6xl lg:text-7xl font-semibold lg:font-bold tracking-tighter lg:tracking-wide text-indigo-500">
                  {translations[language].home.hero.subtitle}
                </h1>
              </div>
              <div className="flex gap-3 items-center">
                <Image 
                  src="/star.svg" 
                  alt="star" 
                  width={125} 
                  height={125}
                  className="size-12 sm:size-24 lg:size-32" 
                />
                <h1 className="lg:hidden -translate-y-0.5 text-[2.12rem] sm:text-5xl lg:text-7xl font-semibold lg:font-bold tracking-tighter lg:tracking-tight text-gray-900">
                  {translations[language].home.hero.place}
                </h1>
                <Image 
                  src="/lup.svg" 
                  alt="lup" 
                  width={80} 
                  height={80}
                  className="lg:hidden size-10 -translate-y-0.5" 
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex flex-col-reverse lg:flex-row mt-2 lg:mt-8 gap-8 lg:gap-x-8">
            {/* Left Column */}
            <div className="flex flex-col gap-y-6 items-center lg:items-end">
              <div className="w-full lg:w-fit flex flex-row -space-y-4 sm:-space-x-6 sm:space-y-0 items-center sm:items-end">
                <Image
                  src="/laptop.png"
                  alt="laptop"
                  width={600}
                  height={300}
                  className="absolute -left-2 lg:left-0 bottom-40 lg:bottom-0 lg:relative w-24 sm:w-28 lg:w-32 z-10"
                />
                <Image
                  src="/forum.png"
                  alt="Forum"
                  width={600}
                  height={300}
                  className="w-full lg:w-auto h-48 lg:h-72 rounded-3xl object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6">
                <Link
                  href={getLinkWithLang("/registration")}
                  className="w-full sm:w-fit rounded-full bg-indigo-600 px-6 py-3 text-base lg:text-lg font-semibold text-white text-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {translations[language].home.hero.registerButton}
                </Link>
                <Link
                  href={getLinkWithLang("/about")}
                  className="text-base lg:text-lg font-semibold leading-6 text-gray-900"
                >
                  {translations[language].home.hero.learnMore}{" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <h1 className="hidden lg:flex text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-indigo-500">
                {translations[language].home.hero.institution}
              </h1>
              <div className="hidden lg:flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-x-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
                  {translations[language].home.hero.place}
                </h1>
                <Image 
                  src="/lup.svg" 
                  alt="lup" 
                  width={80} 
                  height={80}
                  className="w-16 sm:w-20 lg:w-24 h-auto" 
                />
              </div>
              <p className="text-base lg:text-lg font-medium text-balance max-w-2xl mx-auto lg:mx-0 lg:leading-8 text-gray-500 lg:text-gray-900">
                {translations[language].home.hero.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {translations[language].home.features.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {translations[language].home.features.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {translations[language].home.features.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {translations[language].home.features[feature.key].title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    {
                      translations[language].home.features[feature.key]
                        .description
                    }
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div
          className="absolute inset-x-0 top-1/3 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
          aria-hidden="true"
        >
          <div
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.375rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {translations[language].home.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            {translations[language].home.cta.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={getLinkWithLang("/registration")}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {translations[language].home.cta.registerButton}
            </Link>
            <Link
              href={getLinkWithLang("/about")}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {translations[language].home.cta.learnMore}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  )
}

type FeatureKey = "nudc" | "toefl" | "translation"

interface Feature {
  key: FeatureKey
  name: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

const features: Feature[] = [
  {
    key: "nudc",
    name: "NUDC/KDMI Program",
    icon: function Icon(props: React.SVGProps<SVGSVGElement>) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      )
    },
  },
  {
    key: "toefl",
    name: "TOEFL/UEPT Preparation",
    icon: function Icon(props: React.SVGProps<SVGSVGElement>) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      )
    },
  },
  {
    key: "translation",
    name: "Translation & Proofreading",
    icon: function Icon(props: React.SVGProps<SVGSVGElement>) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      )
    },
  },
]
