import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  isOpen: false,
  isConnected: false,
  connectionError: null,
  isTyping: false
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen
    },
    openChat: (state) => {
      state.isOpen = true
    },
    closeChat: (state) => {
      state.isOpen = false
    },
    addMessage: (state, action) => {
      const message = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload
      }
      state.messages.push(message)
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload
      if (action.payload) {
        state.connectionError = null
      }
    },
    setConnectionError: (state, action) => {
      state.connectionError = action.payload
      state.isConnected = false
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
    }
  }
})

export const {
  toggleChat,
  openChat,
  closeChat,
  addMessage,
  setConnectionStatus,
  setConnectionError,
  setTyping,
  clearMessages
} = chatSlice.actions

export default chatSlice.reducer