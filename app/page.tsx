"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
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

      {/* Feature section */}
      <div className="bg-gray-100">
        <div className="pt-10 mx-auto mt-32 max-w-7xl flex flex-col lg:flex-row items-center gap-10 lg:gap-32">
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <div className="relative w-fit">
              <h1 className="font-bold text-3xl lg:text-4xl text-center">
                {translations[language].home.features.title}
              </h1>
              <Image
                src="/crown.svg"
                alt="crown"
                width={100}
                height={100}
                className="hidden lg:block absolute -top-9 -right-9 size-12"
              />
              <Image
                src="/z-line.svg"
                alt="zigzag"
                width={1000}
                height={100}
                className="lg:hidden absolute -bottom-7 left-0 w-full h-auto"
              />
            </div>
            <p className="hidden lg:flex font-medium text-lg mt-4">
              {translations[language].home.features.description}
            </p>
          </div>
          <div className="mb-13 lg:mb-0 lg:w-1/2">
            <Image
              src="/feat-1.svg"
              alt="feat-1"
              width={100}
              height={100}
              className="hidden lg:flex w-full h-auto"
            />
            <Image
              src="/feat-1-mb.svg"
              alt="feat-1-mb"
              width={100}
              height={100}
              className="lg:hidden w-full h-auto"
            />
          </div>
        </div>
        <div className="relative mt-10">
          <Image
            src="/bauble.svg"
            alt="bauble"
            width={300}
            height={300}
            className="absolute -top-30 lg:-top-60 left-5 w-40 lg:w-72 h-auto z-0 -rotate-6 lg:-rotate-2"
          />
          <div
            className="w-full h-auto bg-[#191919] py-20"
            style={{ clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)" }}
          >
            <div className="flex flex-col lg:flex-row relative">
              <div className="w-full px-6 lg:px-40 mt-10 z-0">
                <h1 className="font-bold text-2xl lg:text-3xl">
                  {translations[language].home.features.subtitle
                    .split(" ")
                    .map((word, index) => (
                      <span
                        key={index}
                        className={`${
                          index === 3 ? "text-[#f89401]" : "text-white"
                        } `}
                      >
                        {word}{" "}
                      </span>
                    ))}
                </h1>
                <p className="font-medium text-lg mt-4 text-white">
                  {translations[language].home.features.head}
                </p>
                <ul className="text-lg mt-5 mb-10 lg:mb-0 lg:mt-15 ml-5 text-white/50 flex flex-col lg:flex-row lg:gap-10 list-disc">
                  {translations[language].home.features.items.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
              <Image
                src="/feat-2.svg"
                alt="feat-2"
                width={100}
                height={100}
                className="hidden lg:flex absolute right-32 top-1/2 -translate-y-1/2 w-auto h-72 object-contain"
              />
              <Image
                src="/feat-2-mb.svg"
                alt="feat-2-mb"
                width={100}
                height={100}
                className="lg:hidden absolute -top-5 px-4 lg:px-0 lg:right-32 lg:top-1/2 lg:-translate-y-1/2 w-auto lg:h-72 object-contain"
              />
              <button className="cursor-pointer absolute -bottom-[2.2rem] right-[16.5rem] lg:bottom-[5.5rem] lg:right-[240px] bg-[#ff8800] w-[118px] lg:w-[142px] px-4 lg:px-7 py-2 lg:py-3 rounded-lg text-lg font-medium text-white hover:scale-105 hover:text-[#ff8800] hover:bg-white transition-all duration-300">
                {translations[language].home.features.button}
              </button>
            </div>
          </div>
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