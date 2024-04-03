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
    * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
    */
    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()

        return session
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}

const authorization: Handle = async ({ event, resolve }) => {
    // protect requests to all routes id that start with (app)
    if (event.route.id?.startsWith('/(app)')) {
        const session = await event.locals.getSession()
        if (!session) {
            // the user is not signed in
            throw redirect(303, '/sign-in')
        }
    }

    // protect requests to all routes id that start with (auth) except (auth)/sign-out
    if (event.route.id?.startsWith('/(auth)') && !event.route.id?.startsWith('/(auth)/sign-out')) {
        const session = await event.locals.getSession()
        if (session) {
            // the user is not signed in
            throw redirect(303, '/')
        }
    }

    return resolve(event)
}

export const handle = sequence(supabase, authorization)
