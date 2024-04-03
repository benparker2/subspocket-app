import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError, type Provider } from "@supabase/supabase-js";
import { formSchema } from "./formSchema";

export const actions = {
    signup: async ({ request, url, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())

        const result = formSchema.safeParse(formData)

        if (!result.success) {
            return fail(400, {
                issues: result.error.format()
            })
        }

        return fail(400, {
            error: 'Invalid email.'
        })

        const { error: err } = await supabase.auth.signUp({
            email: result.data.email as string,
            password: result.data.password as string,
            options: {
                emailRedirectTo: `${url.origin}/auth/callback`,
                data: {
                    full_name: result.data.full_name as string
                }
            }
        })

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
