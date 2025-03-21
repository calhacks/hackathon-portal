import { createClient } from "@/utils/supabase/client"
import { Profile } from "@/types/types"
import { getProfile } from "@/lib/client-data-fetching"

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