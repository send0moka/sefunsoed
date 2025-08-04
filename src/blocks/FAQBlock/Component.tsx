'use client'
import React, { useState, useMemo } from 'react'
import { Search, ExternalLink } from 'lucide-react'
import RichText from '@/components/RichText'
import { useLanguage } from '@/providers/LanguageProvider'
import { cn } from '@/utilities/ui'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

// Using any for compatibility with Payload generated types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FAQItemData = any

interface FAQItemProps {
  question: string
  questionId?: string // Indonesian question
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any // Lexical editor content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answerId?: any // Indonesian answer (Lexical editor content)
  relatedQuestions?: Array<{
    question: string
    link?: string
  }>
  layout: 'cards' | 'list' | 'accordion'
  showRelatedQuestions: boolean
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  questionId,
  answer,
  answerId,
  relatedQuestions,
  layout,
  showRelatedQuestions,
}) => {
  const { language } = useLanguage()

  // Choose content based on language
  const currentQuestion = language === 'en' ? question : questionId || question
  const currentAnswer = language === 'en' ? answer : answerId || answer
  const getLayoutStyles = () => {
    switch (layout) {
      case 'cards':
        return {
          container:
            'bg-white dark:bg-neutral-950 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 mb-4',
          question: 'text-lg font-semibold text-neutral-900 dark:text-white mb-3',
          answer: 'text-neutral-700 dark:text-neutral-300 mb-4',
          relatedSection: 'mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700',
        }
      case 'accordion': // Legacy support - render as cards but flat
        return {
          container:
            'bg-white dark:bg-neutral-950 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 mb-4',
          question: 'text-lg font-semibold text-neutral-900 dark:text-white mb-3',
          answer: 'text-neutral-700 dark:text-neutral-300 mb-4',
          relatedSection: 'mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700',
        }
      default: // list
        return {
          container: 'border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 py-6',
          question: 'text-lg font-semibold text-neutral-900 dark:text-white mb-3',
          answer: 'text-neutral-700 dark:text-neutral-300 mb-4',
          relatedSection: 'mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700',
        }
    }
  }

  const styles = getLayoutStyles()

  return (
    <div className={styles.container}>
      <h3 className={styles.question}>{currentQuestion}</h3>

      <div className={styles.answer}>
        <RichText data={currentAnswer} />
      </div>

      {showRelatedQuestions && relatedQuestions && relatedQuestions.length > 0 && (
        <div className={styles.relatedSection}>
          <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Related Questions:</h4>
          <ul className="space-y-2">
            {relatedQuestions.map((related, index) => (
              <li key={index}>
                {related.link ? (
                  <a
                    href={related.link || '#'}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {related.question}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {related.question}
                  </span>
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
    <div className="my-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTopicChange('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedTopic === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600',
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
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600',
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

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 h-4 w-4" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
      />
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-600 rounded-l-md hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'px-3 py-2 text-sm font-medium border-t border-b border-r border-neutral-300 dark:border-neutral-600',
            page === currentPage
              ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-blue-500 dark:border-blue-400'
              : 'bg-white dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700',
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-600 rounded-r-md hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
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
    // Note: topics field has been removed from config, using only topicsText and auto-generation

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

      return Array.from(uniqueTopics).map((topicSlug) => ({
        name: topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1), // Capitalize first letter
        slug: topicSlug,
        description: `Pertanyaan terkait ${topicSlug}`,
      }))
    }

    return []
  }, [topicsText, faqItems])

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
        const questionIdMatch = item.question_id?.toLowerCase().includes(searchLower)
        const keywordsMatch = item.keywords?.toLowerCase().includes(searchLower)
        return questionMatch || questionIdMatch || keywordsMatch
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
      counts[topic.slug] =
        faqItems?.filter((item: FAQItemData) => item.topic === topic.slug).length || 0
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
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h2>
        )}
        {subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
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
            <div className="text-xs text-neutral-500 mb-2">
              Debug: enableTopicFilter={String(enableTopicFilter)}, 
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
            <div className="text-center py-4 text-neutral-500 dark:text-neutral-400">
              <p>There are no topics configured.</p>
              <p className="text-sm">
                Make sure FAQ items have a &apos;topic&apos; field, or enter topics in JSON format.
              </p>
              <p className="text-xs mt-2 font-mono bg-neutral-100 dark:bg-neutral-950 p-2 rounded">
                Example JSON: [
                {JSON.stringify({
                  name: 'General',
                  slug: 'general',
                  description: 'General questions',
                })}
                ]
              </p>
            </div>
          )}
        </div>
      )}

      {/* Results Info */}
      <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        Showing {paginatedItems.length} of {filteredItems.length} questions
        {searchTerm && ` for "${searchTerm}"`}
        {}
        {selectedTopic !== 'all' &&
          ` in topic "${parsedTopics?.find((t: { slug: string; name: string }) => t.slug === selectedTopic)?.name}"`}
      </div>

      {/* FAQ Items */}
      <div className={cn(layout === 'list' ? '' : '')}>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item: FAQItemData, index: number) => (
            <FAQItem
              key={startIndex + index}
              question={item.question || ''}
              questionId={item.question_id}
              answer={item.answer}
              answerId={item.answer_id}
              relatedQuestions={item.relatedQuestions}
              layout={layout || 'cards'}
              showRelatedQuestions={showRelatedQuestions || false}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500 dark:text-neutral-400">
              {searchTerm || selectedTopic !== 'all'
                ? 'No questions found matching your search.'
                : 'No questions available.'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default FAQBlockComponent
