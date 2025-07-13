'use client'

import { useEffect } from 'react'

export function SiennaAccessibilityWidget() {
  useEffect(() => {
    // Only load the script after hydration is complete
    const script = document.createElement('script')
    script.src = 'https://website-widgets.pages.dev/dist/sienna.min.js'
    script.defer = true

    // Configure the widget position to bottom-right
    script.setAttribute('data-asw-position', 'bottom-right')

    // Add script to document head
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      // Remove script when component unmounts
      const existingScript = document.querySelector(
        'script[src="https://website-widgets.pages.dev/dist/sienna.min.js"]',
      )
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything
}
