'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

/**
 * Toast Provider Component
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      title: toast.title || '',
      description: toast.description || '',
      variant: toast.variant || 'default',
      duration: toast.duration || 5000,
      ...toast,
    }

    setToasts((prev) => [...prev, newToast])

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    (props) => {
      if (typeof props === 'string') {
        return addToast({ description: props })
      }
      return addToast(props)
    },
    [addToast]
  )

  const success = useCallback(
    (props) => {
      const toastProps = typeof props === 'string' ? { description: props } : props
      return addToast({ ...toastProps, variant: 'success' })
    },
    [addToast]
  )

  const error = useCallback(
    (props) => {
      const toastProps = typeof props === 'string' ? { description: props } : props
      return addToast({ ...toastProps, variant: 'destructive' })
    },
    [addToast]
  )

  const warning = useCallback(
    (props) => {
      const toastProps = typeof props === 'string' ? { description: props } : props
      return addToast({ ...toastProps, variant: 'warning' })
    },
    [addToast]
  )

  const info = useCallback(
    (props) => {
      const toastProps = typeof props === 'string' ? { description: props } : props
      return addToast({ ...toastProps, variant: 'default' })
    },
    [addToast]
  )

  const value = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

/**
 * useToast Hook
 * Display toast notifications
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
