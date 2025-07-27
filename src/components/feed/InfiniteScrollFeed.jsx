import React, { useState, useCallback } from 'react'
import { useGetPostsQuery, useGetUsersQuery } from '../../store/api/PostsApi'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import PostCard from './PostCard'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'

const InfiniteScrollFeed = () => {
  const [feedType, setFeedType] = useState('products') 
  const [skip, setSkip] = useState(0)
  const limit = 10

  // Use the appropriate query based on feed type
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    isFetching: productsFetching
  } = useGetPostsQuery(
    { skip, limit },
    { skip: feedType !== 'products' }
  )

  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    isFetching: usersFetching
  } = useGetUsersQuery(
    { skip, limit },
    { skip: feedType !== 'users' }
  )

  // Select the appropriate data based on feed type
  const data = feedType === 'products' ? productsData : usersData
  const error = feedType === 'products' ? productsError : usersError
  const isLoading = feedType === 'products' ? productsLoading : usersLoading
  const isFetching = feedType === 'products' ? productsFetching : usersFetching

  // Calculate if there are more items to load
  const hasMore = data ? skip + limit < data.total : true

  // Load more items
  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setSkip(prev => prev + limit)
    }
  }, [isFetching, hasMore, limit])

  // Infinite scroll hook
  const { lastElementRef } = useInfiniteScroll(loadMore, hasMore, isFetching)

  // Handle feed type change
  const handleFeedTypeChange = (newType) => {
    if (newType !== feedType) {
      setFeedType(newType)
      setSkip(0) // Reset pagination
    }
  }

  // Loading state for initial load
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage
          message={error?.data?.message || `Failed to load ${feedType}. Please try again.`}
        />
      </div>
    )
  }

  const posts = data?.posts || []

  return (
    <div className="max-w-4xl mx-auto">
      {/* Feed Type Selector */}
      <div className="mb-6">
        <div className="flex space-x-4 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700 w-fit">
          <button
            onClick={() => handleFeedTypeChange('products')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              feedType === 'products'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Products Feed
          </button>
          <button
            onClick={() => handleFeedTypeChange('users')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              feedType === 'users'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Users Feed
          </button>
        </div>
      </div>

      {/* Feed Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {feedType === 'products' ? 'Products' : 'Users'} Feed
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {data?.total ? `${data.total} total items` : 'Loading items...'}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              ref={index === posts.length - 1 ? lastElementRef : null}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No {feedType} found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            There are no {feedType} to display at the moment.
          </p>
        </div>
      )}

      {/* Loading indicator for pagination */}
      {isFetching && posts.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="md" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Loading more {feedType}...
          </span>
        </div>
      )}

      {/* End of feed indicator */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            You've reached the end of the {feedType} feed!
          </p>
        </div>
      )}
    </div>
  )
}

export default InfiniteScrollFeed