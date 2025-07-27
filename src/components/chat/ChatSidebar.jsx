import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send, Wifi, WifiOff, X } from 'lucide-react';
import { closeChat, clearMessages } from '../../store/slices/chatSlice';
import { useWebSocket } from '../../hooks/useWebSocket';
import { validateMessage } from '../../utils/validation';
import MessageList from './MessageList';
import LoadingSpinner from '../common/LoadingSpinner';

const ChatSidebar = () => {
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const { isOpen, connectionError } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  // WebSocket
  const { sendMessage, getConnectionState } = useWebSocket('wss://echo.websocket.events');
  const connectionState = getConnectionState();
  const isConnected = connectionState === 'OPEN';
  const isConnecting = connectionState === 'CONNECTING';

  const handleClose = () => {
    dispatch(closeChat());
  };

  const handleClearMessages = () => {
    dispatch(clearMessages());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const validation = validateMessage(message);
    if (!validation.isValid) {
      setMessageError(validation.error);
      return;
    }

    setMessageError('');
    const success = sendMessage(message.trim());

    if (success) {
      setMessage('');
    } else {
      setMessageError('Failed to send message. Please check your connection.');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (messageError) setMessageError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div
              className={`h-3 w-3 rounded-full ${
                isConnected ? 'bg-green-400' : isConnecting ? 'bg-yellow-400' : 'bg-red-400'
              }`}
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat</h2>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              {isConnected ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              <span className="ml-1">
                {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearMessages}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Connection Error */}
        {connectionError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-300">{connectionError}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col h-full">
          <MessageList />

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {messageError && (
              <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded">
                {messageError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
                  disabled={!isConnected}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  rows="2"
                  maxLength="500"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{message.length}/500</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Press Enter to send</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isConnected || !message.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {!isConnected ? <LoadingSpinner size="sm" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
