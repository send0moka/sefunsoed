export type NavigationKeys =
  | "home"
  | "about"
  | "programs"
  | "registration"
  | "services"
  | "content"
  | "media"
export type CommonKeys = "openMenu" | "closeMenu"
export type LanguageKeys = "en" | "id"
export type Language = "en" | "id"

type Navigation = {
  [K in NavigationKeys]: string
}

type Common = {
  [K in CommonKeys]: string
}

type HomeContent = {
  hero: {
    title: string
    subtitle: string
    institution: string
    place: string
    description: string
    registerButton: string
    learnMore: string
  }
  features: {
    title: string
    subtitle: string
    description: string
    nudc: {
      title: string
      description: string
    }
    toefl: {
      title: string
      description: string
    }
    translation: {
      title: string
      description: string
    }
  }
  cta: {
    title: string
    description: string
    registerButton: string
    learnMore: string
  }
}

type DynamicContentKey =
  | "tentang-kami"
  | "program-nudc"
  | "program-toefl"
  | "program-translation"
  | "kontak"

type DynamicContent = {
  [K in DynamicContentKey]: {
    title: string
    content: string[]
  }
}

type StaticContent = {
  hero: {
    title: string
    description: string
  }
  articles: {
    title: string
    subtitle: string
    description: string
    readMore: string
    items: Array<{
      id: number
      title: string
      description: string
      author: string
      date: string
      readTime: string
      category: string
    }>
  }
  newsletter: {
    title: string
    subtitle: string
    description: string
    readMore: string
    items: Array<{
      id: number
      title: string
      description: string
      date: string
    }>
  }
  specialDays: {
    title: string
    subtitle: string
    description: string
    readMore: string
    items: Array<{
      id: number
      title: string
      description: string
      date: string
    }>
  }
  podcast: {
    title: string
    subtitle: string
    description: string
    duration: string
    listen: string
    items: Array<{
      id: number
      title: string
      description: string
      duration: string
      date: string
    }>
  }
  notFound: {
    title: string
    description: string
    backToHome: string
  }
}

type ContentPage = Partial<DynamicContent> & StaticContent

type FooterContent = {
  navigation: {
    about: string
    programs: string
    registration: string
    services: string
    content: string
    media: string
  }
  social: {
    instagram: string
    twitter: string
    linkedin: string
    youtube: string
  }
  copyright: string
  address: {
    line1: string
    line2: string
    email: string
    phone: string
  }
}

interface RegistrationContent {
  title: string
  description: string
  registerButton: string
  learnMore: string
  requirements: {
    title: string
    subtitle: string
    description: string
    items: string[]
  }
  options: {
    nudc: {
      name: string
      description: string
      status: string
    }
    webinar: {
      name: string
      description: string
      status: string
    }
    toefl: {
      name: string
      description: string
      status: string
    }
    committee: {
      name: string
      description: string
      status: string
    }
    member: {
      name: string
      description: string
      status: string
    }
  }
}

interface RegistrationFormContent {
  title: string
  description: string
  name: string
  studentId: string
  faculty: string
  major: string
  email: string
  phone: string
  program: string
  selectProgram: string
  programs: {
    nudc: string
    toefl: string
    translation: string
  }
  motivation: string
  submitButton: string
}

interface NavbarContent {
  home: string
  about: string
  programs: string
  registration: string
  contact: string
  language: string
}

interface NotFoundContent {
  title: string
  description: string
  backToHome: string
}

