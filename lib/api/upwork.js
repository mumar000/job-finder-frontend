import apiClient from './client'

/**
 * Upwork Integration API Service
 */
export const upworkApi = {
  /**
   * Get Upwork OAuth connection URL
   * @returns {Promise<string>} Authorization URL
   */
  async getConnectUrl() {
    const response = await apiClient.get('/upwork/connect')
    return response.data.authUrl
  },

  /**
   * Sync Upwork profile manually
   * @returns {Promise<Object>} Updated profile data
   */
  async syncProfile() {
    const response = await apiClient.post('/upwork/sync')
    return response.data
  },

  /**
   * Disconnect Upwork account
   * @returns {Promise<void>}
   */
  async disconnect() {
    const response = await apiClient.post('/upwork/disconnect')
    return response.data
  },

  /**
   * Get Upwork connection status
   * @returns {Promise<Object>} Connection status
   */
  async getStatus() {
    const response = await apiClient.get('/upwork/status')
    return response.data
  },
}

export default upworkApi
