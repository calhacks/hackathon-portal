'use server'

import { createClient } from '@/utils/supabase/server'
import { Profile } from '@/types/types'

export async function saveProfile(profile: Profile) {
  const supabase = await createClient()

  if (profile.graduationYear === 0 || profile.graduationYear === null) {
    profile.graduationYear = 2025
  }

  const payload = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    email: profile.email,
    university: profile.university,
    major: profile.major,
    graduation_year: profile.graduationYear,
    github: profile.github,
    linkedin: profile.linkedin,
  }

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'User not authenticated' }
  }

  // Update user metadata with name
  await supabase.auth.updateUser({
    data: {
      first_name: profile.firstName,
      last_name: profile.lastName,
    }
  })

  // Save profile to a profiles table
  const { error } = await supabase.from('profiles').update({
    user_id: user.id,
    ...payload,
    updated_at: new Date().toISOString(),
  }).eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Profile updated successfully' }
}
 