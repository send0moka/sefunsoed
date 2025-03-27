"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/translations"
import Image from "next/image"

// Modified organization structure data to include social media links
const organizationStructure = {
  leadership: [
    {
      name: "Dinar Danahari Amalia",
      role: "President",
      department: "International Relations '22",
      image: "/images/members/dinar.png",
      instagram: "danaharii",
      linkedin: "dinar-danahari-0767282b6",
    },
    {
      name: "Atthiya Zahrah Faiha R",
      role: "Vice President",
      department: "Law '23",
      image: "/images/members/atthiya.png",
      instagram: "faihahermawan",
    },
    {
      name: "Mujahiddah",
      role: "Secretary",
      department: "Law '23",
      image: "/images/members/mujahiddah.png",
      instagram: "iidaxhn",
    },
    {
      name: "Keyla Bening Larasati",
      role: "Secretary",
      department: "English Literature '23",
      image: "/images/members/keyla.png",
      instagram: "keylavau",
    },
    {
      name: "Ina Agniya Nadhiroh",
      role: "Treasurer",
      department: "English Literature '23",
      image: "/images/members/ina.png",
      instagram: "inaagniya",
    },
    {
      name: "Rafidah Tazkiyah",
      role: "Treasurer",
      department: "English Literature '23",
      image: "/images/members/rafidah.png",
      instagram: "rafida.t",
    },
  ],
  talentDebate: [
    {
      name: "Putu Puspa Widyanti",
      role: "Coordinator",
      department: "International Relations '23",
      image: "/images/members/putu.png",
      instagram: "ppspaaw",
    },
    {
      name: "Alya Naura A",
      role: "Staff",
      department: "Public Administration '23",
      image: "/images/members/alya.png",
      instagram: "aleeyanauraa",
    },
    {
      name: "Ejelin Putri Perdani",
      role: "Staff",
      department: "Sociology '24",
      image: "/images/members/ejelin.png",
      instagram: "ejelinz",
    },
    {
      name: "Nouval Malik Dwipradani",
      role: "Staff",
      department: "Law '24",
      image: "/images/members/nouval.png",
      instagram: "skrrt_skrrt.yeet",
    },
    {
      name: "Maryam Aqila Mahdiya",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/maryam.png",
    },
    {
      name: "Salwa Fitriana",
      role: "Staff",
      department: "Public Administration '24",
      image: "/images/members/salwa.png",
      instagram: "fitrianashf",
    },
    {
      name: "Rahma Alia",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/rahma.png",
    },
    {
      name: "Immanuel Fillius A. Deo",
      role: "Staff",
      department: "English Diploma Program '24",
      image: "/images/members/immanuel.png",
    },
  ],
  researchDevelopment: [
    {
      name: "Wirdayanti Muthoharoh",
      role: "Coordinator",
      department: "International Relations '23",
      image: "/images/members/wirdayanti.png",
      instagram: "virda_ym",
    },
    {
      name: "Rosyada Aprizzati",
      role: "Staff",
      department: "English Education '23",
      image: "/images/members/rosyada.png",
      instagram: "ocaa.cao",
    },
    {
      name: "Akmala Ifthina",
      role: "Staff",
      department: "Food Technology '24",
      image: "/images/members/akmala.png",
    },
    {
      name: "Shafira Ananti Putri",
      role: "Staff",
      department: "Food Technology '24",
      image: "/images/members/shafira.png",
      instagram: "shafiraatr",
    },
    {
      name: "M. Abie Shafa Zuhdan",
      role: "Staff",
      department: "International Relations '24",
      image: "/images/members/abie.png",
      instagram: "m_a_s_zuhdan",
    },
    {
      name: "Enriko Desta Pratama",
      role: "Staff",
      department: "International Relations '24",
      image: "/images/members/enriko.png",
      instagram: "enrikopm",
    },
    {
      name: "Lintang Azra Pradipa",
      role: "Staff",
      department: "English Literature '23",
      image: "/images/members/lintang.png",
      instagram: "heizraaa",
    },
    {
      name: "Nur Khasanah",
      role: "Staff",
      department: "Accounting '24",
      image: "/images/members/nur.png",
      instagram: "bbliesann",
    },
    {
      name: "Natasha Ayu Eka Kirana",
      role: "Staff",
      department: "Communication Science '23",
      image: "/images/members/natasha.png",
    },
  ],
  publicRelations: [
    {
      name: "Priyanka Jauza Permana",
      role: "Coordinator",
      department: "English Literature '23",
      image: "/images/members/priyanka.png",
      instagram: "jjauzaaa",
    },
    {
      name: "Gerard Jordan C. N.",
      role: "Staff",
      department: "International Relations '23",
      image: "/images/members/gerard.png",
      instagram: "gjcn2006",
    },
    {
      name: "Andrea Zuhra",
      role: "Staff",
      department: "Agrotechnology '21",
      image: "/images/members/andrea.png",
      instagram: "andreaazuhra",
    },
    {
      name: "Azkia Sofie Wulandari",
      role: "Staff",
      department: "International Relations '23",
      image: "/images/members/azkia.png",
      instagram: "azkiasf",
    },
    {
      name: "Nadira Raihana Marethia",
      role: "Staff",
      department: "English Literature '23",
      image: "/images/members/nadira.png",
      instagram: "marethiia",
    },
    {
      name: "Nabila Aulia",
      role: "Staff",
      department: "English Literature '23",
      image: "/images/members/nabila.png",
      instagram: "bil4au",
    },
    {
      name: "Kayla Ayu Rindhi P.",
      role: "Staff",
      department: "Food Technology '23",
      image: "/images/members/kayla.png",
      instagram: "kaylaayukk",
    },
    {
      name: "Nissrina Aulia Riyadi",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/nissrina.png",
      instagram: "njssrjna",
    },
    {
      name: "Sekar Ayu Rasendriya",
      role: "Staff",
      department: "International Relations '24",
      image: "/images/members/sekar.png",
      instagram: "sekarayurn",
    },
    {
      name: "Nadia Noor Faadhillah",
      role: "Staff",
      department: "Public Administration '24",
      image: "/images/members/nadia.png",
    },
    {
      name: "Natria Rasya Oryza S.",
      role: "Staff",
      department: "Communication Science '24",
      image: "/images/members/natria.png",
      instagram: "natriarasyos",
    },
  ],
  education: [
    {
      name: "Marlina",
      role: "Coordinator",
      department: "Public Administration '23",
      image: "/images/members/marlina.png",
      instagram: "_marrlinaa",
    },
    {
      name: "Haifa Alamanda Syani",
      role: "Staff",
      department: "English Education '23",
      image: "/images/members/haifa.png",
      instagram: "ziniascarlett",
    },
    {
      name: "Maestri Fena Purikasih",
      role: "Staff",
      department: "Physics '23",
      image: "/images/members/maestri.png",
    },
    {
      name: "Elvina Julita",
      role: "Staff",
      department: "English Diploma Program '23",
      image: "/images/members/elvina.png",
    },
    {
      name: "Chelsea Audya Zhafira",
      role: "Staff",
      department: "Public Administration '24",
      image: "/images/members/chelsea.png",
      instagram: "chelse.ady",
    },
    {
      name: "Nayla Syifa Rizkiana",
      role: "Staff",
      department: "Law '24",
      image: "/images/members/nayla.png",
      instagram: "snayyue_",
    },
    {
      name: "Athiyyah Riyansa P. R.",
      role: "Staff",
      department: "English Education '23",
      image: "/images/members/athiyyah.png",
      instagram: "athiyyah_riyansa_pr",
    },
    {
      name: "Aena Rahma Wiguna",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/aena.png",
      instagram: "aenarahmaa",
    },
    {
      name: "Leeroy Dian Tanjaya",
      role: "Staff",
      department: "Accounting '24",
      image: "/images/members/leeroy.png",
      instagram: "leeoryy",
    },
  ],
}

