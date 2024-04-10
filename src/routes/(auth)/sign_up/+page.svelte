<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Google from "$lib/components/icons/Google.svelte";
    import Input from "$lib/components/input/Input.svelte";
    import InputPassword from "$lib/components/input/InputPassword.svelte";
    import type { ActionData } from "./$types";
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import { User, Mail, Lock, MoveRight } from "lucide-svelte";

    export let form: ActionData;

    $: if (form?.error) toast.error(form.error);
    $: if (form?.message) toast.success(form.message);
</script>

<svelte:head>
    <title>SubsPocket | Sign up</title>
</svelte:head>

<div class="h-full flex items-center justify-center">
    <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold mb-2">Create a SubsPocket account</h1>
            <p class="text-balance text-muted-foreground text-sm">
                Already have an account? <a href="/sign_in" class="underline">Sign in</a>
            </p>
        </div>
        <form method="POST" action="?/sign_up" use:enhance>
            <div class="mb-2 relative w-full">
                <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    placeholder="Full name"
                    issues="{form?.issues?.full_name}"
                    required
                />
                <User class="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <div class="mb-2 relative w-full">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    issues="{form?.issues?.email}"
                    required
                />
                <Mail class="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <div class="mb-4 relative w-full">
                <InputPassword
                    id="password"
                    name="password"
                    placeholder="Password"
                    issues="{form?.issues?.password}"
                />
                <Lock class="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <Button class="h-12 w-full flex items-center justify-center relative hover:text-zinc-300 mb-2" type="submit">
                <span class="flex-grow text-center">Create account</span>
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
        <p class="text-sm text-muted-foreground text-center">
            By signing up, you agree to our
            <a class="underline" href="/terms_of_services">Terms of Service</a> and
            <a class="underline" href="/privacy_policy">Privacy Policy</a>.
        </p>
    </div>
</div>
