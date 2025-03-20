"use client"

import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Profile } from "@/types/types"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { saveProfile } from "./actions"
import { getProfile } from "./client-utils"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    major: "",
    graduationYear: 2025,
    github: "",
    linkedin: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await getProfile()
        if (response.profile) {
          setFormData(response.profile)
        } else if (response.error) {
          toast.error(response.error)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await saveProfile(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success)
        router.refresh()
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to save profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Update your profile information
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-base font-medium mb-1">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-base font-medium mb-1">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-base font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white text-base"
                placeholder="you@example.com"
                disabled={true}
              />
            </div>
          </div>

          <Separator />

          {/* Academic Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="block text-base font-medium mb-1">
                  University
                </label>
                <Input
                  id="university"
                  name="university"
                  type="text"
                  required
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                  placeholder="UC Berkeley"
                />
              </div>
              <div>
                <label htmlFor="major" className="block text-base font-medium mb-1">
                  Major
                </label>
                <Input
                  id="major"
                  name="major"
                  type="text"
                  required
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                  placeholder="Computer Science"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="graduationYear" className="block text-base font-medium mb-1">
                Expected Graduation Year
              </label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                required
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white text-base"
                placeholder="2025"
              />
            </div>
          </div>

          <Separator />

          {/* Professional Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Professional Information (Optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="github" className="block text-base font-medium mb-1">
                  GitHub Profile
                </label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-base font-medium mb-1">
                  LinkedIn Profile
                </label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white text-base"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
            {/* <div className="mt-4">
              <label htmlFor="resume" className="block text-base font-medium mb-1">
                Resume (PDF)
              </label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white text-base"
              />
              {formData.resume && (
                <p className="mt-2 text-sm text-green-600">
                  Resume uploaded: {typeof formData.resume === 'object' ? formData.resume.name : 'Resume on file'}
                </p>
              )}
            </div> */}
          </div>

          <Separator />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md 
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg
                 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 