export default function TentangKami() {
  const { language } = useLanguage()
  const t = translations[language].about

  // MemberCard component
  type Member = {
    name: string
    role: string
    department: string
    image: string
    instagram?: string
    linkedin?: string
  }

  const MemberCard = ({
    member,
    languageRoles,
  }: {
    member: Member
    languageRoles: Record<string, string>
  }) => {
    // Map English role names to translated role keys
    const roleMapping: Record<string, keyof typeof languageRoles> = {
      President: "president",
      "Vice President": "vicePresident",
      Secretary: "secretary",
      Treasurer: "treasurer",
      Coordinator: "coordinator",
      Staff: "staff",
    }

    const translatedRole = languageRoles[roleMapping[member.role] || "staff"]

    // Extract department and batch year for better formatting
    const departmentParts = member.department.match(/(.*)\s'(\d+)$/)
    const departmentName = departmentParts
      ? departmentParts[1]
      : member.department
    const batchYear = departmentParts ? departmentParts[2] : ""

    // Map English department names to translation keys
    const departmentMapping: Record<
      string,
      keyof typeof t.organizationStructure.majorNames
    > = {
      "International Relations": "internationalRelations",
      Law: "law",
      "English Literature": "englishLiterature",
      "Public Administration": "publicAdministration",
      Sociology: "sociology",
      "Food Technology": "foodTechnology",
      "English Diploma Program": "englishDiplomaProgram",
      "English Education": "englishEducation",
      Accounting: "accounting",
      "Communication Science": "communicationScience",
      Agrotechnology: "agrotechnology",
      Physics: "physics",
    }

    // Translate department name if it exists in the mapping
    const translatedDepartment =
      departmentName && departmentMapping[departmentName]
        ? t.organizationStructure.majorNames[departmentMapping[departmentName]]
        : departmentName

    return (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative group">
        <div className="relative w-32 h-32 mb-3 overflow-hidden rounded-full">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        </div>
        <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
        <p className="text-sm text-indigo-600 font-semibold">
          {translatedRole}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          <span>{translatedDepartment}</span>
          {batchYear && (
            <span className="ml-1 text-indigo-400">
              &apos;<span className="font-medium">{batchYear}</span>
            </span>
          )}
        </p>

        {/* Only show overlay if member has social media */}
        {(member.instagram || member.linkedin) && (
          <div className="absolute inset-0 bg-indigo-600/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <p className="text-white font-medium text-lg mb-4">{member.name}</p>
            <div className="flex space-x-4">
              {member.instagram && (
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.programKerja.title}
          </h2>
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

      {/* Organization Structure section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.organizationStructure.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.organizationStructure.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.organizationStructure.description}
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.organizationStructure.departments.leadership}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {organizationStructure.leadership.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                languageRoles={t.organizationStructure.roles}
              />
            ))}
          </div>
        </div>

        {/* Talent & Debate Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.organizationStructure.departments.talentDebate}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.talentDebate.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                languageRoles={t.organizationStructure.roles}
              />
            ))}
          </div>
        </div>

        {/* Research & Development Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.organizationStructure.departments.researchDevelopment}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.researchDevelopment.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                languageRoles={t.organizationStructure.roles}
              />
            ))}
          </div>
        </div>

        {/* Public Relations Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.organizationStructure.departments.publicRelations}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.publicRelations.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                languageRoles={t.organizationStructure.roles}
              />
            ))}
          </div>
        </div>

        {/* Education Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t.organizationStructure.departments.education}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.education.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                languageRoles={t.organizationStructure.roles}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.faq.title}
          </h2>
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
                          open ? "rotate-180 transform" : ""
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
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t.contact.title}
          </h2>
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
