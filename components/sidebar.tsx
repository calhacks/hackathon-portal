"use client"

import { cn } from "@/lib/utils"
import { LogOut, Globe, Moon, Sun, FileText, Settings, Users, Library, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useTheme } from "next-themes"
import { logout } from "@/app/login/actions"
import { useEffect, useState } from "react"

const sidebarNavItems = [
  {
    title: "Apply",
    href: "/apply",
    icon: FileText,
  },
  {
    title: "My Applications",
    href: "/applications",
    icon: Library,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: Users,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-screen border-r bg-sidebar text-sidebar-foreground w-64 fixed left-0 top-0">
      <div className="flex h-full flex-col p-4">
        <div className="px-4 pb-4">
          <Image src="/logo/logo.webp" alt="Hackathons @ Berkeley" width={130} height={100} />
        </div>
        <Separator className="bg-sidebar-border" />
        <div className="flex-1 py-6">
          <nav className="grid grid-flow-row auto-rows-max gap-2 text-lg">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex w-full items-center rounded-md px-3 py-2 transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="bg-sidebar-border" />
        <div className="flex justify-center space-x-6 py-4">
          <Link
            href="https://calhacks.io"
            className="rounded-md p-2 transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="h-5 w-5" />
          </Link>
          <Link
            href="/faq"
            className="rounded-md p-2 transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <HelpCircle className="h-5 w-5" />
          </Link>
          <button
            className="rounded-md p-2 transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </button>
          <button
            className="rounded-md p-2 transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 