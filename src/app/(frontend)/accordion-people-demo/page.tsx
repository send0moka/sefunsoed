import { AccordionPeopleBlock } from '@/blocks/AccordionPeopleBlock/Component'

export default function AccordionPeopleDemoPage() {
  const demoSections = [
    {
      id: 'section-1',
      title: 'Executive Board',
      subtitle: 'Leadership & Vision',
      description:
        'Meet our executive board members who lead SEF UNSOED with dedication, vision, and commitment to excellence in English education.',
      image: '/media/image-hero1.webp',
      people: [
        {
          id: 'person-1',
          name: 'Ahmad Rizki Pratama',
          position: 'President',
          major: 'Informatics',
          year: '22',
          photo: '/media/3f8fc3122181811.60d459971b6a2.jpg',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/ahmadrizkipratama',
            instagram: 'https://instagram.com/rizki.pratama',
          },
        },
        {
          id: 'person-2',
          name: 'Sari Indah Lestari',
          position: 'Vice President',
          major: 'English Literature',
          year: '21',
          photo: '/media/image-post1.webp',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/sariindahlestari',
            instagram: 'https://instagram.com/sari.indah',
          },
        },
        {
          id: 'person-3',
          name: 'Budi Santoso',
          position: 'Secretary General',
          major: 'Management',
          year: '22',
          photo: '/media/ecc3.png',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/budisantoso',
          },
        },
        {
          id: 'person-4',
          name: 'Maya Putri Sari',
          position: 'Treasurer',
          major: 'Accounting',
          year: '21',
          photo: '/media/image-hero1-300x169.webp',
          socialMedia: {
            instagram: 'https://instagram.com/maya.putri',
          },
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Academic Team',
      subtitle: 'Excellence in Education',
      description:
        'Our academic coordinators ensure the highest quality of English language programs, from IELTS and TOEFL preparation to conversation classes.',
      image: '/media/image-post2.webp',
      people: [
        {
          id: 'person-5',
          name: 'Lisa Putri Maharani',
          position: 'IELTS Coordinator',
          major: 'Psychology',
          year: '21',
          photo: '/media/3f8fc3122181811.60d459971b6a2-300x300.jpg',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/lisaputri',
            instagram: 'https://instagram.com/lisa.maharani',
          },
        },
        {
          id: 'person-6',
          name: 'Andi Wijaya Rahman',
          position: 'TOEFL Coordinator',
          major: 'Economics',
          year: '20',
          photo: '/media/image-post1-1200x630.webp',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/andiwijaya',
          },
        },
        {
          id: 'person-7',
          name: 'Dewi Sartika',
          position: 'Conversation Class Lead',
          major: 'Communication',
          year: '21',
          photo: '/media/3f8fc3122181811.60d459971b6a2-500x500.jpg',
          socialMedia: {
            instagram: 'https://instagram.com/dewi.sartika',
          },
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Tutoring Team',
      subtitle: 'Personalized Learning',
      description:
        'Our experienced tutors provide one-on-one guidance and support to help students achieve their English proficiency goals through personalized learning approaches.',
      image: '/media/close-up-yellow-lighting-equipment-against-black-background.jpg',
      people: [
        {
          id: 'person-8',
          name: 'Maya Sari Indah',
          position: 'Senior Writing Tutor',
          major: 'Linguistics',
          year: '19',
          photo: '/media/image-hero1-600x338.webp',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/mayasari',
            instagram: 'https://instagram.com/maya.sari',
          },
        },
        {
          id: 'person-9',
          name: 'Dani Rahman Hakim',
          position: 'Speaking Tutor',
          major: 'English Education',
          year: '20',
          photo: '/media/image-hero1-900x506.webp',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/danirahman',
          },
        },
        {
          id: 'person-10',
          name: 'Fitri Lestari Putri',
          position: 'Grammar Specialist',
          major: 'Literature',
          year: '20',
          photo: '/media/3f8fc3122181811.60d459971b6a2.jpg',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/fitrilestari',
            instagram: 'https://instagram.com/fitri.lestari',
          },
        },
        {
          id: 'person-11',
          name: 'Riko Pratama',
          position: 'Reading Comprehension Tutor',
          major: 'International Relations',
          year: '21',
          photo: '/media/ecc3.png',
          socialMedia: {
            instagram: 'https://instagram.com/riko.pratama',
          },
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="py-16">
        <div className="container text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Accordion People Block Demo
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Interactive accordion with team profiles, social media integration, and hover effects
          </p>
        </div>

        <AccordionPeopleBlock
          id="demo-accordion-people"
          title="Meet Our Amazing Team"
          sections={demoSections}
        />
      </div>
    </div>
  )
}
