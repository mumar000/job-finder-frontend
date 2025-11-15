'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Theme Provider Component
 * Wraps the application with next-themes for dark/light mode support
 */
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
