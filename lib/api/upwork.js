import apiClient from './client'

/**
 * Upwork Integration API Service
 * Backend response format: { success: true, data: {...}, message: "...", timestamp: "..." }
 */
export const upworkApi = {
  /**
   * Get Upwork OAuth connection URL
   * @returns {Promise<Object>} { authUrl: string }
   */
  async getConnectUrl() {
    const response = await apiClient.get('/upwork/connect')
    console.log('Get connect URL response:', response)

    // Backend returns: { success: true, data: { authUrl: "..." }, message: "..." }
    return response.data || {}
  },

  /**
   * Sync Upwork profile manually
   * @returns {Promise<Object>} Updated profile data
   */
  async syncProfile() {
    const response = await apiClient.post('/upwork/sync')
    console.log('Sync profile response:', response)

    // Backend returns: { success: true, data: { skills, hourly_rate, bio }, message: "..." }
    return response.data || {}
  },

  /**
   * Disconnect Upwork account
   * @returns {Promise<void>}
   */
  async disconnect() {
    const response = await apiClient.post('/upwork/disconnect')
    console.log('Disconnect response:', response)

    // Backend returns: { success: true, data: null, message: "..." }
    return response
  },

  /**
   * Get Upwork connection status
   * @returns {Promise<Object>} { connected: boolean }
   */
  async getStatus() {
    const response = await apiClient.get('/upwork/status')
    console.log('Get status response:', response)

    // Backend returns: { success: true, data: { connected: true/false }, message: "..." }
    return response.data || { connected: false }
  },
}

export default upworkApi
