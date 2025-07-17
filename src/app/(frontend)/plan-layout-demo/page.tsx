import React from 'react'
import PlanLayoutComponent from '@/blocks/PlanLayout/Component'

const PlanLayoutDemo = () => {
  const sampleData = {
    title: 'Choose Your SEF Plan',
    subtitle:
      'Select the perfect plan that fits your goals and budget. All plans include our comprehensive support system.',
    plans: [
      {
        id: '1',
        title: 'Basic Plan',
        description: 'Perfect for beginners who want to get started with SEF programs.',
        price: 500000,
        duration: 'per month',
        icon: 'BookOpen',
        features: [
          { feature: 'Access to basic courses', id: '1' },
          { feature: 'Monthly webinars', id: '2' },
          { feature: 'Email support', id: '3' },
          { feature: 'Certificate of completion', id: '4' },
        ],
        isPopular: false,
        buttonText: 'Get Started',
        buttonLink: '/registration',
      },
      {
        id: '2',
        title: 'Professional Plan',
        description:
          'Ideal for professionals seeking advanced skills and networking opportunities.',
        price: 1500000,
        duration: 'per month',
        icon: 'Globe',
        features: [
          { feature: 'Access to all courses', id: '1' },
          { feature: 'Weekly interactive sessions', id: '2' },
          { feature: 'Priority support', id: '3' },
          { feature: 'Networking events', id: '4' },
          { feature: 'Career guidance', id: '5' },
          { feature: 'Industry certification', id: '6' },
        ],
        isPopular: true,
        buttonText: 'Join Professional',
        buttonLink: '/registration',
      },
      {
        id: '3',
        title: 'Enterprise Plan',
        description:
          'Comprehensive solution for organizations and teams looking for custom programs.',
        price: 5000000,
        duration: 'per month',
        icon: 'Award',
        features: [
          { feature: 'Custom curriculum', id: '1' },
          { feature: 'Dedicated account manager', id: '2' },
          { feature: '24/7 support', id: '3' },
          { feature: 'Team collaboration tools', id: '4' },
          { feature: 'Analytics dashboard', id: '5' },
          { feature: 'API access', id: '6' },
          { feature: 'White-label options', id: '7' },
        ],
        isPopular: false,
        buttonText: 'Contact Sales',
        buttonLink: '/contact',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Plan Layout Demo
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              This is a demonstration of the PlanLayout component with sample data
            </p>
          </div>

          <PlanLayoutComponent {...sampleData} />
        </div>
      </div>
    </div>
  )
}

export default PlanLayoutDemo
