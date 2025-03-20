'use client'

import { login, signup } from './actions'
import { useState } from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center gap-8">
          {!showSignup ? (
            <div className="text-center mb-6">
              <h2 className="text-4xl font-semibold text-gray-800 dark:text-white">Welcome Back, Hacker!</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mt-1">Sign in to your Hackathons @ Berkeley account</p>
            </div>
          ) : (
            <div className="text-center mb-6">
              <h2 className="text-4xl font-semibold text-gray-800 dark:text-white">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mt-1">Sign up for a new account</p>
            </div>

          )}

          <div className="flex flex-row items-center justify-center gap-8 w-full">
            <Image src="/coding-ddoski.svg" alt="Bear Coding" width={300} height={300} />
            <Separator orientation="vertical" className="h-full" />
            <div className="flex flex-col items-center justify-center">
              {!showSignup ? (
                <>
                  <form className="space-y-5 w-80">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      formAction={login}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md 
                         transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Log in
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center space-y-2 text-sm">
                    <button
                      onClick={() => setShowSignup(true)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Create an account
                    </button>
                    <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      Forgot your password?
                    </a>
                  </div>
                </>
              ) : (
                <>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                             dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                             dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        id="signup-email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        id="signup-password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      formAction={signup}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md 
                         transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sign up
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowSignup(false)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      Already have an account? Log in
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}