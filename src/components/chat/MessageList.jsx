import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { User, Bot, MessageCircle } from 'lucide-react'

const MessageList = () => {
  const { messages, isTyping } = useSelector((state) => state.chat)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start a conversation
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Send a message to test the WebSocket echo server
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-xs lg:max-w-md ${
            message.type === 'sent' ? 'flex-row-reverse' : 'flex-row'
          }`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 ${
              message.type === 'sent' ? 'ml-2' : 'mr-2'
            }`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                message.type === 'sent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}>
                {message.type === 'sent' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
            </div>

            {/* Message bubble */}
            <div className={`px-4 py-2 rounded-lg ${
              message.type === 'sent'
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'
            }`}>
              <p className="text-sm break-words">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'sent'
                  ? 'text-blue-200'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex mr-2">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg rounded-bl-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Scroll target */}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList