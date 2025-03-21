"use client"

import { useState, useEffect } from "react"
import { getApplications } from "@/lib/client-data-fetching"
import { ApplicationData } from "@/types/types"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, CheckCircle2, Clock, XCircle, AlertCircle, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApplicationsPage() {
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState<ApplicationData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedApp, setSelectedApp] = useState<ApplicationData | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const response = await getApplications()
        
        if (response.error) {
          setError(response.error)
        } else {
          setApplications(response.applications || [])
        }
      } catch (err) {
        setError("Failed to load applications")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'pending':
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: string | undefined) => {
    switch (status) {
      case 'accepted':
        return "Accepted"
      case 'rejected':
        return "Rejected"
      case 'pending':
      default:
        return "Pending Review"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const openApplicationDetails = (app: ApplicationData) => {
    setSelectedApp(app)
    setShowDetails(true)
  }

  const closeApplicationDetails = () => {
    setShowDetails(false)
    setSelectedApp(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>
        <div className="text-center py-12">
          <p>Loading your applications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-bold">My Applications</h1>
      </div>

      {applications.length === 0 ? (
        <div className="bg-card border rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No Applications Yet</h2>
          <Button
            variant="outline"
            asChild
          >
            <Link
              href="/apply"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2"
            >
              Apply Now
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="grid grid-cols-10 bg-muted p-4 text-sm font-medium">
            <div className="col-span-4">Application</div>
            <div className="col-span-2">Applied On</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Actions</div>
          </div>
          
          {applications.map((app, index) => (
            <div key={app.id}>
              <div className="grid grid-cols-10 p-4 items-center text-sm">
                <div className="col-span-4 font-medium">AI Hackathon 3.0</div>
                <div className="col-span-2 text-muted-foreground">
                  {formatDate(app.created_at)}
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(app.status)}
                    <span>{getStatusText(app.status)}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => openApplicationDetails(app)}
                    className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors 
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                      disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground 
                      h-8 px-3 py-1"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </button>
                </div>
              </div>
              {index < applications.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      )}

      {/* Application Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button 
                  onClick={closeApplicationDetails}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Hackathon Information</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Event</p>
                        <p className="font-medium">AI Hackathon 3.0</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Applied On</p>
                        <p>{formatDate(selectedApp.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(selectedApp.status)}
                          <span>{getStatusText(selectedApp.status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Applicant Information</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">
                          {selectedApp.profiles?.first_name} {selectedApp.profiles?.last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">University</p>
                        <p>{selectedApp.profiles?.university || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Major</p>
                        <p>{selectedApp.profiles?.major || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Graduation Year</p>
                        <p>{selectedApp.profiles?.graduation_year || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Essay Responses</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Why do you want to participate in the AI Hackathon?</p>
                      <p className="whitespace-pre-wrap">{selectedApp.why_participate}</p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">Project Idea</p>
                      <p className="whitespace-pre-wrap">{selectedApp.project_idea}</p>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-sm text-muted-foreground mb-1">AI Experience</p>
                      <p className="whitespace-pre-wrap">{selectedApp.ai_experience}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={closeApplicationDetails}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
