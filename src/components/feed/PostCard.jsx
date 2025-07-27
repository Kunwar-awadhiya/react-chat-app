import React from 'react'
import { Star, Calendar, Tag, DollarSign } from 'lucide-react'

const PostCard = React.forwardRef(({ post }, ref) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {/* Post Image */}
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
            {post.title}
          </h3>
          {post.rating && (
            <div className="flex items-center ml-4 flex-shrink-0">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                {post.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {/* Author */}
          <div className="flex items-center">
            <span className="font-medium">{post.author}</span>
          </div>

          {/* Date */}
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>

          {/* Category */}
          {post.category && (
            <div className="flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              <span className="capitalize">{post.category}</span>
            </div>
          )}

          {/* Price */}
          {post.price && (
            <div className="flex items-center font-semibold text-green-600 dark:text-green-400">
              <DollarSign className="h-3 w-3 mr-1" />
              <span>{formatPrice(post.price)}</span>
            </div>
          )}

          {/* Department */}
          {post.department && (
            <div className="flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                {post.department}
              </span>
            </div>
          )}

          {/* Age */}
          {post.age && (
            <div className="flex items-center">
              <span>Age: {post.age}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

PostCard.displayName = 'PostCard'

export default PostCard