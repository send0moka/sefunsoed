'use client'
import React, { useState, useMemo } from 'react'
import { Search, ExternalLink } from 'lucide-react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

// Using any for compatibility with Payload generated types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FAQItemData = any

interface FAQItemProps {
  question: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any // Lexical editor content
  relatedQuestions?: Array<{
    question: string
    link?: string
  }>
  layout: 'cards' | 'list' | 'accordion'
  showRelatedQuestions: boolean
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  relatedQuestions,
  layout,
  showRelatedQuestions,
}) => {
  const getLayoutStyles = () => {
    switch (layout) {
      case 'cards':
        return {
          container: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4',
          question: 'text-lg font-semibold text-gray-900 mb-3',
          answer: 'text-gray-700 mb-4',
          relatedSection: 'mt-4 pt-4 border-t border-gray-100',
        }
      case 'accordion': // Legacy support - render as cards but flat
        return {
          container: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4',
          question: 'text-lg font-semibold text-gray-900 mb-3',
          answer: 'text-gray-700 mb-4',
          relatedSection: 'mt-4 pt-4 border-t border-gray-100',
        }
      default: // list
        return {
          container: 'border-b border-gray-200 last:border-b-0 py-6',
          question: 'text-lg font-semibold text-gray-900 mb-3',
          answer: 'text-gray-700 mb-4',
          relatedSection: 'mt-4 pt-4 border-t border-gray-100',
        }
    }
  }

  const styles = getLayoutStyles()

  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{question}</h3>
      
      <div className={styles.answer}>
        <RichText data={answer} />
      </div>
      
      {showRelatedQuestions && relatedQuestions && relatedQuestions.length > 0 && (
        <div className={styles.relatedSection}>
          <h4 className="font-medium text-gray-900 mb-2">Pertanyaan Terkait:</h4>
          <ul className="space-y-2">
            {relatedQuestions.map((related, index) => (
              <li key={index}>
                {related.link ? (
                  <a
                    href={related.link}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {related.question}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-gray-600 text-sm">{related.question}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

interface TopicFilterProps {
  topics: Array<{
    name: string
    slug: string
    description?: string
  }>
  selectedTopic: string
  onTopicChange: (topic: string) => void
  allTopicsLabel: string
  itemCounts: Record<string, number>
}

const TopicFilter: React.FC<TopicFilterProps> = ({
  topics,
  selectedTopic,
  onTopicChange,
  allTopicsLabel,
  itemCounts,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTopicChange('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedTopic === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {allTopicsLabel} ({itemCounts.all || 0})
        </button>
        {topics.map((topic) => (
          <button
            key={topic.slug}
            onClick={() => onTopicChange(topic.slug)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedTopic === topic.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            title={topic.description}
          >
            {topic.name} ({itemCounts[topic.slug] || 0})
          </button>
        ))}
      </div>
    </div>
  )
}

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder,
}) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-md',
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          )}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Selanjutnya
      </button>
    </div>
  )
}

export const FAQBlockComponent: React.FC<FAQBlockProps> = ({
  title,
  subtitle,
  enableSearch,
  searchPlaceholder,
  enableTopicFilter,
  allTopicsLabel,
  topics,
  topicsText,
  faqItems,
  layout,
  showRelatedQuestions,
  maxItemsPerPage,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Auto-generate topics from FAQ items if no topics configured
  const parsedTopics = useMemo(() => {
    // First try to use the original topics array (for backward compatibility)
    if (topics && topics.length > 0) {
      return topics
    }
    
    // Then try to parse from topicsText JSON
    if (topicsText) {
      try {
        const parsed = JSON.parse(topicsText)
        return Array.isArray(parsed) ? parsed : []
      } catch (error) {
        console.warn('Failed to parse topics JSON:', error)
      }
    }
    
    // Auto-generate topics from FAQ items
    if (faqItems && faqItems.length > 0) {
      const uniqueTopics = new Set<string>()
      faqItems.forEach((item: FAQItemData) => {
        if (item.topic && item.topic.trim()) {
          uniqueTopics.add(item.topic.trim())
        }
      })
      
      return Array.from(uniqueTopics).map(topicSlug => ({
        name: topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1), // Capitalize first letter
        slug: topicSlug,
        description: `Pertanyaan terkait ${topicSlug}`
      }))
    }
    
    return []
  }, [topics, topicsText, faqItems])

  // Filter and search FAQ items
  const filteredItems = useMemo(() => {
    let filtered = faqItems || []

    // Filter by topic
    if (selectedTopic !== 'all') {
      filtered = filtered.filter((item: FAQItemData) => item.topic === selectedTopic)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter((item: FAQItemData) => {
        const questionMatch = item.question?.toLowerCase().includes(searchLower)
        const keywordsMatch = item.keywords?.toLowerCase().includes(searchLower)
        return questionMatch || keywordsMatch
      })
    }

    // Sort by priority (higher first) then alphabetically
    return filtered.sort((a: FAQItemData, b: FAQItemData) => {
      if (a.priority !== b.priority) {
        return (b.priority || 0) - (a.priority || 0)
      }
      return (a.question || '').localeCompare(b.question || '')
    })
  }, [faqItems, selectedTopic, searchTerm])

  // Calculate item counts for each topic
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqItems?.length || 0 }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parsedTopics?.forEach((topic: any) => {
      counts[topic.slug] = faqItems?.filter((item: FAQItemData) => item.topic === topic.slug).length || 0
    })
    
    return counts
  }, [faqItems, parsedTopics])

  // Pagination
  const itemsPerPage = maxItemsPerPage || 10
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedTopic])

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        )}
        {subtitle && (
          <p className="text-lg text-gray-600">{subtitle}</p>
        )}
      </div>

      {/* Search Bar */}
      {enableSearch && (
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder={searchPlaceholder || 'Search questions...'}
        />
      )}

      {/* Topic Filter */}
      {enableTopicFilter && (
        <div className="mb-6">
          {/* Debug info - remove in production */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500 mb-2">
              Debug: enableTopicFilter={String(enableTopicFilter)}, 
              topics={topics ? topics.length : 'null'}, 
              topicsText={topicsText ? 'exists' : 'null'}, 
              parsedTopics={parsedTopics ? parsedTopics.length : 'null'}, 
              faqItems={faqItems ? faqItems.length : 'null'}
            </div>
          )} */}
          
          {parsedTopics && parsedTopics.length > 0 ? (
            <TopicFilter
              topics={parsedTopics}
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              allTopicsLabel={allTopicsLabel || 'All Topics'}
              itemCounts={itemCounts}
            />
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>There are no topics configured.</p>
              <p className="text-sm">Make sure FAQ items have a &apos;topic&apos; field, or enter topics in JSON format.</p>
              <p className="text-xs mt-2 font-mono bg-gray-100 p-2 rounded">
                Example JSON: [{JSON.stringify({name: "General", slug: "general", description: "General questions"})}]
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedItems.length} of {filteredItems.length} questions
        {searchTerm && ` for "${searchTerm}"`}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {selectedTopic !== 'all' && ` in topic "${parsedTopics?.find((t: any) => t.slug === selectedTopic)?.name}"`}
      </div>

      {/* FAQ Items */}
      <div className={cn(
        layout === 'list' ? '' : ''
      )}>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item: FAQItemData, index: number) => (
            <FAQItem
              key={startIndex + index}
              question={item.question || ''}
              answer={item.answer}
              relatedQuestions={item.relatedQuestions}
              layout={layout || 'cards'}
              showRelatedQuestions={showRelatedQuestions || false}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchTerm || selectedTopic !== 'all'
                ? 'No questions found matching your search.'
                : 'No questions available.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default FAQBlockComponent
