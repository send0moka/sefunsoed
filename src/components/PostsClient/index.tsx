'use client'
import { CollectionArchive } from '@/components/CollectionArchive'
import { CategoryFilter } from '@/components/CategoryFilter/Enhanced'
import { cn } from '@/utilities/ui'
import React, { useState, useMemo } from 'react'

import type { Category, Post } from '@/payload-types'

export type PostsClientProps = {
  posts: Pick<Post, 'id' | 'title' | 'slug' | 'categories' | 'meta'>[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
}

export const PostsClient: React.FC<PostsClientProps> = ({ posts, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return posts
    }

    return posts.filter((post) => {
      if (!post.categories || post.categories.length === 0) {
        return false
      }

      return post.categories.some((category) => {
        const categoryId = typeof category === 'number' ? category : category.id
        return selectedCategories.includes(categoryId)
      })
    })
  }, [posts, selectedCategories])

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={toggleCategory}
              onClearFilters={clearFilters}
              postCount={filteredPosts.length}
            />

            {/* Active Filters Display */}
            {selectedCategories.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Active filters:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map((categoryId) => {
                    const category = categories.find((cat) => cat.id === categoryId)
                    return category ? (
                      <span
                        key={categoryId}
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
                          'bg-primary/10 text-primary border border-primary/20',
                        )}
                      >
                        {category.title}
                        <button
                          onClick={() => toggleCategory(categoryId)}
                          className="hover:text-primary/80 transition-colors"
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

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            {filteredPosts.length} of {posts.length} posts
            {selectedCategories.length > 0 && (
              <span className="ml-2">
                ({selectedCategories.length} filter{selectedCategories.length > 1 ? 's' : ''}{' '}
                active)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Posts Archive */}
      <CollectionArchive posts={filteredPosts} />

      {/* No Results Message */}
      {filteredPosts.length === 0 && selectedCategories.length > 0 && (
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

export default PostsClient
