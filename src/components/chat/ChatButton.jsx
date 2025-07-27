import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MessageCircle, X } from 'lucide-react'
import { toggleChat } from '../../store/slices/chatSlice'

const ChatButton = () => {
  const { isOpen, isConnected, messages } = useSelector((state) => state.chat)
  const dispatch = useDispatch()

  const handleToggleChat = () => {
    dispatch(toggleChat())
  }

  // Count unread messages (for demo purposes, we'll consider all received messages as unread)
  const unreadCount = messages.filter(msg => msg.type === 'received').length

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleToggleChat}
        className={`relative p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${
          isOpen
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Connection status indicator */}
        <div className={`absolute -top-1 -left-1 h-3 w-3 rounded-full border-2 border-white ${
          isConnected ? 'bg-green-400' : 'bg-red-400'
        }`} />
        
        {/* Unread messages badge */}
        {!isOpen && unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}

        {/* Icon */}
        <div className="relative">
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </div>

        {/* Pulse animation when not connected */}
        {!isConnected && !isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-600 opacity-75 animate-ping" />
        )}
      </button>
    </div>
  )
}

export default ChatButton