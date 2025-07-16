'use client'
import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { ChevronDown, Filter, X } from 'lucide-react'

import type { Category } from '@/payload-types'

interface CategoryFilterProps {
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
  selectedCategories: number[]
  onCategoryChange: (categoryId: number) => void
  onClearFilters: () => void
  postCount?: number
  className?: string
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onClearFilters,
  postCount,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCategory = (categoryId: number) => {
    onCategoryChange(categoryId)
  }

  const hasActiveFilters = selectedCategories.length > 0

  return (
    <div className={cn('relative', className)}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200',
          'bg-background hover:bg-accent border-border',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          hasActiveFilters && 'bg-primary text-primary-foreground border-primary',
        )}
      >
        <Filter size={16} />
        <span className="font-medium">
          {hasActiveFilters
            ? `${selectedCategories.length} Filter${selectedCategories.length > 1 ? 's' : ''} Active`
            : 'Filter by Category'}
        </span>
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[280px] sm:min-w-[320px]"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-foreground">Filter by Category</h3>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      onClearFilters()
                      setIsOpen(false)
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <X size={12} />
                    Clear All
                  </button>
                )}
              </div>

              {/* Category List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category.id)

                  return (
                    <label
                      key={category.id}
                      className={cn(
                        'flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all duration-150',
                        'hover:bg-accent',
                        isSelected && 'bg-accent',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCategory(category.id)}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          'w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center',
                          isSelected
                            ? 'bg-primary border-primary'
                            : 'border-border hover:border-primary',
                        )}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.1 }}
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path
                                d="M6.5 2L3 5.5L1.5 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-foreground"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground flex-1">
                        {category.title}
                      </span>
                    </label>
                  )
                })}
              </div>

              {categories.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No categories available
                </p>
              )}

              {/* Results Count */}
              {postCount !== undefined && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {postCount} post{postCount !== 1 ? 's' : ''} found
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default CategoryFilter
