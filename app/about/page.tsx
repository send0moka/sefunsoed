'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/translations'
import Image from 'next/image'

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

// Organization structure data
const organizationStructure = {
  leadership: [
    {
      name: "Dinar Danahari Amalia",
      role: "President",
      department: "International Relations '22",
      image: "/images/members/dinar.png" // Add actual image path
    },
    {
      name: "Atthiya Zahrah Faiha R",
      role: "Vice President",
      department: "Law '23",
      image: "/images/members/atthiya.png" // Add actual image path
    },
    {
      name: "Mujahiddah",
      role: "Secretary",
      department: "Law '23",
      image: "/images/members/mujahiddah.png" // Add actual image path
    },
    {
      name: "Keyla Bening Larasati",
      role: "Secretary",
      department: "English Literature '23",
      image: "/images/members/keyla.png" // Add actual image path
    },
    {
      name: "Ina Agniya Nadhiroh",
      role: "Treasurer",
      department: "English Literature '23",
      image: "/images/members/ina.png" // Add actual image path
    },
    {
      name: "Rafidah Tazkiyah",
      role: "Treasurer",
      department: "English Literature '23",
      image: "/images/members/rafidah.png" // Add actual image path
    },
  ],
  talentDebate: [
    {
      name: "Putu Puspa Widyanti",
      role: "Coordinator",
      department: "International Relations '23",
      image: "/images/members/putu.png" // Add actual image path
    },
    {
      name: "Alya Naura A",
      role: "Staff",
      department: "Public Administration '23",
      image: "/images/members/alya.png" // Add actual image path
    },
    {
      name: "Ejelin Putri Perdani",
      role: "Staff",
      department: "Sociology '24",
      image: "/images/members/ejelin.png" // Add actual image path
    },
    {
      name: "Nouval Malik Dwipradani",
      role: "Staff",
      department: "Law '24",
      image: "/images/members/nouval.png" // Add actual image path
    },
    {
      name: "Maryam Aqila Mahdiya",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/maryam.png" // Add actual image path
    },
    {
      name: "Salwa Fitriana",
      role: "Staff",
      department: "Public Administration '24",
      image: "/images/members/salwa.png" // Add actual image path
    },
    {
      name: "Rahma Alia",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/rahma.png" // Add actual image path
    },
    {
      name: "Immanuel Fillius A. Deo",
      role: "Staff",
      department: "English Diploma Program '24",
      image: "/images/members/immanuel.png" // Add actual image path
    },
  ],
  researchDevelopment: [
    {
      name: "Wirdayanti Muthoharoh",
      role: "Coordinator",
      department: "International Relations '23",
      image: "/images/members/wirdayanti.png" // Add actual image path
    },
    {
      name: "Rosyada Aprizzati",
      role: "Staff",
      department: "English Education '23",
      image: "/images/members/rosyada.png" // Add actual image path
    },
    {
      name: "Akmala Ifthina",
      role: "Staff",
      department: "Food Technology '24",
      image: "/images/members/akmala.png" // Add actual image path
    },
    {
      name: "Shafira Ananti Putri",
      role: "Staff",
      department: "Food Technology '24",
      image: "/images/members/shafira.png" // Add actual image path
    },
    {
      name: "M. Abie Shafa Zuhdan",
      role: "Staff",
      department: "International Relations '24",
      image: "/images/members/abie.png" // Add actual image path
    },
    {
      name: "Enriko Desta Pratama",
      role: "Staff",
      department: "International Relations '24",
      image: "/images/members/enriko.png" // Add actual image path
    },
    {
      name: "Lintang Azra Pradipa",
      role: "Staff",
      department: "English Literature '23",
      image: "/images/members/lintang.png" // Add actual image path
    },
    {
      name: "Nur Khasanah",
      role: "Staff",
      department: "Accounting '24",
      image: "/images/members/nur.png" // Add actual image path
    },
    {
      name: "Natasha Ayu Eka Kirana",
      role: "Staff",
      department: "Communication Science '23",
      image: "/images/members/natasha.png" // Add actual image path
    },
  ],
  publicRelations: [
    {
      name: "Priyanka Jauza Permana",
      role: "Coordinator",
      department: "English Literature '23",
      image: "/images/members/priyanka.png" // Add actual image path
    },
    {
      name: "Gerard Jordan C. N.",
      role: "Staff",
      department: "International Relations '23",
      image: "/images/members/gerard.png" // Add actual image path
    },
    {
      name: "Andrea Zuhra",
      role: "Staff",
      department: "Agrotechnology '21",
      image: "/images/members/andrea.png" // Add actual image path
    },
    {
      name: "Azkia Sofie Wulandari",
      role: "Staff",
      department: "International Relations '23",
      image: "/images/members/azkia.png" // Add actual image path
    },
    {
      name: "Nadira Raihana Marethia",
      role: "Staff",
      department: "English Literature '23",
      image: "/images/members/nadira.png" // Add actual image path
    },
    {
      name: "Nabila Aulia",
      role: "Staff",
      department: "English Literature '23",
      image: "/images/members/nabila.png" // Add actual image path
    },
    {
      name: "Kayla Ayu Rindhi P.",
      role: "Staff",
      department: "Food Technology '23",
      image: "/images/members/kayla.png" // Add actual image path
    },
    {
      name: "Nissrina Aulia Riyadi",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/nissrina.png" // Add actual image path
    },
    {
      name: "Sekar Ayu Rasendriya",
      role: "Staff",
      department: "International Relations '24",
      image: "/images/members/sekar.png" // Add actual image path
    },
    {
      name: "Nadia Noor Faadhillah",
      role: "Staff",
      department: "Public Administration '24",
      image: "/images/members/nadia.png" // Add actual image path
    },
    {
      name: "Natria Rasya Oryza S.",
      role: "Staff",
      department: "Communication Science '24",
      image: "/images/members/natria.png" // Add actual image path
    },
  ],
  education: [
    {
      name: "Marlina",
      role: "Coordinator",
      department: "Public Administration '23",
      image: "/images/members/marlina.png" // Add actual image path
    },
    {
      name: "Haifa Alamanda Syani",
      role: "Staff",
      department: "English Education '23",
      image: "/images/members/haifa.png" // Add actual image path
    },
    {
      name: "Maestri Fena Purikasih",
      role: "Staff",
      department: "Physics '23",
      image: "/images/members/maestri.png" // Add actual image path
    },
    {
      name: "Elvina Julita",
      role: "Staff",
      department: "English Diploma Program '23",
      image: "/images/members/elvina.png" // Add actual image path
    },
    {
      name: "Chelsea Audya Zhafira",
      role: "Staff",
      department: "Public Administration '24",
      image: "/images/members/chelsea.png" // Add actual image path
    },
    {
      name: "Nayla Syifa Rizkiana",
      role: "Staff",
      department: "Law '24",
      image: "/images/members/nayla.png" // Add actual image path
    },
    {
      name: "Athiyyah Riyansa P. R.",
      role: "Staff",
      department: "English Education '23",
      image: "/images/members/athiyyah.png" // Add actual image path
    },
    {
      name: "Aena Rahma Wiguna",
      role: "Staff",
      department: "English Literature '24",
      image: "/images/members/aena.png" // Add actual image path
    },
    {
      name: "Leeroy Dian Tanjaya",
      role: "Staff",
      department: "Accounting '24",
      image: "/images/members/leeroy.png" // Add actual image path
    },
  ],
};

