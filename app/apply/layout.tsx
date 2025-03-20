import { Sidebar } from "@/components/sidebar"

interface ApplicationsLayoutProps {
  children: React.ReactNode
}

export default function ApplicationsLayout({ children }: ApplicationsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-6">
        {children}
      </div>
    </div>
  )
}
