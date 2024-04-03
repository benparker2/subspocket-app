<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import Google from "$lib/components/icons/Google.svelte";
    import Input from "$lib/components/input/Input.svelte";
    import InputPassword from "$lib/components/input/InputPassword.svelte";
    import type { ActionData } from "./$types";
    import { applyAction, enhance } from "$app/forms";
    import { toast } from "svelte-sonner";

    export let form: ActionData;

    $: if (form?.error) {
        toast.error("An error occurred", {
            description: form.error,
            style: "error"
        });
    }
</script>

<svelte:head>
    <title>Subspocket | Sign up</title>
</svelte:head>

<div class="h-full flex items-center justify-center">
    <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
        <div class="grid gap-2 text-center">
            <h1 class="text-2xl font-bold">Create a SubsPocket account</h1>
            <p class="text-balance text-muted-foreground text-sm">
                Already have an account? <a href="##" class="underline">Sign in</a>
            </p>
        </div>
        <form class="grid gap-4" method="POST" action="?/signup" use:enhance>
            <div class="grid gap-2">
                <Label for="full_name">Full name</Label>
                <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    placeholder="John Doe"
                    issues="{form?.issues?.full_name}"
                    required
                />
            </div>
            <div class="grid gap-2">
                <Label for="email">Email address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    issues="{form?.issues?.email}"
                    required
                />
            </div>
            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <InputPassword
                    id="password"
                    name="password"
                    placeholder="..."
                    issues="{form?.issues?.password}"
                />
            </div>
            <Button type="submit" class="w-full">Create account</Button>
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
        <p class="text-sm text-muted-foreground text-center">
            By signing up, you agree to our
            <a class="underline" href="/terms-of-services">Terms of Service</a> and
            <a class="underline" href="/privacy-policy">Privacy Policy</a>.
        </p>
    </div>
</div>
