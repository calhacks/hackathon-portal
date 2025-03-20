import { createClient } from "@/utils/supabase/client"
import { Profile } from "@/types/types"

// Client-side function to get profile
export async function getProfile() {
  const supabase = createClient()
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'User not authenticated' }
  }

  // Get profile from the profiles table
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
    return { error: error.message }
  }

  // Get user metadata for fallback
  const userData = user.user_metadata || {}

  // Return profile data or fallback to basic user data
  const profile: Profile = {
    firstName: data?.first_name || userData.first_name || '',
    lastName: data?.last_name || userData.last_name || '',
    email: user.email || '',
    university: data?.university || '',
    major: data?.major || '',
    graduationYear: data?.graduation_year || '',
    github: data?.github || '',
    linkedin: data?.linkedin || '',
  }

  return { profile }
}

export async function isProfileComplete() {
  const response = await getProfile()
  
  if (response.error || !response.profile) {
    return { complete: false, error: response.error || 'Profile not found' }
  }
  
  const profile = response.profile
  
  // Check if all required fields are filled
  const requiredFields = ['firstName', 'lastName', 'email', 'university', 'major', 'graduationYear']
  const complete = requiredFields.every(field => !!profile[field as keyof Profile])
  
  return { 
    complete,
    profile
  }
} 