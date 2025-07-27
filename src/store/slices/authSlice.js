import { createSlice } from '@reduxjs/toolkit'
import { tokenStorage } from '../../utils/tokenStorage'

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true for auto-login check
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      
      // Store tokens securely
      tokenStorage.setTokens(accessToken, refreshToken)
      tokenStorage.setUser(user)
    },
    loginFailure: (state, action) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
      
      // Clear any existing tokens
      tokenStorage.clearAll()
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      
      // Clear stored tokens
      tokenStorage.clearAll()
    },
    restoreAuth: (state) => {
      // Check if user is already logged in
      const storedUser = tokenStorage.getUser()
      const storedAccessToken = tokenStorage.getAccessToken()
      const storedRefreshToken = tokenStorage.getRefreshToken()
      
      if (storedUser && storedAccessToken && storedRefreshToken) {
        state.user = storedUser
        state.accessToken = storedAccessToken
        state.refreshToken = storedRefreshToken
        state.isAuthenticated = true
      }
      
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
    refreshTokenSuccess: (state, action) => {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      if (refreshToken) {
        state.refreshToken = refreshToken
      }
      
      // Update stored tokens
      tokenStorage.setTokens(accessToken, refreshToken || state.refreshToken)
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreAuth,
  clearError,
  refreshTokenSuccess
} = authSlice.actions

export default authSlice.reducer