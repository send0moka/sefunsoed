import { ReactNode, useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

type SelectableElementProps = {
  id: string
  children: ReactNode
  isSelected: boolean
  onClick: () => void
  elementType: string
}

export default function SelectableElement({
  id,
  children,
  isSelected,
  onClick,
  elementType
}: SelectableElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [labelPosition, setLabelPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (isSelected && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      setLabelPosition({
        top: rect.top - 30, // Adjust this value to position the label higher
        left: rect.left
      })
    }
  }, [isSelected])

  return (
    <div ref={elementRef} className="relative group" onClick={onClick} id={id}>
      {isSelected && typeof document !== 'undefined' && createPortal(
        <motion.div
          style={{
            position: 'fixed',
            top: labelPosition.top,
            left: labelPosition.left,
            zIndex: 9999
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap"
        >
          {elementType}
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-blue-500 transform rotate-45" />
        </motion.div>,
        document.body
      )}
      
      <motion.div
        className="relative"
        whileHover={{ scale: 1.01 }}
      >
        {children}
        
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-2 border-blue-500 pointer-events-none"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}