export default function TentangKami() {
  const { language } = useLanguage()
  const t = translations[language].about

  // MemberCard component
  type Member = {
    name: string;
    role: string;
    department: string;
    image: string;
  };

  const MemberCard = ({ member, languageRoles }: { 
    member: Member; 
    languageRoles: Record<string, string> 
  }) => {
    // Map English role names to translated role keys
    const roleMapping: Record<string, keyof typeof languageRoles> = {
      "President": "president",
      "Vice President": "vicePresident",
      "Secretary": "secretary",
      "Treasurer": "treasurer",
      "Coordinator": "coordinator",
      "Staff": "staff",
    };
    
    const translatedRole = languageRoles[roleMapping[member.role] || "staff"];
    
    // Extract department and batch year for better formatting
    const departmentParts = member.department.match(/(.*)\s'(\d+)$/);
    const departmentName = departmentParts ? departmentParts[1] : member.department;
    const batchYear = departmentParts ? departmentParts[2] : "";
    
    // Map English department names to translation keys
    const departmentMapping: Record<string, keyof typeof t.organizationStructure.majorNames> = {
      "International Relations": "internationalRelations",
      "Law": "law",
      "English Literature": "englishLiterature",
      "Public Administration": "publicAdministration",
      "Sociology": "sociology",
      "Food Technology": "foodTechnology",
      "English Diploma Program": "englishDiplomaProgram",
      "English Education": "englishEducation",
      "Accounting": "accounting",
      "Communication Science": "communicationScience",
      "Agrotechnology": "agrotechnology",
      "Physics": "physics",
    };
    
    // Translate department name if it exists in the mapping
    const translatedDepartment = departmentName && departmentMapping[departmentName] 
      ? t.organizationStructure.majorNames[departmentMapping[departmentName]] 
      : departmentName;
    
    return (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
        <p className="text-sm text-indigo-600 font-semibold">{translatedRole}</p>
        <p className="text-xs text-gray-500 mt-1">
          <span>{translatedDepartment}</span>
          {batchYear && (
            <span className="ml-1 text-indigo-400">'<span className="font-medium">{batchYear}</span></span>
          )}
        </p>
      </div>
    );
  };

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

      {/* Organization Structure section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{t.organizationStructure.title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.organizationStructure.subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.organizationStructure.description}
          </p>
        </div>
        
        {/* Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.organizationStructure.departments.leadership}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {organizationStructure.leadership.map((member, index) => (
              <MemberCard key={index} member={member} languageRoles={t.organizationStructure.roles} />
            ))}
          </div>
        </div>
        
        {/* Talent & Debate Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.organizationStructure.departments.talentDebate}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.talentDebate.map((member, index) => (
              <MemberCard key={index} member={member} languageRoles={t.organizationStructure.roles} />
            ))}
          </div>
        </div>
        
        {/* Research & Development Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.organizationStructure.departments.researchDevelopment}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.researchDevelopment.map((member, index) => (
              <MemberCard key={index} member={member} languageRoles={t.organizationStructure.roles} />
            ))}
          </div>
        </div>
        
        {/* Public Relations Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.organizationStructure.departments.publicRelations}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.publicRelations.map((member, index) => (
              <MemberCard key={index} member={member} languageRoles={t.organizationStructure.roles} />
            ))}
          </div>
        </div>
        
        {/* Education Department */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.organizationStructure.departments.education}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {organizationStructure.education.map((member, index) => (
              <MemberCard key={index} member={member} languageRoles={t.organizationStructure.roles} />
            ))}
          </div>
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