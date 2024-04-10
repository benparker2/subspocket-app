import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const supabase: Handle = async ({ event, resolve }) => {

    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            /**
             * Note: You have to add the `path` variable to the
             * set and remove method due to sveltekit's cookie API
             * requiring this to be set, setting the path to `/`
             * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
             */
            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })

    /**
     * Unlike `supabase.auth.getSession`, which is unsafe on the server because it
     * doesn't validate the JWT, this function validates the JWT by first calling
     * `getUser` and aborts early if the JWT signature is invalid.
     */
    event.locals.safeGetSession = async () => {
        const { data: { user }, error } = await event.locals.supabase.auth.getUser()

        if (error) {
            return { session: null, user: null }
        }

        const { data: { session } } = await event.locals.supabase.auth.getSession()

        return { session, user }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}

const authorization: Handle = async ({ event, resolve }) => {

    const { session } = await event.locals.safeGetSession()

    // protect requests to all routes id that start with (app)
    if (event.route.id?.startsWith('/(app)')) {
        if (!session) {
            // the user is not signed in
            redirect(303, '/sign_in')
        }
    }

    // protect requests to all routes id that start with (auth)
    if (event.route.id?.startsWith('/(auth)')) {
        if (session) {
            // the user is not signed in
            redirect(303, '/')
        }
    }

    return resolve(event)
}

export const handle = sequence(supabase, authorization)
