<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    import type { ActionData } from "./$types";
    import InputPassword from "$lib/components/input/InputPassword.svelte";
    import { Lock, MoveRight } from "lucide-svelte";

    export let form: ActionData;

    $: if (form?.error) toast.error(form.error);
</script>

<svelte:head>
    <title>SubsPocket | Reset password</title>
</svelte:head>

<div class="h-svh min-h-svh">
    <div class="h-full flex items-center justify-center">
        <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
            <div class="text-center">
                <h1 class="text-2xl font-bold mb-2">Set up a new password</h1>
                <p class="text-muted-foreground text-sm">
                    Your password must be different from your previous one.
                </p>
            </div>
            <form method="POST" action="?/reset_password" use:enhance>
                <div class="mb-6 relative w-full">
                    <InputPassword
                        id="password"
                        name="password"
                        placeholder="Password"
                        issues="{form?.issues?.password}"
                    />
                    <Lock class="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                </div>
                <Button class="h-12 w-full flex items-center justify-center relative hover:text-zinc-300 mb-2" type="submit">
                    <span class="flex-grow text-center">Update password</span>
                    <MoveRight class="flex-none absolute right-5" />
                </Button>
            </form>
        </div>
    </div>
</div>
