// Token storage utility with security considerations
export const tokenStorage = {
  // Store tokens securely
  setTokens: (accessToken, refreshToken) => {
    try {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
      console.error('Error storing tokens:', error)
    }
  },

  // Get access token
  getAccessToken: () => {
    try {
      return localStorage.getItem('accessToken')
    } catch (error) {
      console.error('Error retrieving access token:', error)
      return null
    }
  },

  // Get refresh token
  getRefreshToken: () => {
    try {
      return localStorage.getItem('refreshToken')
    } catch (error) {
      console.error('Error retrieving refresh token:', error)
      return null
    }
  },

  // Store user data
  setUser: (user) => {
    try {
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error('Error storing user data:', error)
    }
  },

  // Get user data
  getUser: () => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Error retrieving user data:', error)
      return null
    }
  },

  // Clear all stored data
  clearAll: () => {
    try {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Error clearing tokens:', error)
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!(tokenStorage.getAccessToken() && tokenStorage.getUser())
  }
}