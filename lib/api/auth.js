import apiClient from './client'

/**
 * Authentication API Service
 * Backend response format: { success: true, data: {...}, message: "...", timestamp: "..." }
 */
export const authApi = {
  /**
   * Register new user
   * @param {Object} data - Registration data (email, password, confirmPassword)
   * @returns {Promise<Object>} { user: {...}, token: "..." }
   */
  async register(data) {
    const response = await apiClient.post('/auth/register', data)
    console.log('Register response:', response)

    // Backend returns: { success: true, data: { user, token }, message: "...", timestamp: "..." }
    const result = response.data || {}

    if (result.token) {
      apiClient.setToken(result.token)
    }

    return result
  },

  /**
   * Login user
   * @param {Object} data - Login credentials (email, password)
   * @returns {Promise<Object>} { user: {...}, token: "..." }
   */
  async login(data) {
    const response = await apiClient.post('/auth/login', data)
    console.log('Login response:', response)

    // Backend returns: { success: true, data: { user, token }, message: "...", timestamp: "..." }
    const result = response.data || {}

    if (result.token) {
      apiClient.setToken(result.token)
    }

    return result
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} Current user object
   */
  async getMe() {
    const response = await apiClient.get('/auth/me')
    console.log('Get me response:', response)

    // Backend returns: { success: true, data: { user }, message: "...", timestamp: "..." }
    return response.data?.user || response.data || {}
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      apiClient.removeToken()
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated() {
    return !!apiClient.getToken()
  },
}

export default authApi
