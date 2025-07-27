import React from 'react'
import TopNavBar from '../components/navigation/TopNavBar'
import InfiniteScrollFeed from '../components/feed/InfiniteScrollFeed'
import ChatButton from '../components/chat/ChatButton'
import ChatSidebar from '../components/chat/ChatSidebar'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <TopNavBar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InfiniteScrollFeed />
      </main>
      
      {/* Chat Components */}
      <ChatButton />
      <ChatSidebar />
    </div>
  )
}

export default HomePage