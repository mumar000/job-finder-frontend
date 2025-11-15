'use client'

import { useState, useEffect, useCallback } from 'react'
import { jobsApi } from '@/lib/api'

/**
 * useJobs Hook
 * Manage jobs data with filters and pagination
 * @param {Object} initialFilters - Initial filter values
 * @returns {Object} Jobs state and methods
 */
export function useJobs(initialFilters = {}) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    sort_by: 'match_score',
    sort_order: 'desc',
    ...initialFilters,
  })
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  })

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobsApi.getJobs(filters)
      setJobs(response.data || [])
      setMeta(response.meta || meta)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch jobs:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1, // Reset to page 1 on filter change
    }))
  }

  const nextPage = () => {
    if (filters.page < meta.totalPages) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
    }
  }

  const prevPage = () => {
    if (filters.page > 1) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
    }
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= meta.totalPages) {
      setFilters((prev) => ({ ...prev, page }))
    }
  }

  const refresh = () => {
    fetchJobs()
  }

  return {
    jobs,
    loading,
    error,
    filters,
    meta,
    updateFilters,
    nextPage,
    prevPage,
    goToPage,
    refresh,
  }
}

/**
 * useJobDetail Hook
 * Fetch and manage single job details
 * @param {string} jobId - Job ID
 * @returns {Object} Job state and methods
 */
export function useJobDetail(jobId) {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJob = useCallback(async () => {
    if (!jobId) return

    try {
      setLoading(true)
      setError(null)
      const data = await jobsApi.getJob(jobId)
      setJob(data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch job:', err)
    } finally {
      setLoading(false)
    }
  }, [jobId])

  useEffect(() => {
    fetchJob()
  }, [fetchJob])

  const updateJobStatus = async (status) => {
    try {
      const updatedJob = await jobsApi.updateJobStatus(jobId, status)
      setJob(updatedJob)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const updateJob = async (data) => {
    try {
      const updatedJob = await jobsApi.updateJob(jobId, data)
      setJob(updatedJob)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const refresh = () => {
    fetchJob()
  }

  return {
    job,
    loading,
    error,
    updateJobStatus,
    updateJob,
    refresh,
  }
}
