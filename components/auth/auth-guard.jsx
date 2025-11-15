'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/constants'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * AuthGuard Component
 * Protects content from unauthenticated users
 */
export function AuthGuard({ children, fallback = null }) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(ROUTES.LOGIN)
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return fallback || <LoadingFallback />
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

/**
 * Default loading fallback
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
