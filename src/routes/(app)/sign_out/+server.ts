import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
    const { error: err } = await supabase.auth.signOut()

    if (err) {
        error(500, 'Server error. Please try again later.')
    }

    redirect(303, '/')
}
