import RegistrationFormComponent from '@/blocks/RegistrationForm/Component'

export default function RegistrationFormDemo() {
  const samplePrograms = [
    {
      programId: 'program-1',
      title: 'Full-Stack Web Development',
      description:
        'Learn to build complete web applications from front-end to back-end. Master modern technologies including React, Node.js, databases, and deployment strategies. Perfect for beginners who want to become professional web developers.',
      price: 15000000,
      duration: '6 months',
      isAvailable: true,
    },
    {
      programId: 'program-2',
      title: 'Mobile App Development',
      description:
        'Create native and cross-platform mobile applications for iOS and Android. Covers React Native, Flutter, UI/UX design principles, and app store deployment. Ideal for those interested in mobile technology.',
      price: 18000000,
      duration: '8 months',
      isAvailable: true,
    },
    {
      programId: 'program-3',
      title: 'Data Science & Analytics',
      description:
        'Master data analysis, machine learning, and statistical modeling. Learn Python, R, SQL, data visualization, and advanced analytics techniques. Great for those pursuing careers in data science.',
      price: 20000000,
      duration: '10 months',
      isAvailable: false,
    },
  ]

  const personalInfoFields = [
    {
      fieldName: 'firstName',
      label: 'First Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter your first name',
    },
    {
      fieldName: 'lastName',
      label: 'Last Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter your last name',
    },
    {
      fieldName: 'email',
      label: 'Email Address',
      type: 'email' as const,
      required: true,
      placeholder: 'your.email@example.com',
    },
    {
      fieldName: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      required: true,
      placeholder: '+62 xxx-xxxx-xxxx',
    },
    {
      fieldName: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date' as const,
      required: false,
    },
    {
      fieldName: 'education',
      label: 'Education Level',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'High School', value: 'high-school' },
        { label: 'Bachelor Degree', value: 'bachelor' },
        { label: 'Master Degree', value: 'master' },
        { label: 'PhD', value: 'phd' },
      ],
    },
    {
      fieldName: 'experience',
      label: 'Programming Experience',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Complete Beginner', value: 'beginner' },
        { label: 'Some Experience (1-2 years)', value: 'intermediate' },
        { label: 'Experienced (3+ years)', value: 'advanced' },
      ],
    },
    {
      fieldName: 'motivation',
      label: 'Why do you want to join this program?',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Tell us about your goals and motivation...',
    },
    {
      fieldName: 'address',
      label: 'Address',
      type: 'textarea' as const,
      required: false,
      placeholder: 'Your complete address',
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Registration Form Demo</h1>
        <p className="text-lg text-gray-600">
          Complex multi-step registration form with program selection (accordion layout), personal
          information form (grid layout), and review summary with stepper navigation.
        </p>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Features Demonstrated:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <strong>Step 1:</strong> Program selection with accordion panels showing detailed
              descriptions
            </li>
            <li>
              • <strong>Step 2:</strong> Multi-field personal information form with validation
            </li>
            <li>
              • <strong>Step 3:</strong> Review summary with terms acceptance and final submission
            </li>
            <li>• Progress stepper, form validation, responsive design, and loading states</li>
          </ul>
        </div>
      </div>

      <RegistrationFormComponent
        title="Program Registration 2024"
        programs={samplePrograms}
        personalFields={personalInfoFields}
        submitButtonText="Complete Registration"
      />
    </div>
  )
}
