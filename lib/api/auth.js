import apiClient from './client'

/**
 * Authentication API Service
 */
export const authApi = {
  /**
   * Register new user
   * @param {Object} data - Registration data (email, password, confirmPassword)
   * @returns {Promise<Object>} User object and token
   */
  async register(data) {
    const response = await apiClient.post('/auth/register', data)
    if (response.data?.token) {
      apiClient.setToken(response.data.token)
    }
    return response.data
  },

  /**
   * Login user
   * @param {Object} data - Login credentials (email, password)
   * @returns {Promise<Object>} User object and token
   */
  async login(data) {
    const response = await apiClient.post('/auth/login', data)
    if (response.data?.token) {
      apiClient.setToken(response.data.token)
    }
    return response.data
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} Current user object
   */
  async getMe() {
    const response = await apiClient.get('/auth/me')
    return response.data
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
