'use server'

import { createClient } from '@/utils/supabase/server'
import { Application } from '@/types/types'

export async function apply(application: Application) {
  const supabase = await createClient()

  const payload = {
    first_name: application.firstName,
    last_name: application.lastName,
    email: application.email,
    university: application.university,
    major: application.major,
    graduation_year: application.graduationYear,
    github: application.github,
    linkedin: application.linkedin,
    resume: application.resume,
  }

  const { data, error } = await supabase.from('ai-3.0-applications').insert(payload)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Application submitted successfully' }
}