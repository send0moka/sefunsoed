'use client'

import React from 'react'
import { Check, BookOpen, Globe, Award, Users, Target, Star } from 'lucide-react'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

// Icon mapping untuk mengkonversi string ke komponen icon
const iconMap = {
  BookOpen,
  Globe,
  Award,
  Users,
  Target,
  Star,
} as const

type IconName = keyof typeof iconMap

type PlanLayoutProps = {
  title?: string
  subtitle?: SerializedEditorState | string
  plans?: Array<{
    title: string
    description: string
    price: number
    duration?: string
    icon?: string
    features?: Array<{
      feature: string
      id?: string
    }>
    isPopular?: boolean
    buttonText?: string
    buttonLink?: string
    id?: string
  }>
}

const PlanLayoutComponent: React.FC<PlanLayoutProps> = ({ title, subtitle, plans = [] }) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return BookOpen
    return iconMap[iconName as IconName] || BookOpen
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          )}
          {subtitle && (
            <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {typeof subtitle === 'string' ? (
                <p>{subtitle}</p>
              ) : (
                <RichText data={subtitle} enableGutter={false} />
              )}
            </div>
          )}
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const IconComponent = getIcon(plan.icon)
          const isPopular = plan.isPopular

          return (
            <div
              key={plan.id || index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                isPopular
                  ? 'border-2 border-blue-500'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute top-0 left-0 right-0 z-10">
                  <div className="bg-blue-500 text-white text-sm font-semibold py-2 px-4">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className={`p-8 ${isPopular ? 'pt-16' : ''}`}>
                {/* Icon with Gradient Background */}
                <div className="flex mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Plan Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {plan.title}
                </h3>

                {/* Plan Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features List */}
                {plan.features && plan.features.length > 0 && (
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={feature.id || featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5 mr-3">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {feature.feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price Section */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(plan.price)}
                  </div>
                  {plan.duration && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {plan.duration}
                    </div>
                  )}
                </div>

                {/* Register Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      if (plan.buttonLink) {
                        window.open(plan.buttonLink, '_blank')
                      }
                    }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                        : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {plan.buttonText || 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No plans configured yet.</p>
        </div>
      )}
    </div>
  )
}

export default PlanLayoutComponent
