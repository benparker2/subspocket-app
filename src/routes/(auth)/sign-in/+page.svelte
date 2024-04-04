<script lang="ts">
    import { enhance } from "$app/forms";
    import Google from "$lib/components/icons/Google.svelte";
    import Input from "$lib/components/input/Input.svelte";
    import InputPassword from "$lib/components/input/InputPassword.svelte";
    import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
    <title>Subspocket | Sign in</title>
</svelte:head>

<div class="h-full flex items-center justify-center">
    <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
        <div class="grid gap-2 text-center">
            <img class="w-[85px] m-auto mb-2 rounded" src="/logo.png" alt="">
            <h1 class="text-2xl font-bold">Sign in to SubsPocket</h1>
            <p class="text-balance text-muted-foreground text-sm">
                Don't have an account yet? <a href="/sign-up" class="underline">Sign up</a>
            </p>
        </div>
        <form class="grid gap-4" method="POST" action="?/signin" use:enhance>
            <div class="grid gap-2">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    issues=""
                    required
                />
            </div>
            <div class="grid gap-2">
                <InputPassword
                    id="password"
                    name="password"
                    placeholder="Password"
                    issues=""
                />
            </div>
            <Button type="submit" class="w-full">Continue</Button>
            <a href="/reset-password" class="ml-auto inline-block text-sm underline text-muted-foreground">
                Forgot your password?
            </a>
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
                variant="outline"
                class="w-full google-btn"
                type="submit"
                formaction="?/oauth&provider=google"
            >
                <Google class="w-5 h-5" />
            </Button>
        </form>
    </div>
</div>
