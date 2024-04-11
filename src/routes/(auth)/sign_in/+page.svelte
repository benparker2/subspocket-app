<script lang="ts">
    import { enhance } from "$app/forms";
    import Google from "$lib/components/icons/Google.svelte";
    import Input from "$lib/components/input/Input.svelte";
    import InputPassword from "$lib/components/input/InputPassword.svelte";
    import { Button } from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    import type { ActionData } from "./$types";
    import { Mail, MoveRight, Lock } from 'lucide-svelte';

    export let form: ActionData;

    $: if (form?.error) toast.error(form.error);
</script>

<svelte:head>
    <title>SubsPocket | Sign in</title>
</svelte:head>

<div class="h-full flex items-center justify-center">
    <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold mb-2">Sign in to SubsPocket</h1>
            <p class="text-balance text-muted-foreground text-sm">
                Don't have an account yet? <a href="/sign_up" class="underline">Sign up</a>
            </p>
        </div>
        <form method="POST" action="?/sign_in" use:enhance>
            <div class="mb-4 relative w-full">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    issues=""
                    required
                />
                <Mail class="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <div class="mb-4 w-full flex flex-col items-end">
                <div class="relative w-full">
                    <InputPassword
                        id="password"
                        name="password"
                        placeholder="Password"
                        issues=""
                    />
                    <Lock class="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                </div>
                <a href="/forgot_password" class="inline-block text-sm underline text-muted-foreground">
                    Forgot your password?
                </a>
            </div>
            <Button class="h-12 w-full flex items-center justify-center relative hover:text-zinc-300 mb-2" type="submit">
                <span class="flex-grow text-center">Continue</span>
                <MoveRight class="flex-none absolute right-5" />
            </Button>
        </form>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
            </div>
        </div>
        <form
            class="gap-4"
            method="POST"
        >
            <Button
                class="h-12 w-full"
                type="submit"
                formaction="?/oauth&provider=google"
            >
                <Google class="w-5 h-5" />
            </Button>
        </form>
    </div>
</div>
