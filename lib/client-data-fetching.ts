import { Profile } from "@/types/types"
import { createClient } from "@/utils/supabase/client"

export async function getApplicationStatus() {
  const supabase = await createClient()
  
  // Get user ID
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return false
  }
  
  // Check if user has already applied
  const { data, error } = await supabase
    .from('ai-3.0-applications')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    return false
  }
  
  if (!data) {
    return false
  }
  
  return true
}

export async function getApplications() {
  const supabase = await createClient()
  
  // Get user ID
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'User not authenticated' }
  }
  
  // In the future, fetch from all applications tables
  const { data, error } = await supabase
    .from('ai-3.0-applications')
    .select('*, profiles(*)')
    .eq('user_id', user.id)
  
  if (error) {
    return { error: error.message }
  }
  
  if (!data || data.length === 0) {
    return { applications: [] }
  }
  
  return { applications: data }
}

export async function getProfile() {
  const supabase = await createClient()
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'User not authenticated' }
  }

  // Get profile from the profiles table
  const { data: profileData, error } = await supabase
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
    firstName: profileData?.first_name || userData.first_name || '',
    lastName: profileData?.last_name || userData.last_name || '',
    email: user.email || '',
    university: profileData?.university || '',
    major: profileData?.major || '',
    graduationYear: profileData?.graduation_year || '',
    github: profileData?.github || '',
    linkedin: profileData?.linkedin || '',
  }

  return { profile }
}