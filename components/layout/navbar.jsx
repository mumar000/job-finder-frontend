"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  ChevronDownIcon,
  SettingsIcon,
} from "@/components/ui/icons";

export function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left section - Logo & Mobile menu */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>

          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              JF
            </div>
            <span className="hidden font-bold text-xl sm:inline-block">
              Job Finder
            </span>
          </Link>
        </div>

        {/* Right section - Actions & User */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === "dark" ? (
              <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <BellIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-border mx-2" />

          {/* User menu */}
          <div className="relative ">
            <Button
              variant="ghost"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 h-10 px-3"
            >
              <div className="flex flex-row gap-4">
                {/* Avatar */}
                <div className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* Username + Chevron grouped */}
                <div className="flex items-center">
                  <span className="text-sm font-medium truncate max-w-[120px] leading-none">
                    {user?.email?.split("@")[0]}
                  </span>
                </div>
                <ChevronDownIcon className="w-4 h-4 opacity-60" />
              </div>
            </Button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-lg border bg-popover shadow-lg z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="px-3 py-3 border-b bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user?.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1">
                    <Link href="/dashboard/settings">
                      <button
                        className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </Link>
                    <button
                      className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent text-destructive transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
