import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'

import { LanguageProvider, useLanguage } from '@/providers/LanguageProvider'

// Mock flag-icons CSS
vi.mock('/node_modules/flag-icons/css/flag-icons.min.css', () => ({}))

// Test component to access language context
const TestComponent = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <button data-testid="switch-to-en" onClick={() => setLanguage('en')}>
        Switch to English
      </button>
      <button data-testid="switch-to-id" onClick={() => setLanguage('id')}>
        Switch to Indonesian
      </button>
    </div>
  )
}

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
)

describe('LanguageProvider', () => {
  describe('Context Provider', () => {
    it('should provide default language as English', () => {
      render(
        <ProviderWrapper>
          <TestComponent />
        </ProviderWrapper>,
      )

      expect(screen.getByTestId('current-language')).toHaveTextContent('en')
    })

    it('should allow switching to Indonesian', async () => {
      render(
        <ProviderWrapper>
          <TestComponent />
        </ProviderWrapper>,
      )

      const switchButton = screen.getByTestId('switch-to-id')
      fireEvent.click(switchButton)

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('id')
      })
    })

    it('should allow switching back to English', async () => {
      render(
        <ProviderWrapper>
          <TestComponent />
        </ProviderWrapper>,
      )

      // Switch to Indonesian first
      fireEvent.click(screen.getByTestId('switch-to-id'))

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('id')
      })

      // Switch back to English
      fireEvent.click(screen.getByTestId('switch-to-en'))

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en')
      })
    })

    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const TestComponentOutsideProvider = () => {
        try {
          useLanguage()
          return <div>Should not render</div>
        } catch (error) {
          return <div data-testid="error-message">{(error as Error).message}</div>
        }
      }

      render(<TestComponentOutsideProvider />)

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'useLanguage must be used within a LanguageProvider',
      )

      consoleSpy.mockRestore()
    })
  })
})
