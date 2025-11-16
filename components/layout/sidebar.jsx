'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { NAVIGATION_ITEMS } from '@/lib/constants'
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  FileTextIcon,
  BarChartIcon,
  SettingsIcon,
} from '@/components/ui/icons'

const iconMap = {
  LayoutDashboard: LayoutDashboardIcon,
  Briefcase: BriefcaseIcon,
  FileText: FileTextIcon,
  BarChart: BarChartIcon,
  Settings: SettingsIcon,
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 border-r min-h-[calc(100vh-4rem)] flex-col bg-muted/10">
      <nav className="flex-1 p-3 space-y-0.5">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          // Improved route matching logic
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-transform group-hover:scale-110',
                      isActive && 'scale-105'
                    )}
                  />
                )}
                <span>{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t bg-muted/20">
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 border border-primary/20">
          <p className="text-xs font-semibold text-foreground mb-1">
            Need help?
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Check our documentation
          </p>
          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
            View Docs
          </Button>
        </div>
      </div>
    </aside>
  )
}

export function MobileSidebar({ isOpen, onClose }) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
      <aside className="fixed left-0 top-16 z-50 w-72 border-r bg-background min-h-[calc(100vh-4rem)] flex flex-col md:hidden shadow-xl">
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = iconMap[item.icon]
            // Improved route matching logic
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={onClose}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        'w-5 h-5 transition-transform group-hover:scale-110',
                        isActive && 'scale-105'
                      )}
                    />
                  )}
                  <span>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Sidebar Footer */}
        <div className="p-3 border-t bg-muted/20">
          <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 border border-primary/20">
            <p className="text-xs font-semibold text-foreground mb-1">
              Need help?
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Check our documentation
            </p>
            <Button variant="outline" size="sm" className="w-full h-8 text-xs">
              View Docs
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
