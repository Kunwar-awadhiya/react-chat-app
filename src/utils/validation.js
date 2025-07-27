// Form validation utilities
export const validateLoginForm = (username, password) => {
  const errors = {}

  // Username validation
  if (!username || username.trim() === '') {
    errors.username = 'Username is required'
  } else if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters long'
  }

  // Password validation
  if (!password || password.trim() === '') {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

// Message validation for chat
export const validateMessage = (message) => {
  if (!message || message.trim() === '') {
    return {
      error: 'Message cannot be empty',
      isValid: false
    }
  }

  if (message.length > 500) {
    return {
      error: 'Message is too long (max 500 characters)',
      isValid: false
    }
  }

  return {
    error: null,
    isValid: true
  }
}