import React from 'react'
import { AlertCircle, X } from 'lucide-react'

const ErrorMessage = ({ message, onClose, className = '' }) => {
  if (!message) return null

  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-center justify-between ${className}`}>
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
        <span className="text-sm">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 transition-colors"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default ErrorMessage