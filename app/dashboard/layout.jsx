'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useAuth } from '@/hooks/use-auth'
import { AuthGuard } from '@/components/auth/auth-guard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  FileTextIcon,
  BarChartIcon,
  SettingsIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  LogOutIcon,
  ChevronDownIcon,
} from '@/components/ui/icons'

const iconMap = {
  LayoutDashboard: LayoutDashboardIcon,
  Briefcase: BriefcaseIcon,
  FileText: FileTextIcon,
  BarChart: BarChartIcon,
  Settings: SettingsIcon,
}

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthGuard>
  )
}

function DashboardLayoutContent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <XIcon /> : <MenuIcon />}
          </Button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="font-bold text-xl">Job Finder</div>
          </Link>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon">
              <BellIcon />
            </Button>

            {/* User menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden md:inline">{user?.email}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg z-50">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user?.email}
                    </div>
                    <div className="h-px bg-border my-1" />
                    <Link href="/dashboard/settings">
                      <button
                        className="w-full flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </Link>
                    <button
                      className="w-full flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 border-r min-h-[calc(100vh-4rem)] flex-col">
          <nav className="flex-1 p-4 space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = iconMap[item.icon]
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-16 z-50 w-64 border-r bg-background min-h-[calc(100vh-4rem)] flex-col md:hidden">
              <nav className="flex-1 p-4 space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                  const Icon = iconMap[item.icon]
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={cn(
                          'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
