'use client'

import { useEffect } from 'react'

interface AccessibilityWidgetProps {
  /**
   * Widget account identifier (default: 'sienna' for free version)
   */
  account?: string
  /**
   * Custom widget position
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({
  account = 'sienna',
  position = 'bottom-right',
}) => {
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[data-account="sienna"]')) {
      return
    }

    // Create and load the accessibility widget script
    const script = document.createElement('script')
    script.setAttribute('data-account', account)
    script.setAttribute('src', 'https://cdn.userway.org/widget.js')

    // Add position attribute if specified
    if (position) {
      script.setAttribute('data-position', position)
    }

    // Append to document
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[data-account="sienna"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [account, position])

  return null // This component doesn't render anything visible
}

export default AccessibilityWidget
