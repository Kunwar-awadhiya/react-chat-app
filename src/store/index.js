import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import chatSlice from './slices/chatSlice'
import { authApi } from '../store/api/authApi'
import { postsApi } from '../store/api/PostsApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postsApi.middleware),
})