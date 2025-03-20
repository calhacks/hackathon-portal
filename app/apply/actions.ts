'use server'

import { createClient } from '@/utils/supabase/server'
import { Application } from '@/types/types'

export async function apply(application: Application) {
  const supabase = await createClient()

  // Check if application is complete
  if (!application.profile.firstName
    || !application.profile.lastName
    || !application.profile.email
    || !application.profile.university
    || !application.profile.major
    || !application.profile.graduationYear) {
    return { error: 'Please complete your profile before applying' }
  }
  if (!application.essay1 || !application.essay2 || !application.essay3) {
    return { error: 'Please complete all essays before applying' }
  }

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not authenticated' }
  }

  // Get user profile (for profile_id)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (profileError) {
    return { error: profileError.message }
  }

  const payload = {
    user_id: user.id,
    profile_id: profile.id,
    why_participate: application.essay1,
    project_idea: application.essay2,
    ai_experience: application.essay3,
  }

  const { error } = await supabase.from('ai-3.0-applications').insert(payload)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Application submitted successfully' }
}