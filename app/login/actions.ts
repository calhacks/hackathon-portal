'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export type LoginData = {
  email: string;
  password: string;
}

export type SignupData = LoginData & {
  firstName: string;
  lastName: string;
}

export type ActionResult = {
  success: boolean;
  error?: string;
}

export async function login(data: LoginData): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    return {
      success: false,
      error: error.message
    }
  }

  revalidatePath('/', 'layout')
  redirect('/apply')

  // This is only reached if redirect fails
  return { success: true }
}

export async function signup(data: SignupData): Promise<ActionResult> {
  const supabase = await createClient()

  // Sign up the user
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      }
    }
  })

  if (error) {
    return {
      success: false,
      error: error.message
    }
  }

  const userProfileData = {
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    user_id: authData.user?.id,
    updated_at: new Date().toISOString(),
  }

  const { error: userError } = await supabase
    .from('profiles')
    .insert(userProfileData)

  if (userError) {
    return {
      success: false,
      error: userError.message
    }
  }

  revalidatePath('/', 'layout')
  redirect('/apply')
  
  // This is only reached if redirect fails
  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

