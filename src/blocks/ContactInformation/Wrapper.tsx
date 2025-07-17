import React from 'react'
import ContactInformationBlock from './Component'

interface ContactData {
  iconType: 'email' | 'phone' | 'address' | 'whatsapp' | 'website' | 'time'
  title: string
  content: string
  colorScheme: 'blue' | 'green' | 'purple' | 'emerald' | 'indigo' | 'orange' | 'red' | 'pink'
}

interface ContactInformationBlockType {
  title?: string
  subtitle?: string
  layout?: 'horizontal' | 'vertical'
  showHoverEffect?: boolean
  contacts?: ContactData[]
}

interface ContactInformationBlockWrapperProps {
  block: ContactInformationBlockType
}

const ContactInformationBlockWrapper: React.FC<ContactInformationBlockWrapperProps> = ({
  block,
}) => {
  return (
    <ContactInformationBlock
      title={block.title}
      subtitle={block.subtitle}
      layout={block.layout}
      showHoverEffect={block.showHoverEffect}
      contacts={block.contacts}
    />
  )
}

export default ContactInformationBlockWrapper