interface AboutContent {
  hero: {
    title: string
    description: string
  }
  programKerja: {
    title: string
    subtitle: string
    description: string
    sections: {
      pembelajaran: {
        title: string
        items: string[]
      }
      pengembangan: {
        title: string
        items: string[]
      }
      layanan: {
        title: string
        items: string[]
      }
    }
  }
  faq: {
    title: string
    subtitle: string
    description: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  contact: {
    title: string
    subtitle: string
    description: string
    address: {
      title: string
      content: string[]
    }
    contactInfo: {
      title: string
      content: string[]
    }
  }
  organizationStructure: {
    title: string
    subtitle: string
    description: string
    departments: {
      leadership: string
      talentDebate: string
      researchDevelopment: string
      publicRelations: string
      education: string
    }
    roles: {
      president: string
      vicePresident: string
      secretary: string
      treasurer: string
      coordinator: string
      staff: string
    }
    majorNames: {
      internationalRelations: string
      law: string
      englishLiterature: string
      publicAdministration: string
      sociology: string
      foodTechnology: string
      englishDiplomaProgram: string
      englishEducation: string
      accounting: string
      communicationScience: string
      agrotechnology: string
      physics: string
    }
  }
}

interface ProgramsContent {
  hero: {
    title: string
    description: string
  }
  events: {
    title: string
    subtitle: string
    description: string
    locationLabel: string
    items: Array<{
      title: string
      description: string
      date: string
      location: string
      status: string
    }>
  }
  achievements: {
    title: string
    subtitle: string
    description: string
    items: Array<{
      title: string
      description: string
      date: string
    }>
  }
  sponsors: {
    title: string
    subtitle: string
    description: string
    items: Array<{
      name: string
      description: string
    }>
  }
}

interface ServicesContent {
  hero: {
    title: string
    description: string
  }
  services: {
    title: string
    subtitle: string
    description: string
    items: Array<{
      name: string
      description: string
      features: string[]
      pricing: string
      turnaround: string
    }>
  }
  process: {
    title: string
    subtitle: string
    description: string
    steps: Array<{
      name: string
      description: string
    }>
  }
}

interface Translation {
  common: Common
  navigation: Navigation
  navbar: NavbarContent
  footer: FooterContent
  home: HomeContent
  content: ContentPage
  notFound: NotFoundContent
  registration: RegistrationContent
  registrationForm: RegistrationFormContent
  about: AboutContent
  programs: ProgramsContent
  services: ServicesContent
}

type Translations = {
  [K in LanguageKeys]: Translation
}

export const translations: Translations = {
  en: {
    navigation: {
      home: "Home",
      about: "About Us",
      programs: "Programs & Activities",
      registration: "Registration",
      services: "Services",
      content: "Content",
      media: "Media",
    },
    common: {
      openMenu: "Open main menu",
      closeMenu: "Close menu",
    },
    navbar: {
      home: "Home",
      about: "About Us",
      programs: "Programs",
      registration: "Registration",
      contact: "Contact",
      language: "Language",
    },
    home: {
      hero: {
        title: "Student-English Forum",
        subtitle: "Unsoed 2025",
        institution: "UNSOED",
        place: "Purwokerto",
        description:
          "A dynamic platform designed to foster the development of English language proficiency and cultivate student leadership skills at Universitas Jenderal Soedirman.",
        registerButton: "Register Now",
        learnMore: "Learn More",
      },
      features: {
        title: "Featured Programs",
        subtitle: "Various Programs for Self Development",
        description:
          "SEF UNSOED provides various programs to help students develop their English language skills and leadership abilities.",
        nudc: {
          title: "NUDC/KDMI Program",
          description:
            "Program preparation for national and international English debate competitions.",
        },
        toefl: {
          title: "TOEFL/UEPT Preparation",
          description:
            "Program preparation for TOEFL and UEPT tests with structured materials and test simulations.",
        },
        translation: {
          title: "Translation & Proofreading",
          description:
            "Translation and proofreading services for academic and non-academic documents.",
        },
      },
      cta: {
        title: "Join SEF UNSOED",
        description:
          "Be part of a community focused on developing English language skills and leadership.",
        registerButton: "Register Now",
        learnMore: "Learn More",
      },
    },
    content: {
      hero: {
        title: "Educational Content",
        description:
          "Discover various educational content to improve your English skills.",
      },
      articles: {
        title: "Articles",
        subtitle: "Educational Articles",
        description: "Articles that can help you learn English.",
        readMore: "Read More",
        items: [
          {
            id: 1,
            title: "Tips to Improve Speaking Skills",
            description:
              "Practical guide to improve your English speaking skills.",
            author: "John Doe",
            date: "March 15, 2024",
            readTime: "5 min read",
            category: "Education",
          },
          {
            id: 2,
            title: "Effective Essay Writing Strategies",
            description:
              "Learn proper techniques for writing essays in English.",
            author: "Jane Smith",
            date: "March 10, 2024",
            readTime: "7 min read",
            category: "Education",
          },
          {
            id: 3,
            title: "Grammar Tips: Present Perfect Tense",
            description:
              "Complete guide to using Present Perfect Tense in English.",
            author: "Mike Johnson",
            date: "March 5, 2024",
            readTime: "6 min read",
            category: "Education",
          },
        ],
      },
      newsletter: {
        title: "Newsletter",
        subtitle: "Stay Connected",
        description:
          "Get the latest updates about SEF UNSOED programs and activities.",
        readMore: "Read More",
        items: [
          {
            id: 1,
            title: "SEF Newsletter #1",
            description:
              "Latest updates about SEF UNSOED programs and activities.",
            date: "March 1, 2024",
          },
          {
            id: 2,
            title: "SEF Newsletter #2",
            description: "English learning tips and tricks from experts.",
            date: "February 15, 2024",
          },
          {
            id: 3,
            title: "SEF Newsletter #3",
            description: "Success stories from SEF UNSOED alumni.",
            date: "February 1, 2024",
          },
        ],
      },
      specialDays: {
        title: "Special Days",
        subtitle: "Special Days Articles",
        description:
          "Articles related to important days in language and education.",
        readMore: "Read More",
        items: [
          {
            id: 1,
            title: "International Mother Language Day",
            description:
              "Understanding the importance of mother tongue and language diversity in the world.",
            date: "February 21, 2024",
          },
          {
            id: 2,
            title: "World Poetry Day",
            description:
              "Celebrating the beauty of poetry in various languages.",
            date: "March 21, 2024",
          },
          {
            id: 3,
            title: "International Literacy Day",
            description: "The importance of literacy in community development.",
            date: "September 8, 2024",
          },
        ],
      },
      podcast: {
        title: "Podcast",
        subtitle: "Listen & Learn",
        description:
          "Listen to our podcast for English learning tips and tricks.",
        duration: "Duration",
        listen: "Listen Now",
        items: [
          {
            id: 1,
            title: "Episode 1: English Learning Tips",
            description:
              "Discussion about effective methods of learning English.",
            duration: "15:30",
            date: "March 1, 2024",
          },
          {
            id: 2,
            title: "Episode 2: Public Speaking Skills",
            description:
              "How to improve your public speaking skills in English.",
            duration: "20:15",
            date: "February 15, 2024",
          },
          {
            id: 3,
            title: "Episode 3: TOEFL Preparation",
            description: "Effective TOEFL preparation strategies.",
            duration: "18:45",
            date: "February 1, 2024",
          },
        ],
      },
      notFound: {
        title: "Page Not Found",
        description: "Sorry, we could not find the page you are looking for.",
        backToHome: "Back to Home",
      },
    },
    footer: {
      navigation: {
        about: "About",
        programs: "Programs",
        registration: "Registration",
        services: "Services",
        content: "Content",
        media: "Media",
      },
      social: {
        instagram: "Instagram",
        twitter: "Twitter",
        linkedin: "LinkedIn",
        youtube: "YouTube",
      },
      copyright: "Be One Step Forward! All rights reserved.",
      address: {
        line1:
          "Jl. Prof. Dr. HR Boenyamin No.708, Grendeng, North Purwokerto District",
        line2: "Banyumas Regency, Central Java 53122",
        email: "Email: sef.unsoed@gmail.com",
        phone: "Phone: 081316840834 (Jauza)",
      },
    },
    registration: {
      title: "Registration",
      description: "Choose a program that suits your needs and register now.",
      registerButton: "Register Now",
      learnMore: "Learn More",
      requirements: {
        title: "Requirements",
        subtitle: "General Requirements",
        description:
          "Here are the general requirements that must be met to register for SEF UNSOED programs.",
        items: [
          "Active UNSOED student",
          "Have an interest in English language development",
          "Willing to actively participate in the program",
        ],
      },
      options: {
        nudc: {
          name: "NUDC/KDMI",
          description:
            "Registration for national and international debate competition preparation program.",
          status: "Open",
        },
        webinar: {
          name: "Webinar",
          description:
            "Registration for various English language and self-development webinars.",
          status: "Open",
        },
        toefl: {
          name: "TOEFL/UEPT",
          description: "Registration for TOEFL and UEPT preparation program.",
          status: "Open",
        },
        committee: {
          name: "Committee",
          description:
            "Registration to become a committee member in various SEF UNSOED events.",
          status: "Open",
        },
        member: {
          name: "SEF Member",
          description: "Registration to become a member of SEF UNSOED.",
          status: "Open",
        },
      },
    },
    registrationForm: {
      title: "Registration Form",
      description:
        "Please fill out the form below to register for our programs.",
      name: "Full Name",
      studentId: "Student ID",
      faculty: "Faculty",
      major: "Major",
      email: "Email",
      phone: "Phone Number",
      program: "Program",
      selectProgram: "Select a program",
      programs: {
        nudc: "NUDC/KDMI Program",
        toefl: "TOEFL/UEPT Preparation",
        translation: "Translation & Proofreading",
      },
      motivation: "Motivation Letter",
      submitButton: "Submit Registration",
    },
    notFound: {
      title: "Page Not Found",
      description: "Sorry, we could not find the page you are looking for.",
      backToHome: "Back to Home",
    },
    about: {
      hero: {
        title: "About SEF UNSOED",
        description:
          "Developing English language skills and student leadership at UNSOED.",
      },
      programKerja: {
        title: "Work Programs",
        subtitle: "Programs & Activities",
        description: "Various programs and activities available at SEF UNSOED.",
        sections: {
          pembelajaran: {
            title: "Learning Programs",
            items: [
              "NUDC/KDMI Preparation",
              "TOEFL/UEPT Preparation",
              "English Conversation Club",
              "Writing Workshop",
            ],
          },
          pengembangan: {
            title: "Development Programs",
            items: [
              "Leadership Training",
              "Public Speaking Workshop",
              "Debate Competition",
              "English Camp",
            ],
          },
          layanan: {
            title: "Service Programs",
            items: [
              "Translation Service",
              "Proofreading Service",
              "English Consultation",
              "Mock Interview",
            ],
          },
        },
      },
      faq: {
        title: "FAQ",
        subtitle: "Common Questions",
        description:
          "Find answers to frequently asked questions about SEF UNSOED.",
        items: [
          {
            question: "What is SEF UNSOED?",
            answer:
              "SEF UNSOED is a student forum focused on developing English language skills and student leadership at UNSOED.",
          },
          {
            question: "How to join SEF UNSOED?",
            answer:
              "You can join by participating in the registration process held every semester. Registration information can be found on the Registration page.",
          },
          {
            question: "What programs are available at SEF UNSOED?",
            answer:
              "SEF UNSOED provides various programs such as NUDC/KDMI preparation, TOEFL/UEPT, and translation & proofreading services.",
          },
          {
            question: "Is there a fee to join?",
            answer:
              "Yes, there is a membership fee used to support SEF UNSOED activities and programs. Detailed information can be seen during registration.",
          },
        ],
      },
      contact: {
        title: "Contact",
        subtitle: "Contact Us",
        description: "Do not hesitate to contact us if you have any questions.",
        address: {
          title: "Address",
          content: [
            "UNSOED Student Center Building",
            "Jl. Dr. Soeparno No. 60",
            "Purwokerto, Central Java 53122",
          ],
        },
        contactInfo: {
          title: "Contact",
          content: ["Email: sef@unsoed.ac.id", "Phone: (0281) 638795"],
        },
      },
      organizationStructure: {
        title: "Our Team",
        subtitle: "Organization Structure",
        description:
          "Meet the dedicated team behind SEF UNSOED who work together to deliver excellent programs and services.",
        departments: {
          leadership: "Leadership",
          talentDebate: "Talent & Debate Department",
          researchDevelopment: "Research & Development Department",
          publicRelations: "Public Relations Department",
          education: "Education Department",
        },
        roles: {
          president: "President",
          vicePresident: "Vice President",
          secretary: "Secretary",
          treasurer: "Treasurer",
          coordinator: "Coordinator",
          staff: "Staff",
        },
        majorNames: {
          internationalRelations: "International Relations",
          law: "Law",
          englishLiterature: "English Literature",
          publicAdministration: "Public Administration",
          sociology: "Sociology",
          foodTechnology: "Food Technology",
          englishDiplomaProgram: "English Diploma Program",
          englishEducation: "English Education",
          accounting: "Accounting",
          communicationScience: "Communication Science",
          agrotechnology: "Agrotechnology",
          physics: "Physics",
        },
      },
    },
    programs: {
      hero: {
        title: "Programs & Activities",
        description:
          "Discover various programs and activities available at SEF UNSOED.",
      },
      events: {
        title: "Events",
        subtitle: "Upcoming Events",
        description: "Various activities that will be held soon by SEF UNSOED.",
        locationLabel: "Location",
        items: [
          {
            title: "NUDC Training",
            description:
              "Training preparation for National University Debating Championship.",
            date: "March 15, 2024",
            location: "Student Center Building",
            status: "Upcoming",
          },
          {
            title: "TOEFL Workshop",
            description: "TOEFL preparation workshop for UNSOED students.",
            date: "March 20, 2024",
            location: "FISIP Seminar Room",
            status: "Upcoming",
          },
          {
            title: "English Camp",
            description: "3-day immersive English learning program.",
            date: "March 25, 2024",
            location: "UNSOED Campus",
            status: "Upcoming",
          },
        ],
      },
      achievements: {
        title: "Achievements",
        subtitle: "Latest Achievements",
        description: "Latest achievements from SEF UNSOED.",
        items: [
          {
            title: "1st Place NUDC Regional",
            description:
              "SEF UNSOED debate team won first place in regional competition.",
            date: "February 10, 2024",
          },
          {
            title: "TOEFL Success Rate 95%",
            description:
              "95% of TOEFL program participants achieved their target score.",
            date: "February 5, 2024",
          },
          {
            title: "Best English Club Award",
            description:
              "SEF UNSOED received award as the best English Club in Central Java.",
            date: "February 1, 2024",
          },
        ],
      },
      sponsors: {
        title: "Sponsors",
        subtitle: "Strategic Partners",
        description:
          "Strategic partners supporting SEF UNSOED programs and activities.",
        items: [
          {
            name: "British Council",
            description: "Partner in English language program development.",
          },
          {
            name: "IDP Education",
            description: "Partner in TOEFL and IELTS programs.",
          },
          {
            name: "Cambridge Assessment",
            description: "Partner in learning material development.",
          },
        ],
      },
    },
    services: {
      hero: {
        title: "Our Services",
        description:
          "SEF UNSOED provides quality translation and proofreading services to meet your needs.",
      },
      services: {
        title: "Services",
        subtitle: "Available Services",
        description: "Choose a service that suits your needs.",
        items: [
          {
            name: "Translation Service",
            description:
              "Document translation service from Indonesian to English and vice versa.",
            features: [
              "Academic documents",
              "Business documents",
              "Legal documents",
              "Articles and content",
            ],
            pricing: "Starting from IDR 50,000/page",
            turnaround: "2-3 working days",
          },
          {
            name: "Proofreading Service",
            description:
              "Grammar, spelling, and format checking and correction service for English documents.",
            features: [
              "Thesis and dissertation",
              "Academic journals",
              "Business documents",
              "Articles and content",
            ],
            pricing: "Starting from IDR 30,000/page",
            turnaround: "1-2 working days",
          },
        ],
      },
      process: {
        title: "Process",
        subtitle: "Service Process",
        description: "Here is the service process you will experience.",
        steps: [
          {
            name: "Submit Document",
            description:
              "Submit the document you want to translate or check through the registration form.",
          },
          {
            name: "Review & Quotation",
            description:
              "Our team will review the document and provide a price quote.",
          },
          {
            name: "Confirmation & Payment",
            description:
              "After confirmation, make payment according to the given quote.",
          },
          {
            name: "Process",
            description:
              "Our team will process the document according to the selected service.",
          },
          {
            name: "Review & Revision",
            description: "The document will be reviewed and revised if needed.",
          },
          {
            name: "Result Delivery",
            description:
              "The completed document will be delivered according to the agreed time.",
          },
        ],
      },
    },
  },
  id: {
    navigation: {
      home: "Beranda",
      about: "Tentang Kami",
      programs: "Program & Kegiatan",
      registration: "Pendaftaran",
      services: "Layanan",
      content: "Konten",
      media: "Media",
    },
    common: {
      openMenu: "Buka menu utama",
      closeMenu: "Tutup menu",
    },
    navbar: {
      home: "Beranda",
      about: "Tentang Kami",
      programs: "Program",
      registration: "Pendaftaran",
      contact: "Kontak",
      language: "Bahasa",
    },
    home: {
      hero: {
        title: "Student-English Forum",
        subtitle: "Unsoed 2025",
        institution: "UNSOED",
        place: "Purwokerto",
        description:
          "Platform untuk mengembangkan kemampuan berbahasa Inggris dan keterampilan kepemimpinan mahasiswa Universitas Jenderal Soedirman.",
        registerButton: "Daftar Sekarang",
        learnMore: "Pelajari Lebih Lanjut",
      },
      features: {
        title: "Program Unggulan",
        subtitle: "Berbagai Program untuk Pengembangan Diri",
        description:
          "SEF UNSOED menyediakan berbagai program untuk membantu mahasiswa mengembangkan kemampuan bahasa Inggris dan kepemimpinan mereka.",
        nudc: {
          title: "Program NUDC/KDMI",
          description:
            "Program persiapan untuk kompetisi debat bahasa Inggris tingkat nasional dan internasional.",
        },
        toefl: {
          title: "TOEFL/UEPT Preparation",
          description:
            "Program persiapan untuk tes TOEFL dan UEPT dengan materi yang terstruktur dan simulasi tes.",
        },
        translation: {
          title: "Translation & Proofreading",
          description:
            "Layanan penerjemahan dan proofreading untuk dokumen akademik dan non-akademik.",
        },
      },
      cta: {
        title: "Bergabunglah dengan SEF UNSOED",
        description:
          "Jadilah bagian dari komunitas yang berfokus pada pengembangan kemampuan bahasa Inggris dan kepemimpinan.",
        registerButton: "Daftar Sekarang",
        learnMore: "Pelajari Lebih Lanjut",
      },
    },
    content: {
      hero: {
        title: "Konten Edukasi",
        description:
          "Temukan berbagai konten edukasi untuk meningkatkan kemampuan bahasa Inggris Anda.",
      },
      articles: {
        title: "Artikel",
        subtitle: "Artikel Edukasi",
        description:
          "Artikel-artikel yang dapat membantu Anda dalam belajar bahasa Inggris.",
        readMore: "Baca Selengkapnya",
        items: [
          {
            id: 1,
            title: "Tips Meningkatkan Kemampuan Speaking",
            description:
              "Panduan praktis untuk meningkatkan kemampuan berbicara bahasa Inggris Anda.",
            author: "John Doe",
            date: "15 Maret 2024",
            readTime: "5 menit baca",
            category: "Edukasi",
          },
          {
            id: 2,
            title: "Strategi Menulis Essay yang Efektif",
            description:
              "Belajar teknik menulis essay yang baik dan benar dalam bahasa Inggris.",
            author: "Jane Smith",
            date: "10 Maret 2024",
            readTime: "7 menit baca",
            category: "Edukasi",
          },
          {
            id: 3,
            title: "Grammar Tips: Present Perfect Tense",
            description:
              "Panduan lengkap penggunaan Present Perfect Tense dalam bahasa Inggris.",
            author: "Mike Johnson",
            date: "5 Maret 2024",
            readTime: "6 menit baca",
            category: "Edukasi",
          },
        ],
      },
      newsletter: {
        title: "Buletin",
        subtitle: "Tetap Terhubung",
        description:
          "Dapatkan update terbaru tentang program dan kegiatan SEF UNSOED.",
        readMore: "Baca Selengkapnya",
        items: [
          {
            id: 1,
            title: "SEF Newsletter #1",
            description:
              "Update terbaru tentang program dan kegiatan SEF UNSOED.",
            date: "1 Maret 2024",
          },
          {
            id: 2,
            title: "SEF Newsletter #2",
            description: "Tips dan trik belajar bahasa Inggris dari para ahli.",
            date: "15 Februari 2024",
          },
          {
            id: 3,
            title: "SEF Newsletter #3",
            description: "Kisah sukses dari alumni SEF UNSOED.",
            date: "1 Februari 2024",
          },
        ],
      },
      specialDays: {
        title: "Peringatan Hari",
        subtitle: "Artikel Peringatan Hari",
        description:
          "Artikel-artikel yang berkaitan dengan hari-hari penting dalam dunia bahasa dan pendidikan.",
        readMore: "Baca Selengkapnya",
        items: [
          {
            id: 1,
            title: "Hari Bahasa Ibu Internasional",
            description:
              "Mengenal pentingnya bahasa ibu dan keragaman bahasa di dunia.",
            date: "21 Februari 2024",
          },
          {
            id: 2,
            title: "Hari Puisi Sedunia",
            description: "Merayakan keindahan puisi dalam berbagai bahasa.",
            date: "21 Maret 2024",
          },
          {
            id: 3,
            title: "Hari Literasi Internasional",
            description: "Pentingnya literasi dalam pengembangan masyarakat.",
            date: "8 September 2024",
          },
        ],
      },
      podcast: {
        title: "Podcast",
        subtitle: "Dengarkan & Belajar",
        description:
          "Dengarkan podcast kami untuk tips dan trik belajar bahasa Inggris.",
        duration: "Durasi",
        listen: "Dengarkan Sekarang",
        items: [
          {
            id: 1,
            title: "Episode 1: Tips Belajar Bahasa Inggris",
            description:
              "Diskusi tentang metode efektif belajar bahasa Inggris.",
            duration: "15:30",
            date: "1 Maret 2024",
          },
          {
            id: 2,
            title: "Episode 2: Public Speaking Skills",
            description:
              "Cara meningkatkan kemampuan public speaking dalam bahasa Inggris.",
            duration: "20:15",
            date: "15 Februari 2024",
          },
          {
            id: 3,
            title: "Episode 3: TOEFL Preparation",
            description: "Strategi persiapan TOEFL yang efektif.",
            duration: "18:45",
            date: "1 Februari 2024",
          },
        ],
      },
      notFound: {
        title: "Halaman Tidak Ditemukan",
        description: "Maaf, kami tidak dapat menemukan halaman yang Anda cari.",
        backToHome: "Kembali ke Beranda",
      },
    },
    footer: {
      navigation: {
        about: "Tentang Kami",
        programs: "Program & Kegiatan",
        registration: "Pendaftaran",
        services: "Layanan",
        content: "Konten",
        media: "Media",
      },
      social: {
        instagram: "Instagram",
        twitter: "Twitter",
        linkedin: "LinkedIn",
        youtube: "YouTube",
      },
      copyright: "Hak Cipta Dilindungi.",
      address: {
        line1:
          "Jl. Prof. Dr. HR Boenyamin No.708, Grendeng, Kec. Purwokerto Utara",
        line2: "Kabupaten Banyumas, Jawa Tengah 53122",
        email: "Email: sef@unsoed.ac.id",
        phone: "Telp: (0281) 638491",
      },
    },
    registration: {
      title: "Pendaftaran",
      description:
        "Pilih program yang sesuai dengan kebutuhan Anda dan daftar sekarang.",
      registerButton: "Daftar Sekarang",
      learnMore: "Pelajari Lebih Lanjut",
      requirements: {
        title: "Persyaratan",
        subtitle: "Persyaratan Umum",
        description:
          "Berikut adalah persyaratan umum yang harus dipenuhi untuk mendaftar di program SEF UNSOED.",
        items: [
          "Mahasiswa aktif UNSOED",
          "Memiliki minat dalam pengembangan bahasa Inggris",
          "Bersedia mengikuti program secara aktif",
        ],
      },
      options: {
        nudc: {
          name: "NUDC/KDMI",
          description:
            "Pendaftaran untuk program persiapan kompetisi debat nasional dan internasional.",
          status: "Buka",
        },
        webinar: {
          name: "Webinar",
          description:
            "Pendaftaran untuk berbagai webinar bahasa Inggris dan pengembangan diri.",
          status: "Buka",
        },
        toefl: {
          name: "TOEFL/UEPT",
          description: "Pendaftaran untuk program persiapan TOEFL dan UEPT.",
          status: "Buka",
        },
        committee: {
          name: "Panitia",
          description:
            "Pendaftaran untuk menjadi panitia di berbagai acara SEF UNSOED.",
          status: "Buka",
        },
        member: {
          name: "Anggota SEF",
          description: "Pendaftaran untuk menjadi anggota SEF UNSOED.",
          status: "Buka",
        },
      },
    },
    registrationForm: {
      title: "Formulir Pendaftaran",
      description:
        "Silakan isi formulir di bawah ini untuk mendaftar program kami.",
      name: "Nama Lengkap",
      studentId: "NIM",
      faculty: "Fakultas",
      major: "Jurusan",
      email: "Email",
      phone: "Nomor Telepon",
      program: "Program",
      selectProgram: "Pilih program",
      programs: {
        nudc: "Program NUDC/KDMI",
        toefl: "Persiapan TOEFL/UEPT",
        translation: "Penerjemahan & Proofreading",
      },
      motivation: "Surat Motivasi",
      submitButton: "Kirim Pendaftaran",
    },
    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Maaf, kami tidak dapat menemukan halaman yang Anda cari.",
      backToHome: "Kembali ke Beranda",
    },
    about: {
      hero: {
        title: "Tentang SEF UNSOED",
        description:
          "Mengembangkan kemampuan bahasa Inggris dan kepemimpinan mahasiswa UNSOED.",
      },
      programKerja: {
        title: "Program Kerja",
        subtitle: "Program & Kegiatan",
        description:
          "Berbagai program dan kegiatan yang tersedia di SEF UNSOED.",
        sections: {
          pembelajaran: {
            title: "Program Pembelajaran",
            items: [
              "Persiapan NUDC/KDMI",
              "Persiapan TOEFL/UEPT",
              "English Conversation Club",
              "Workshop Menulis",
            ],
          },
          pengembangan: {
            title: "Program Pengembangan",
            items: [
              "Pelatihan Kepemimpinan",
              "Workshop Public Speaking",
              "Kompetisi Debat",
              "English Camp",
            ],
          },
          layanan: {
            title: "Program Layanan",
            items: [
              "Layanan Penerjemahan",
              "Layanan Proofreading",
              "Konsultasi Bahasa Inggris",
              "Mock Interview",
            ],
          },
        },
      },
      faq: {
        title: "FAQ",
        subtitle: "Pertanyaan Umum",
        description:
          "Temukan jawaban untuk pertanyaan yang sering diajukan tentang SEF UNSOED.",
        items: [
          {
            question: "Apa itu SEF UNSOED?",
            answer:
              "SEF UNSOED adalah forum mahasiswa yang fokus pada pengembangan kemampuan bahasa Inggris dan kepemimpinan mahasiswa UNSOED.",
          },
          {
            question: "Bagaimana cara bergabung dengan SEF UNSOED?",
            answer:
              "Anda dapat bergabung dengan mengikuti proses pendaftaran yang diadakan setiap semester. Informasi pendaftaran dapat dilihat di halaman Pendaftaran.",
          },
          {
            question: "Program apa saja yang tersedia di SEF UNSOED?",
            answer:
              "SEF UNSOED menyediakan berbagai program seperti persiapan NUDC/KDMI, TOEFL/UEPT, dan layanan penerjemahan & proofreading.",
          },
          {
            question: "Apakah ada biaya untuk bergabung?",
            answer:
              "Ya, ada biaya keanggotaan yang digunakan untuk mendukung kegiatan dan program SEF UNSOED. Informasi detail dapat dilihat saat pendaftaran.",
          },
        ],
      },
      contact: {
        title: "Kontak",
        subtitle: "Hubungi Kami",
        description:
          "Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan.",
        address: {
          title: "Alamat",
          content: [
            "Gedung Student Center UNSOED",
            "Jl. Dr. Soeparno No. 60",
            "Purwokerto, Jawa Tengah 53122",
          ],
        },
        contactInfo: {
          title: "Kontak",
          content: ["Email: sef@unsoed.ac.id", "Telepon: (0281) 638795"],
        },
      },
      organizationStructure: {
        title: "Tim Kami",
        subtitle: "Struktur Organisasi",
        description:
          "Kenali tim dedikasi di balik SEF UNSOED yang bekerja sama untuk memberikan program dan layanan terbaik.",
        departments: {
          leadership: "Kepemimpinan",
          talentDebate: "Departemen Talent & Debat",
          researchDevelopment: "Departemen Penelitian & Pengembangan",
          publicRelations: "Departemen Hubungan Masyarakat",
          education: "Departemen Pendidikan",
        },
        roles: {
          president: "Ketua",
          vicePresident: "Wakil Ketua",
          secretary: "Sekretaris",
          treasurer: "Bendahara",
          coordinator: "Koordinator",
          staff: "Staf",
        },
        majorNames: {
          internationalRelations: "Hubungan Internasional",
          law: "Hukum",
          englishLiterature: "Sastra Inggris",
          publicAdministration: "Administrasi Publik",
          sociology: "Sosiologi",
          foodTechnology: "Teknologi Pangan",
          englishDiplomaProgram: "Program Diploma Bahasa Inggris",
          englishEducation: "Pendidikan Bahasa Inggris",
          accounting: "Akuntansi",
          communicationScience: "Ilmu Komunikasi",
          agrotechnology: "Agroteknologi",
          physics: "Fisika",
        },
      },
    },
    programs: {
      hero: {
        title: "Program & Kegiatan",
        description:
          "Temukan berbagai program dan kegiatan yang tersedia di SEF UNSOED.",
      },
      events: {
        title: "Events",
        subtitle: "Kegiatan Mendatang",
        description:
          "Berbagai kegiatan yang akan segera dilaksanakan oleh SEF UNSOED.",
        locationLabel: "Lokasi",
        items: [
          {
            title: "Pelatihan NUDC",
            description:
              "Pelatihan persiapan National University Debating Championship.",
            date: "15 Maret 2024",
            location: "Gedung Student Center",
            status: "Akan Datang",
          },
          {
            title: "Workshop TOEFL",
            description: "Workshop persiapan TOEFL untuk mahasiswa UNSOED.",
            date: "20 Maret 2024",
            location: "Ruang Seminar FISIP",
            status: "Akan Datang",
          },
          {
            title: "English Camp",
            description:
              "Program immersive learning bahasa Inggris selama 3 hari.",
            date: "25 Maret 2024",
            location: "Kampus UNSOED",
            status: "Akan Datang",
          },
        ],
      },
      achievements: {
        title: "Prestasi",
        subtitle: "Prestasi Terbaru",
        description: "Pencapaian-pencapaian terbaru dari SEF UNSOED.",
        items: [
          {
            title: "Juara 1 NUDC Regional",
            description:
              "Tim debat SEF UNSOED berhasil meraih juara pertama di kompetisi regional.",
            date: "10 Februari 2024",
          },
          {
            title: "Tingkat Keberhasilan TOEFL 95%",
            description:
              "95% peserta program TOEFL berhasil mencapai skor target.",
            date: "5 Februari 2024",
          },
          {
            title: "Penghargaan English Club Terbaik",
            description:
              "SEF UNSOED meraih penghargaan sebagai English Club terbaik se-Jawa Tengah.",
            date: "1 Februari 2024",
          },
        ],
      },
      sponsors: {
        title: "Sponsor",
        subtitle: "Partner Strategis",
        description:
          "Partner strategis yang mendukung program dan kegiatan SEF UNSOED.",
        items: [
          {
            name: "British Council",
            description: "Partner dalam pengembangan program bahasa Inggris.",
          },
          {
            name: "IDP Education",
            description: "Partner dalam program TOEFL dan IELTS.",
          },
          {
            name: "Cambridge Assessment",
            description: "Partner dalam pengembangan materi pembelajaran.",
          },
        ],
      },
    },
    services: {
      hero: {
        title: "Layanan Kami",
        description:
          "SEF UNSOED menyediakan layanan penerjemahan dan proofreading berkualitas untuk memenuhi kebutuhan Anda.",
      },
      services: {
        title: "Layanan",
        subtitle: "Layanan yang Tersedia",
        description: "Pilih layanan yang sesuai dengan kebutuhan Anda.",
        items: [
          {
            name: "Layanan Penerjemahan",
            description:
              "Layanan penerjemahan dokumen dari Bahasa Indonesia ke Bahasa Inggris dan sebaliknya.",
            features: [
              "Dokumen akademik",
              "Dokumen bisnis",
              "Dokumen legal",
              "Artikel dan konten",
            ],
            pricing: "Mulai dari Rp 50.000/halaman",
            turnaround: "2-3 hari kerja",
          },
          {
            name: "Layanan Proofreading",
            description:
              "Layanan pengecekan dan perbaikan tata bahasa, ejaan, dan format dokumen dalam Bahasa Inggris.",
            features: [
              "Tesis dan skripsi",
              "Jurnal akademik",
              "Dokumen bisnis",
              "Artikel dan konten",
            ],
            pricing: "Mulai dari Rp 30.000/halaman",
            turnaround: "1-2 hari kerja",
          },
        ],
      },
      process: {
        title: "Proses",
        subtitle: "Proses Layanan",
        description: "Berikut adalah proses layanan yang akan Anda alami.",
        steps: [
          {
            name: "Submit Dokumen",
            description:
              "Kirimkan dokumen yang ingin diterjemahkan atau diperiksa melalui form pendaftaran.",
          },
          {
            name: "Review & Quotation",
            description:
              "Tim kami akan mereview dokumen dan memberikan penawaran harga.",
          },
          {
            name: "Konfirmasi & Pembayaran",
            description:
              "Setelah konfirmasi, lakukan pembayaran sesuai dengan penawaran yang diberikan.",
          },
          {
            name: "Proses",
            description:
              "Tim kami akan memproses dokumen sesuai dengan layanan yang dipilih.",
          },
          {
            name: "Review & Revisi",
            description: "Dokumen akan direview dan direvisi jika diperlukan.",
          },
          {
            name: "Pengiriman Hasil",
            description:
              "Dokumen yang sudah selesai akan dikirimkan sesuai dengan waktu yang disepakati.",
          },
        ],
      },
    },
  },
}
