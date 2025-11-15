'use client'

import { useState, useEffect } from 'react'

/**
 * useMediaQuery Hook
 * Track media query matches
 * @param {string} query - Media query string
 * @returns {boolean} Whether query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (e) => setMatches(e.matches)

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    }
    // Legacy browsers
    else {
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [matches, query])

  return matches
}

/**
 * Responsive breakpoint hooks
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)')
}
