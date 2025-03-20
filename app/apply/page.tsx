"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Separator } from "@/components/ui/separator"

export default function ApplicationsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    major: "",
    graduationYear: "",
    github: "",
    linkedin: "",
    resume: null as File | null,
    experience: "",
    projectIdea: "",
    whyParticipate: "",
  })

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
    // Form submission logic would go here
    alert("Application submitted! (This is just a placeholder)")
    console.log(formData)
  }
  
  return (
    <div className="container max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">UC Berkeley AI Hackathon 3.0</h1>
        <p className="text-muted-foreground mt-2">
          Submit your application for the upcoming hackathon
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <Separator />

          {/* Academic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="block text-sm font-medium mb-1">
                  University
                </label>
                <input
                  id="university"
                  name="university"
                  type="text"
                  required
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white"
                  placeholder="UC Berkeley"
                />
              </div>
              <div>
                <label htmlFor="major" className="block text-sm font-medium mb-1">
                  Major
                </label>
                <input
                  id="major"
                  name="major"
                  type="text"
                  required
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white"
                  placeholder="Computer Science"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="graduationYear" className="block text-sm font-medium mb-1">
                Expected Graduation Year
              </label>
              <input
                id="graduationYear"
                name="graduationYear"
                type="text"
                required
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white"
                placeholder="2025"
              />
            </div>
          </div>

          <Separator />

          {/* Professional Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="github" className="block text-sm font-medium mb-1">
                  GitHub Profile
                </label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
                  LinkedIn Profile
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                     dark:bg-gray-800 dark:text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="resume" className="block text-sm font-medium mb-1">
                Resume (PDF)
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <Separator />

          {/* Hackathon Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Hackathon Information</h2>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium mb-1">
                Previous AI/ML Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white"
                placeholder="Describe your previous experience with AI/ML projects"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="projectIdea" className="block text-sm font-medium mb-1">
                Project Idea (Optional)
              </label>
              <textarea
                id="projectIdea"
                name="projectIdea"
                rows={3}
                value={formData.projectIdea}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white"
                placeholder="Briefly describe a project idea for the hackathon"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="whyParticipate" className="block text-sm font-medium mb-1">
                Why do you want to participate?
              </label>
              <textarea
                id="whyParticipate"
                name="whyParticipate"
                rows={3}
                required
                value={formData.whyParticipate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:text-white"
                placeholder="Tell us why you want to participate in the hackathon"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md 
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
