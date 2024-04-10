import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import { formSchema } from "./formSchema";

export const actions = {
    reset_password: async ({ request, locals: { supabase } }) => {
        const formData = Object.fromEntries(await request.formData())

        const result = formSchema.safeParse(formData)

        if (!result.success) {
            return fail(400, {
                issues: result.error.format()
            })
        }

        const { error: err } = await supabase.auth.updateUser({
            password: result.data.password
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

        redirect(303, '/')
    },
} satisfies Actions
