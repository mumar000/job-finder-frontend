import apiClient from './client'

/**
 * Jobs API Service
 * Backend response format: { success: true, data: {...}, message: "...", timestamp: "...", meta: {...} }
 */
export const jobsApi = {
  /**
   * Get jobs list with filters and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Jobs list with pagination metadata
   */
  async getJobs(params = {}) {
    const response = await apiClient.get('/jobs', params)
    console.log('Get jobs response:', response)

    // Backend returns: { success: true, data: [...], meta: { pagination: {...} }, message: "..." }
    return response
  },

  /**
   * Get single job by ID
   * @param {string} id - Job ID
   * @returns {Promise<Object>} Job object
   */
  async getJob(id) {
    const response = await apiClient.get(`/jobs/${id}`)
    console.log('Get job response:', response)

    // Backend returns: { success: true, data: { job: {...} }, message: "..." }
    return response.data?.job || response.data || {}
  },

  /**
   * Get job statistics
   * @returns {Promise<Object>} Job statistics
   */
  async getJobStats() {
    const response = await apiClient.get('/jobs/stats')
    console.log('Get job stats response:', response)

    // Backend returns: { success: true, data: { stats: {...} }, message: "..." }
    return response.data || {}
  },

  /**
   * Update job status
   * @param {string} id - Job ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated job object
   */
  async updateJobStatus(id, status) {
    const response = await apiClient.put(`/jobs/${id}/status`, { status })
    console.log('Update job status response:', response)

    // Backend returns: { success: true, data: { job: {...} }, message: "..." }
    return response.data?.job || response.data || {}
  },

  /**
   * Update job details (notes, tags, etc.)
   * @param {string} id - Job ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated job object
   */
  async updateJob(id, data) {
    const response = await apiClient.put(`/jobs/${id}`, data)
    console.log('Update job response:', response)

    // Backend returns: { success: true, data: { job: {...} }, message: "..." }
    return response.data?.job || response.data || {}
  },

  /**
   * Delete/archive job
   * @param {string} id - Job ID
   * @returns {Promise<void>}
   */
  async deleteJob(id) {
    const response = await apiClient.delete(`/jobs/${id}`)
    console.log('Delete job response:', response)

    // Backend returns 204 No Content
    return response
  },
}

export default jobsApi
