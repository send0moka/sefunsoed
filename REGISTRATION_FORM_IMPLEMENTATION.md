# Registration Form Block Implementation

## Overview
Complex multi-step registration form block dengan stepper navigation, accordion program selection, form validation, dan summary review. Menggunakan client-side state management untuk mengelola data form dan validasi.

## Features

### 1. Multi-Step Process
- **Step 1:** Program Selection dengan accordion layout
- **Step 2:** Personal Information form dengan grid layout  
- **Step 3:** Review & Submit dengan summary dan terms agreement

### 2. Visual Components
- Progress stepper dengan status indicators
- Accordion panels untuk program details
- Responsive form grids
- Loading states dan success messages

### 3. Form Functionality
- Form validation dengan error handling
- Multiple field types (text, email, tel, date, textarea, select)
- Required/optional field indicators
- Email format validation

### 4. Navigation & UX
- Next/Previous button navigation
- Form state persistence
- Progressive disclosure
- Responsive design

## Technical Implementation

### Files Created
```
src/blocks/RegistrationForm/
├── config.ts          # Payload CMS block configuration
├── Component.tsx      # React component with stepper logic
└── index.ts          # Export file
```

### Key Technologies
- React hooks (useState untuk state management)
- TypeScript dengan Payload CMS types
- Tailwind CSS untuk styling
- Lucide React untuk icons
- Client-side form validation

### Core Features

#### Stepper Navigation
```typescript
const steps = [
  { id: 1, title: 'Select Program', icon: FileText },
  { id: 2, title: 'Personal Information', icon: User },
  { id: 3, title: 'Review & Submit', icon: Send },
]
```

#### Form Data Structure
```typescript
type FormData = {
  selectedProgram?: string
  personalInfo: Record<string, string | number>
  agreeToTerms: boolean
}
```

#### Validation System
- Step-by-step validation
- Field-level error messages
- Email format validation
- Required field checking

## Configuration Options

### Admin Panel Configuration
1. **Form Settings:**
   - Title dan description
   - Submit button text
   - Success message content

2. **Programs Array:**
   - Program ID (unique identifier)
   - Title dan description (rich text)
   - Price dan duration
   - Availability status

3. **Personal Info Fields:**
   - Field name dan label
   - Field type (text, email, tel, etc.)
   - Required/optional status
   - Placeholder text
   - Select options

4. **Terms & Conditions:**
   - Rich text content
   - Mandatory acceptance

### Example Usage in Admin Panel
```typescript
{
  title: "Program Registration 2024",
  programs: [
    {
      programId: "fullstack-2024",
      title: "Full-Stack Development",
      description: "<rich text content>",
      price: 15000000,
      duration: "6 months",
      isAvailable: true
    }
  ],
  personalInfoFields: [
    {
      fieldName: "firstName",
      label: "First Name", 
      type: "text",
      required: true,
      placeholder: "Enter your first name"
    }
  ]
}
```

## Integration

### 1. Collections Integration
Terintegrasi dengan:
- Pages collection (`src/collections/Pages/index.ts`)
- Posts collection (`src/collections/Posts/index.ts`)

### 2. Block Rendering
Added to `RenderBlocks.tsx`:
```typescript
const blockComponents = {
  // ...existing blocks
  registrationForm: RegistrationFormComponent,
}
```

### 3. Rich Text Support
Added to `RichText/index.tsx` dengan proper type mapping untuk Payload CMS data.

## Demo Page
Tersedia di `/registration-form-demo` dengan:
- Sample programs (3 different programs)
- Comprehensive personal info fields
- Interactive stepper demonstration
- Form validation showcase

## Styling Features

### Design System
- Consistent color scheme (blue primary, green success, red error)
- Professional spacing dan typography
- Responsive breakpoints
- Modern UI components

### Interactive Elements
- Hover states pada buttons dan cards
- Smooth transitions untuk accordion
- Loading animations untuk submission
- Visual feedback untuk form states

### Responsive Design
- Mobile-first approach
- Grid layouts yang responsive
- Proper touch targets
- Readable typography pada all screen sizes

## Advanced Features

### Form Submission
```typescript
const handleSubmit = async () => {
  if (!validateStep(3)) return
  
  setIsSubmitting(true)
  try {
    // API call simulation
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Submitting registration:', formData)
    setIsSubmitted(true)
  } catch (error) {
    console.error('Submission error:', error)
  } finally {
    setIsSubmitting(false)
  }
}
```

### Price Formatting
```typescript
const formatPrice = (price?: number) => {
  if (!price) return 'Contact for pricing'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
```

### Step Validation
```typescript
const validateStep = (step: number): boolean => {
  const newErrors: Record<string, string> = {}
  
  if (step === 1 && !formData.selectedProgram) {
    newErrors.program = 'Please select a program'
  }
  
  if (step === 2) {
    personalInfoFields.forEach(field => {
      if (field.required && !formData.personalInfo[field.fieldName]) {
        newErrors[field.fieldName] = `${field.label} is required`
      }
    })
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

## Usage Notes

1. **Client Component:** Menggunakan `'use client'` directive untuk interactivity
2. **Type Safety:** Full TypeScript support dengan Payload CMS types
3. **State Management:** Local state dengan useState untuk form data
4. **Error Handling:** Comprehensive validation dengan user-friendly messages
5. **Accessibility:** Proper ARIA labels dan keyboard navigation

## Next Steps
- Integrasi dengan real form submission API
- Email notification system
- Payment integration
- Admin dashboard untuk managing registrations
- Analytics tracking untuk form completion rates

Layout ini mendemonstrasikan complex form patterns dengan multiple steps, dynamic content, dan professional UX patterns yang umum digunakan dalam registration systems.
