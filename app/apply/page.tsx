"use client"

import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { apply } from "./actions"
import { Application, Profile } from "@/types/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { isProfileComplete } from "../profile/client-utils"
import { getApplicationStatus } from "@/lib/client-data-fetching"

export default function ApplicationsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profileStatus, setProfileStatus] = useState<{
    complete: boolean;
    profile?: Profile;
    error?: string;
  }>({ complete: false })
  
  const [applicationStatus, setApplicationStatus] = useState<boolean>(false)
  
  const [formData, setFormData] = useState<Application>({
    profile: {
      firstName: "",
      lastName: "",
      email: "",
      university: "",
      major: "",
      graduationYear: 0,
      github: "",
      linkedin: "",
      portfolio: "",
      phone: "",
      instagram: "",
      discord: "",
      twitter: "",
    },
    essay1: "",
    essay2: "",
    essay3: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Check profile completion
        const profileResp = await isProfileComplete()
        setProfileStatus(profileResp)
        
        if (profileResp.profile) {
          setFormData(prev => ({
            ...prev,
            profile: profileResp.profile as Profile
          }))
        }
        
        // Get application status
        const appStatus = await getApplicationStatus()
        setApplicationStatus(appStatus)
        
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!profileStatus.complete) {
      toast.error("Please complete your profile before applying")
      router.push("/profile")
      return
    }
    
    try {
      setLoading(true)
      const result = await apply(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success)
        setApplicationStatus(true)
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto my-8 text-center">
        <p>Loading application status...</p>
      </div>
    )
  }

  if (applicationStatus) {
    return (
      <div className="container max-w-3xl mx-auto my-8">
        <div className="bg-card rounded-lg border shadow-sm p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold tracking-tight mb-6">Application Submitted</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Thank you for applying to the UC Berkeley AI Hackathon 3.0!
          </p>
          <p className="text-lg text-muted-foreground">
            Check out your application status on <Link href="/applications" className="font-medium underline">My Applications</Link> page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold tracking-tight">UC Berkeley AI Hackathon 3.0</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Submit your application for the upcoming hackathon
        </p>
      </div>

      {!profileStatus.complete && (
        <div className="mb-6 p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950 dark:border-amber-600">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-1 flex-shrink-0" />
            <div className="flex-col w-full">
              <div className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Incomplete Profile
              </div>
              <div className="text-amber-700 dark:text-amber-400">
                Please{" "}
                <Link 
                  href="/profile" 
                  className="font-medium text-amber-900 dark:text-amber-200 underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-100 transition-colors"
                >
                  complete your profile
                </Link>{" "}
                before applying for the hackathon.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              <Link href="/profile" className="text-blue-500 hover:underline text-sm">
                Edit Profile
              </Link>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">First Name</p>
                  <p>{formData.profile.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                  <p>{formData.profile.lastName}</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{formData.profile.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">University</p>
                  <p>{formData.profile.university}</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Major</p>
                  <p>{formData.profile.major}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Graduation Year</p>
                  <p>{formData.profile.graduationYear}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Essay Questions */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Essay Questions</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="whyParticipate" className="block text-base font-medium mb-2">
                  Why do you want to participate in the AI Hackathon? (250 words max)
                </label>
                <Textarea
                  id="whyParticipate"
                  name="essay1"
                  value={formData.essay1}
                  onChange={handleChange}
                  rows={5}
                  required
                  maxLength={1500}
                  placeholder="Share your motivation for participating in the hackathon..."
                  className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.essay1.length}/1500 characters
                </p>
              </div>
              
              <div>
                <label htmlFor="projectIdea" className="block text-base font-medium mb-2">
                  Describe a potential project idea you might work on during the hackathon. (250 words max)
                </label>
                <Textarea
                  id="projectIdea"
                  name="essay2"
                  value={formData.essay2}
                  onChange={handleChange}
                  rows={5}
                  required
                  maxLength={1500}
                  placeholder="Outline your project idea, including technologies you'd like to use..."
                  className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.essay2.length}/1500 characters
                </p>
              </div>
              
              <div>
                <label htmlFor="aiExperience" className="block text-base font-medium mb-2">
                  What is your experience with AI and machine learning? (250 words max)
                </label>
                <Textarea
                  id="aiExperience"
                  name="essay3"
                  value={formData.essay3}
                  onChange={handleChange}
                  rows={5}
                  required
                  maxLength={1500}
                  placeholder="Describe your background with AI, including any projects, courses, or tools you've used..."
                  className="w-full h-40 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.essay3.length}/1500 characters
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !profileStatus.complete}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md 
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg
                 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            {!profileStatus.complete && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Please complete your profile before applying
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
