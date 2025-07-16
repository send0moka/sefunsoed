'use client'
import { CollectionArchive } from '@/components/CollectionArchive'
import { CategoryFilter } from '@/components/CategoryFilter/Enhanced'
import { cn } from '@/utilities/ui'
import React, { useState, useMemo } from 'react'
import { SortAsc, SortDesc, Calendar, Grid, List } from 'lucide-react'

import type { Category, Post } from '@/payload-types'

export type PostsClientProps = {
  posts: Pick<Post, 'id' | 'title' | 'slug' | 'categories' | 'meta' | 'publishedAt'>[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'
type ViewMode = 'grid' | 'list'

export const PostsClientEnhanced: React.FC<PostsClientProps> = ({ posts, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = posts.filter((post) => {
        if (!post.categories || post.categories.length === 0) {
          return false
        }

        return post.categories.some((category) => {
          const categoryId = typeof category === 'number' ? category : category.id
          return selectedCategories.includes(categoryId)
        })
      })
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
        case 'oldest':
          return new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return sorted
  }, [posts, selectedCategories, sortBy])

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: SortDesc },
    { value: 'oldest', label: 'Oldest First', icon: SortAsc },
    { value: 'title-asc', label: 'Title A-Z', icon: SortAsc },
    { value: 'title-desc', label: 'Title Z-A', icon: SortDesc },
  ] as const

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="container">
        <div className="flex flex-col gap-4">
          {/* Top Row: Filter + Sort + View Mode */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={toggleCategory}
                onClearFilters={clearFilters}
                postCount={filteredAndSortedPosts.length}
              />

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 pr-8 rounded-lg border transition-all duration-200',
                    'bg-background hover:bg-accent border-border',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    'text-sm font-medium appearance-none cursor-pointer',
                  )}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-all duration-200',
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-all duration-200',
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-sm text-muted-foreground">
              {filteredAndSortedPosts.length} of {posts.length} posts
              {selectedCategories.length > 0 && (
                <span className="ml-2">
                  ({selectedCategories.length} filter{selectedCategories.length > 1 ? 's' : ''}{' '}
                  active)
                </span>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {selectedCategories.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((categoryId) => {
                  const category = categories.find((cat) => cat.id === categoryId)
                  return category ? (
                    <span
                      key={categoryId}
                      className={cn(
                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs',
                        'bg-primary/10 text-primary border border-primary/20',
                        'hover:bg-primary/20 transition-colors',
                      )}
                    >
                      {category.title}
                      <button
                        onClick={() => toggleCategory(categoryId)}
                        className="hover:text-primary/80 transition-colors ml-1"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M9 3L3 9M3 3l6 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Posts Archive */}
      <CollectionArchive posts={filteredAndSortedPosts} />

      {/* No Results Message */}
      {filteredAndSortedPosts.length === 0 && selectedCategories.length > 0 && (
        <div className="container">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                No posts match your current filter criteria. Try adjusting your filters or{' '}
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 underline transition-colors"
                >
                  clear all filters
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostsClientEnhanced
