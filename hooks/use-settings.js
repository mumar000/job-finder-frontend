'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { upworkApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

/**
 * Settings Hook
 * Manages all settings-related state and logic
 */
export function useSettings() {
  const [upworkStatus, setUpworkStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  /**
   * Check Upwork connection status
   */
  const checkUpworkStatus = async () => {
    try {
      setLoading(true)
      const data = await upworkApi.getStatus()
      console.log('Upwork status:', data)
      setUpworkStatus(data)
    } catch (error) {
      console.error('Failed to check Upwork status:', error)
      toast({
        title: 'Error',
        description: 'Failed to load Upwork status',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle OAuth callback from URL params
   */
  const handleOAuthCallback = () => {
    const upworkParam = searchParams.get('upwork')
    const messageParam = searchParams.get('message')

    if (upworkParam === 'connected') {
      toast({
        title: 'Success!',
        description: 'Your Upwork account has been connected successfully.',
        variant: 'success',
      })
      // Refresh status
      checkUpworkStatus()
      // Remove query params from URL
      window.history.replaceState({}, '', '/dashboard/settings')
    } else if (upworkParam === 'error') {
      toast({
        title: 'Connection Failed',
        description: messageParam || 'Failed to connect to Upwork. Please try again.',
        variant: 'destructive',
      })
      // Remove query params from URL
      window.history.replaceState({}, '', '/dashboard/settings')
    }
  }

  /**
   * Initialize settings data
   */
  useEffect(() => {
    checkUpworkStatus()
    handleOAuthCallback()
  }, [searchParams])

  /**
   * Connect to Upwork
   */
  const connectUpwork = async () => {
    try {
      setConnecting(true)
      const data = await upworkApi.getConnectUrl()

      // Redirect to Upwork OAuth page
      if (data.authUrl) {
        window.location.href = data.authUrl
      } else {
        throw new Error('No authorization URL received')
      }
    } catch (error) {
      console.error('Failed to get Upwork connection URL:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to connect to Upwork. Please try again.',
        variant: 'destructive',
      })
      setConnecting(false)
    }
  }

  /**
   * Disconnect from Upwork
   */
  const disconnectUpwork = async () => {
    if (!confirm('Are you sure you want to disconnect your Upwork account?')) {
      return
    }

    try {
      setDisconnecting(true)
      await upworkApi.disconnect()
      setUpworkStatus({ connected: false })
      toast({
        title: 'Success',
        description: 'Your Upwork account has been disconnected.',
        variant: 'success',
      })
    } catch (error) {
      console.error('Failed to disconnect Upwork:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to disconnect Upwork. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setDisconnecting(false)
    }
  }

  /**
   * Sync Upwork profile
   */
  const syncUpworkProfile = async () => {
    try {
      setSyncing(true)
      await upworkApi.syncProfile()
      toast({
        title: 'Success',
        description: 'Your Upwork profile has been synced successfully.',
        variant: 'success',
      })
    } catch (error) {
      console.error('Failed to sync Upwork profile:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to sync profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSyncing(false)
    }
  }

  return {
    // State
    upworkStatus,
    loading,
    connecting,
    syncing,
    disconnecting,
    isUpworkConnected: upworkStatus?.connected || false,

    // Actions
    connectUpwork,
    disconnectUpwork,
    syncUpworkProfile,
    checkUpworkStatus,
  }
}
