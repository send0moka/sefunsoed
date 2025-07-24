'use client'

import React, { useState } from 'react'
import {
  Check,
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { getClientSideURL } from '@/utilities/getURL'
import RegistrationFormDebugger from '@/components/RegistrationFormDebugger'

// Faculty and Major data
const FACULTY_MAJOR_DATA = {
  'fakultas-pertanian': {
    label: 'Fakultas Pertanian',
    majors: [
      { value: 'd3-agrobisnis', label: 'D3 Agrobisnis' },
      { value: 'd3-ilmu-tanah', label: 'D3 Ilmu Tanah' },
      { value: 'teknik-pertanian', label: 'Teknik Pertanian' },
      { value: 'teknologi-pangan', label: 'Teknologi Pangan' },
      { value: 'agribisnis', label: 'Agribisnis' },
      { value: 'agroteknologi', label: 'Agroteknologi' },
    ],
  },
  'fakultas-biologi': {
    label: 'Fakultas Biologi',
    majors: [
      { value: 'd3-biologi', label: 'D3 Biologi' },
      { value: 'biologi', label: 'Biologi' },
    ],
  },
  'fakultas-ekonomi-dan-bisnis': {
    label: 'Fakultas Ekonomi dan Bisnis',
    majors: [
      { value: 'd3-administrasi-perkantoran', label: 'D3 Administrasi Perkantoran' },
      { value: 'd3-administrasi-bisnis', label: 'D3 Administrasi Bisnis' },
      { value: 'd3-akuntansi', label: 'D3 Akuntansi' },
      { value: 'd3-bisnis-internasional', label: 'D3 Bisnis Internasional' },
      { value: 'akuntansi', label: 'Akuntansi' },
      { value: 'manajemen', label: 'Manajemen' },
      { value: 'pendidikan-ekonomi', label: 'Pendidikan Ekonomi' },
      { value: 'ekonomi-pembangunan', label: 'Ekonomi Pembangunan' },
    ],
  },
  'fakultas-peternakan': {
    label: 'Fakultas Peternakan',
    majors: [
      { value: 'd3-budidaya-ternak', label: 'D3 Budidaya Ternak' },
      { value: 'peternakan', label: 'Peternakan' },
    ],
  },
  'fakultas-hukum': {
    label: 'Fakultas Hukum',
    majors: [{ value: 'ilmu-hukum', label: 'Ilmu Hukum' }],
  },
  'fakultas-fisip': {
    label: 'Fakultas Ilmu Sosial dan Ilmu Politik',
    majors: [
      { value: 'ilmu-komunikasi', label: 'Ilmu Komunikasi' },
      { value: 'sosiologi', label: 'Sosiologi' },
      { value: 'ilmu-politik', label: 'Ilmu Politik' },
      { value: 'hubungan-internasional', label: 'Hubungan Internasional' },
      { value: 'administrasi-publik', label: 'Administrasi Publik' },
    ],
  },
  'fakultas-kedokteran': {
    label: 'Fakultas Kedokteran',
    majors: [
      { value: 'kedokteran-umum', label: 'Kedokteran Umum' },
      { value: 'kedokteran-gigi', label: 'Kedokteran Gigi' },
    ],
  },
  'fakultas-teknik': {
    label: 'Fakultas Teknik',
    majors: [
      { value: 'informatika', label: 'Informatika' },
      { value: 'teknik-komputer', label: 'Teknik Komputer' },
      { value: 'teknik-sipil', label: 'Teknik Sipil' },
      { value: 'teknik-geologi', label: 'Teknik Geologi' },
      { value: 'teknik-elektro', label: 'Teknik Elektro' },
      { value: 'teknik-industri', label: 'Teknik Industri' },
      { value: 'teknik-mesin', label: 'Teknik Mesin' },
    ],
  },
  'fakultas-perikanan': {
    label: 'Fakultas Perikanan dan Ilmu Kelautan',
    majors: [
      { value: 'budidaya-perairan', label: 'Budidaya Perairan' },
      { value: 'ilmu-kelautan', label: 'Ilmu Kelautan' },
      { value: 'manajemen-sumberdaya-perairan', label: 'Manajemen Sumberdaya Perairan' },
    ],
  },
  'fakultas-mipa': {
    label: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    majors: [
      { value: 'matematika', label: 'Matematika' },
      { value: 'fisika', label: 'Fisika' },
      { value: 'kimia', label: 'Kimia' },
    ],
  },
  'fakultas-ilmu-kesehatan': {
    label: 'Fakultas Ilmu-Ilmu Kesehatan',
    majors: [
      { value: 'ilmu-gizi', label: 'Ilmu Gizi' },
      { value: 'keperawatan', label: 'Keperawatan' },
      { value: 'farmasi', label: 'Farmasi' },
      { value: 'kesehatan-masyarakat', label: 'Kesehatan Masyarakat' },
      { value: 'pendidikan-jasmani', label: 'Pendidikan Jasmani' },
    ],
  },
  'fakultas-ilmu-budaya': {
    label: 'Fakultas Ilmu Budaya',
    majors: [
      { value: 'd3-bahasa-mandarin', label: 'D3 Bahasa Mandarin' },
      { value: 'd3-bahasa-inggris', label: 'D3 Bahasa Inggris' },
      { value: 'sastra-jepang', label: 'Sastra Jepang' },
      { value: 'pendidikan-bahasa-inggris', label: 'Pendidikan Bahasa Inggris' },
      { value: 'pendidikan-bahasa-indonesia', label: 'Pendidikan Bahasa Indonesia' },
      { value: 'sastra-inggris', label: 'Sastra Inggris' },
      { value: 'sastra-indonesia', label: 'Sastra Indonesia' },
    ],
  },
} as const

type RegistrationFormProps = {
  title?: string
  formId?: number // Add formId prop to connect with form-builder
  programs?: Array<{
    programId: string
    title: string
    description?: string
    price?: number
    duration?: string
    isAvailable?: boolean
  }>
  personalFields?: Array<{
    fieldName: string
    label: string
    type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select' | 'faculty' | 'major'
    required?: boolean
    placeholder?: string
    selectOptions?: string
  }>
  submitButtonText?: string
}

type FormData = {
  selectedProgram?: string
  personalInfo: Record<string, string | number>
  agreeToTerms: boolean
}

const RegistrationFormComponent: React.FC<RegistrationFormProps> = ({
  title = 'Registration Form',
  formId, // Remove default value, make it optional
  programs = [],
  personalFields = [],
  submitButtonText = 'Submit Registration',
}) => {
  // Helper function to parse select options from JSON string
  const parseSelectOptions = (selectOptions?: string): Array<{ label: string; value: string }> => {
    if (!selectOptions) return []
    try {
      const parsed = JSON.parse(selectOptions)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  // Debug logging to see what data we receive from CMS
  // console.log('RegistrationForm received programs:', programs)

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {},
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const steps = [
    { id: 1, title: 'Select Program', icon: FileText },
    { id: 2, title: 'Personal Information', icon: User },
    { id: 3, title: 'Review & Submit', icon: Send },
  ]

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedProgram !== undefined
      case 2:
        const requiredFields = personalFields.filter((field) => field.required)
        return requiredFields.every((field) => {
          const value = formData.personalInfo[field.fieldName]
          return value !== undefined && value !== ''
        })
      case 3:
        return formData.agreeToTerms
      default:
        return true
    }
  }

  const handleNext = () => {
    if (canProceedToNext()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const canSubmit = () => {
    return (
      formData.selectedProgram &&
      formData.agreeToTerms &&
      personalFields
        .filter((field) => field.required)
        .every((field) => {
          const value = formData.personalInfo[field.fieldName]
          return value !== undefined && value !== ''
        })
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Prepare submission data in the format expected by form-submissions API
      const submissionData = []

      // Add selected program to submission data
      if (formData.selectedProgram) {
        const selectedProgram = programs.find((p) => p.programId === formData.selectedProgram)
        submissionData.push({
          field: 'selectedProgram',
          value: selectedProgram
            ? `${selectedProgram.title} (ID: ${selectedProgram.programId})`
            : formData.selectedProgram,
        })
      }

      // Add personal information to submission data
      personalFields.forEach((field) => {
        const value = formData.personalInfo[field.fieldName]
        if (value !== undefined && value !== '') {
          let displayValue = String(value)

          // For select fields, show the label instead of value
          if (field.type === 'select') {
            const options = parseSelectOptions(field.selectOptions)
            const selectedOption = options.find((opt) => opt.value === value)
            displayValue = selectedOption ? selectedOption.label : String(value)
          }

          submissionData.push({
            field: field.label, // Use label as field name for better readability
            value: displayValue,
          })
        }
      })

      // Add terms agreement
      submissionData.push({
        field: 'Terms and Conditions Agreement',
        value: formData.agreeToTerms ? 'Agreed' : 'Not Agreed',
      })

      console.log('Submitting registration data:', submissionData)

      // Try using custom registration endpoint first, fallback to form-submissions
      let response

      if (formId) {
        // If formId is provided, try the original form-submissions endpoint
        const formCheckResponse = await fetch(`${getClientSideURL()}/api/forms/${formId}`)

        if (formCheckResponse.ok) {
          response = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              form: formId,
              submissionData: submissionData,
            }),
          })
        } else {
          throw new Error(`Form with ID ${formId} not found.`)
        }
      } else {
        // Use custom registration endpoint that doesn't require form
        response = await fetch(`${getClientSideURL()}/api/registration-submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            submissionData: submissionData,
            ...(formId && { formId }),
          }),
        })
      }

      const result = await response.json()

      if (response.status >= 400) {
        console.error('Form submission failed:', result)
        throw new Error(
          result.error ||
            result.errors?.[0]?.message ||
            result.message ||
            'Failed to submit registration',
        )
      }

      console.log('Registration submitted successfully:', result)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      // Show more detailed error message to user
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(
        `Error submitting registration: ${errorMessage}\n\nPlease try again or contact support if the problem persists.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Registration Submitted!
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            Thank you for your registration. We will contact you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
      {/* Debug Component */}
      <RegistrationFormDebugger personalFields={personalFields} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">{title}</h1>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isActive
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : isCompleted
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    Step {step.id}
                  </div>
                  <div
                    className={`text-xs ${
                      isActive || isCompleted
                        ? 'text-neutral-900 dark:text-neutral-100'
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-neutral-200 dark:bg-neutral-600'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">
              Select a Program
            </h2>
            <div className="space-y-4">
              {programs.length > 0 ? (
                programs.map((program) => {
                  const isSelected = formData.selectedProgram === program.programId
                  const isExpanded = expandedProgram === program.programId
                  const hasDescription =
                    program.description &&
                    typeof program.description === 'string' &&
                    program.description.trim().length > 0

                  return (
                    <div
                      key={program.programId}
                      className={`border rounded-lg transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950'
                          : 'border-neutral-200 dark:border-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-500 bg-white dark:bg-neutral-900'
                      } ${!program.isAvailable ? 'opacity-50' : ''}`}
                    >
                      <div
                        className={`p-6 cursor-pointer ${!program.isAvailable ? 'cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (program.isAvailable) {
                            setFormData((prev) => ({
                              ...prev,
                              selectedProgram: program.programId,
                            }))
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            {/* Check icon on the left */}
                            <div className="mr-4">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isSelected
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-neutral-300 dark:border-neutral-600'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>

                            {/* Program content */}
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                {program.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-300">
                                {program.duration && <span>Duration: {program.duration}</span>}
                                {program.price && (
                                  <span>Price: IDR {program.price.toLocaleString()}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {!program.isAvailable && (
                              <span className="text-red-500 dark:text-red-400 text-sm">
                                Not Available
                              </span>
                            )}

                            {/* Chevron icon on the right */}
                            {hasDescription && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedProgram(isExpanded ? null : program.programId)
                                }}
                                className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Accordion content */}
                      {hasDescription && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-neutral-200 dark:border-neutral-600 pt-4">
                              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                                {program.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                  <p className="text-neutral-500 dark:text-neutral-400">
                    No programs available at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalFields.length > 0 ? (
                personalFields.map((field) => (
                  <div
                    key={field.fieldName}
                    className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                  >
                    <label
                      htmlFor={field.fieldName}
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.fieldName}
                        name={field.fieldName}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        value={formData.personalInfo[field.fieldName] || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              [field.fieldName]: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.fieldName}
                        name={field.fieldName}
                        required={field.required}
                        value={formData.personalInfo[field.fieldName] || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              [field.fieldName]: e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      >
                        <option value="">Select {field.label}</option>
                        {parseSelectOptions(field.selectOptions)?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'faculty' ? (
                      <select
                        id={field.fieldName}
                        name={field.fieldName}
                        required={field.required}
                        value={formData.personalInfo[field.fieldName] || ''}
                        onChange={(e) => {
                          const newValue = e.target.value
                          setFormData((prev) => {
                            const newPersonalInfo = {
                              ...prev.personalInfo,
                              [field.fieldName]: newValue,
                            }

                            // Reset major field when faculty changes
                            const majorField = personalFields.find((f) => f.type === 'major')
                            if (majorField) {
                              newPersonalInfo[majorField.fieldName] = ''
                            }

                            return {
                              ...prev,
                              personalInfo: newPersonalInfo,
                            }
                          })
                        }}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      >
                        <option value="">Pilih Fakultas</option>
                        {Object.entries(FACULTY_MAJOR_DATA).map(([value, data]) => (
                          <option key={value} value={value}>
                            {data.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'major' ? (
                      (() => {
                        // Find faculty field to get selected faculty
                        const facultyField = personalFields.find((f) => f.type === 'faculty')
                        const selectedFaculty = facultyField
                          ? formData.personalInfo[facultyField.fieldName]
                          : null
                        const availableMajors =
                          selectedFaculty &&
                          FACULTY_MAJOR_DATA[selectedFaculty as keyof typeof FACULTY_MAJOR_DATA]
                            ? FACULTY_MAJOR_DATA[selectedFaculty as keyof typeof FACULTY_MAJOR_DATA]
                                .majors
                            : []
                        const isMajorDisabled = !selectedFaculty || availableMajors.length === 0

                        return (
                          <select
                            id={field.fieldName}
                            name={field.fieldName}
                            required={field.required}
                            disabled={isMajorDisabled}
                            value={formData.personalInfo[field.fieldName] || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                personalInfo: {
                                  ...prev.personalInfo,
                                  [field.fieldName]: e.target.value,
                                },
                              }))
                            }
                            className={`w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white ${
                              isMajorDisabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="">
                              {isMajorDisabled
                                ? 'Pilih fakultas terlebih dahulu'
                                : 'Pilih Program Studi'}
                            </option>
                            {availableMajors.map((major) => (
                              <option key={major.value} value={major.value}>
                                {major.label}
                              </option>
                            ))}
                          </select>
                        )
                      })()
                    ) : (
                      <input
                        type={field.type}
                        id={field.fieldName}
                        name={field.fieldName}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData.personalInfo[field.fieldName] || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            personalInfo: {
                              ...prev.personalInfo,
                              [field.fieldName]:
                                field.type === 'number' ? Number(e.target.value) : e.target.value,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-8">
                  <User className="w-12 h-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                  <p className="text-neutral-500 dark:text-neutral-400">
                    No personal information fields configured.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">
              Review & Submit
            </h2>

            {/* Selected Program Review */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                Selected Program
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                {formData.selectedProgram ? (
                  <div>
                    {(() => {
                      const selectedProgram = programs.find(
                        (p) => p.programId === formData.selectedProgram,
                      )
                      return selectedProgram ? (
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {selectedProgram.title}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                            {selectedProgram.duration && (
                              <span>Duration: {selectedProgram.duration}</span>
                            )}
                            {selectedProgram.price && (
                              <span>Price: ${selectedProgram.price.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-neutral-600 dark:text-neutral-300">Program not found</p>
                      )
                    })()}
                  </div>
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-300">No program selected</p>
                )}
              </div>
            </div>

            {/* Personal Information Review */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                {Object.keys(formData.personalInfo).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {personalFields.map((field) => {
                      const value = formData.personalInfo[field.fieldName]
                      if (!value) return null

                      const getDisplayValue = () => {
                        if (field.type === 'select') {
                          return (
                            parseSelectOptions(field.selectOptions).find(
                              (opt) => opt.value === value,
                            )?.label || value
                          )
                        } else if (field.type === 'faculty') {
                          const facultyData =
                            FACULTY_MAJOR_DATA[value as keyof typeof FACULTY_MAJOR_DATA]
                          return facultyData ? facultyData.label : value
                        } else if (field.type === 'major') {
                          // Find the faculty field to get the faculty context
                          const facultyField = personalFields.find((f) => f.type === 'faculty')
                          const selectedFaculty = facultyField
                            ? formData.personalInfo[facultyField.fieldName]
                            : null

                          if (selectedFaculty) {
                            const facultyData =
                              FACULTY_MAJOR_DATA[selectedFaculty as keyof typeof FACULTY_MAJOR_DATA]
                            if (facultyData) {
                              const majorData = facultyData.majors.find(
                                (major) => major.value === value,
                              )
                              return majorData ? majorData.label : value
                            }
                          }
                          return String(value)
                        }
                        return String(value)
                      }

                      return (
                        <div key={field.fieldName}>
                          <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            {field.label}
                          </dt>
                          <dd className="text-sm text-neutral-900 dark:text-white mt-1">
                            {getDisplayValue()}
                          </dd>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-300">
                    No personal information provided
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeToTerms: e.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline"
                  >
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Ready to Submit</h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Please review all information above and check the terms agreement before submitting
                your registration.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-neutral-200 dark:border-neutral-600">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentStep === 1
              ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
              : 'bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-500'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className={`flex items-center px-4 py-2 rounded-md ${
              canProceedToNext()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !canSubmit()}
            className={`flex items-center px-6 py-2 rounded-md ${
              isSubmitting || !canSubmit()
                ? 'bg-neutral-400 dark:bg-neutral-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {submitButtonText}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default RegistrationFormComponent
