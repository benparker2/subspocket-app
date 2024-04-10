<script lang="ts">
    import { enhance } from "$app/forms";
    import Input from "$lib/components/input/Input.svelte";
    import { Button } from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    import type { ActionData } from "./$types";
    import { Mail, MoveRight } from "lucide-svelte";

    export let form: ActionData;

    $: if (form?.error) toast.error(form.error);
    $: if (form?.message) toast.success(form.message);

    let isSubmitting = false

    setTimeout(() => {
        isSubmitting = false
    }, 60000);
    
</script>

<svelte:head>
    <title>Subspocket | Forgot password</title>
</svelte:head>

<div class="h-full flex items-center justify-center">
    <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold mb-2">Reset password</h1>
            <p class="text-muted-foreground text-sm">
                Include the email address associated with your account and we’ll send you an email with instructions to reset your password.
            </p>
        </div>
        <form method="POST" action="?/forgot_password" use:enhance>
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
            <Button class="h-12 w-full flex items-center justify-center relative hover:text-zinc-300 mb-2" type="submit">
                <span class="flex-grow text-center">Continue</span>
                <MoveRight class="flex-none absolute right-5" />
            </Button>
        </form>
    </div>
</div>
