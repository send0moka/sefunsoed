'use client'
import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { ChevronDown, Filter, X, Search } from 'lucide-react'

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
  const [searchTerm, setSearchTerm] = useState('')

  const toggleCategory = (categoryId: number) => {
    onCategoryChange(categoryId)
  }

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          'text-sm font-medium',
          hasActiveFilters &&
            'bg-primary text-primary-foreground border-primary hover:bg-primary/90',
        )}
      >
        <Filter size={16} />
        <span>
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
              <div className="flex items-center justify-between mb-4">
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

              {/* Search Input */}
              {categories.length > 5 && (
                <div className="relative mb-4">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                </div>
              )}

              {/* Category List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredCategories.map((category) => {
                  const isSelected = selectedCategories.includes(category.id)

                  return (
                    <motion.label
                      key={category.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-150',
                        'hover:bg-accent',
                        isSelected && 'bg-accent ring-1 ring-primary/20',
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
                            transition={{ duration: 0.15 }}
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path
                                d="M8 2.5L4 6.5L2 4.5"
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
                    </motion.label>
                  )
                })}
              </div>

              {/* No Results */}
              {filteredCategories.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No categories found matching &ldquo;{searchTerm}&rdquo;
                  </p>
                </div>
              )}

              {categories.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No categories available
                </p>
              )}

              {/* Results Count */}
              {postCount !== undefined && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {postCount} post{postCount !== 1 ? 's' : ''} found
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          onClearFilters()
                          setIsOpen(false)
                        }}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        View all posts
                      </button>
                    )}
                  </div>
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
