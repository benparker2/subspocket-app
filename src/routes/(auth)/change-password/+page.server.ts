import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

export const actions = {
    changePassword: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const password = formData.get('password') as string

        const { error: err } = await supabase.auth.updateUser({ password })

        if (err) {

            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    error: 'Invalid email.'
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

        return fail(200, {
            message: 'Email sent! Check your inbox for the magic link.'
        })
    },
} satisfies Actions
