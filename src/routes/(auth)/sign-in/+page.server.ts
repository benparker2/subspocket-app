import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError, type Provider } from "@supabase/supabase-js";

export const actions = {
    sign_in: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error: err } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (err) {

            console.log(err)

            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    error: 'Invalid email or password.'
                })
            }

            if (err instanceof AuthApiError && err.status === 429 && err.message === 'For security purposes, you can only request this once every 60 seconds') {
                return fail(429, {
                    error: 'For security purposes, you can only request this once every 60 seconds. Please try again later.'
                })
            }

            return fail(500, {
                error: 'Server error. Please try again later.'
            })
        }
    },
    oauth: async ({ url, locals: { supabase } }) => {

        const provider = url.searchParams.get('provider') as Provider

        const { data, error: err } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${url.origin}/auth/callback`
            }
        })

        if (err) {
            return fail(400, {
                error: 'Something went wrong.'
            })
        }

        redirect(302, data.url)
    }
} satisfies Actions
