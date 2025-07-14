'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'

// Komponen individual untuk setiap panel accordion
interface AccordionPanelProps {
  title: string
  content: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  isOpen: boolean
  onToggle: () => void
  variant?: string
  index: number
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  title,
  content,
  isOpen,
  onToggle,
  variant = 'default',
  index,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return {
          panel: 'border border-border rounded-lg overflow-hidden',
          header: 'bg-background hover:bg-muted/50',
          content: 'bg-background',
        }
      case 'filled':
        return {
          panel: 'bg-muted/30 rounded-lg overflow-hidden',
          header: 'bg-muted/50 hover:bg-muted/70',
          content: 'bg-background',
        }
      case 'ghost':
        return {
          panel: 'border-b border-border last:border-b-0',
          header: 'hover:bg-muted/30',
          content: 'bg-background',
        }
      default:
        return {
          panel: 'border border-border rounded-lg overflow-hidden shadow-sm',
          header: 'bg-card hover:bg-muted/30',
          content: 'bg-card',
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={cn('accordion-panel', styles.panel)}>
      {/* Header Panel */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full px-6 py-4 text-left flex items-center justify-between',
          'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          styles.header,
        )}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
        id={`accordion-header-${index}`}
      >
        <h3 className="text-lg font-semibold text-foreground pr-4">{title}</h3>

        {/* Chevron Icon */}
        <div
          className={cn(
            'flex-shrink-0 transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180',
          )}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      {/* Content Panel dengan animasi */}
      <div
        id={`accordion-content-${index}`}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-labelledby={`accordion-header-${index}`}
      >
        <div className={cn('px-6 py-4 border-t border-border/50', styles.content)}>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <RichText data={content} enableGutter={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Komponen utama Accordion
export const AccordionBlock: React.FC<AccordionBlockProps> = ({ title, panels, allowMultiple }) => {
  // State untuk mengontrol panel yang terbuka
  const [openPanels, setOpenPanels] = useState<Set<number>>(() => {
    // Inisialisasi dengan panel yang seharusnya terbuka by default
    const initialOpen = new Set<number>()
    if (panels) {
      panels.forEach((panel, index: number) => {
        if (panel.isOpenByDefault) {
          initialOpen.add(index)
        }
      })
    }
    return initialOpen
  })

  if (!panels || panels.length === 0) {
    return null
  }

  // Handler untuk toggle panel
  const togglePanel = (index: number) => {
    setOpenPanels((prev) => {
      const newOpenPanels = new Set(prev)

      if (newOpenPanels.has(index)) {
        // Tutup panel yang sedang terbuka
        newOpenPanels.delete(index)
      } else {
        if (!allowMultiple) {
          // Jika tidak allow multiple, tutup semua panel lain
          newOpenPanels.clear()
        }
        // Buka panel yang dipilih
        newOpenPanels.add(index)
      }

      return newOpenPanels
    })
  }

  return (
    <div className="container my-16">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div
          className={cn(
            'space-y-2',
            // Jika menggunakan variant ghost, hilangkan spacing
            panels.some((panel) => panel.variant === 'ghost') && 'space-y-0',
          )}
        >
          {panels.map((panel, index: number) => (
            <AccordionPanel
              key={index}
              title={panel.title}
              content={panel.content}
              isOpen={openPanels.has(index)}
              onToggle={() => togglePanel(index)}
              variant={panel.variant || 'default'}
              index={index}
            />
          ))}
        </div>

        {/* Info text untuk multiple panels */}
        {allowMultiple && (
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Multiple panels can be open at the same time
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
