<script lang="ts">
    import { enhance } from "$app/forms";
    import Input from "$lib/components/input/Input.svelte";
    import { Button } from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    $: if (form?.error) {
        toast.error(form.error);
    }

    $: if (form?.message) {
        toast.success(form.message);
    }
</script>

<svelte:head>
    <title>Subspocket | Reset password</title>
</svelte:head>

<div class="h-full flex items-center justify-center">
    <div class="mx-auto grid w-full max-w-[450px] gap-6 px-6">
        <div class="grid gap-2 text-center">
            <img class="w-[85px] m-auto mb-2 rounded" src="/logo.png" alt="">
            <h1 class="text-2xl font-bold">Reset password</h1>
            <p class="text-muted-foreground text-sm">
                Include the email address associated with your account and we’ll send you an email with instructions to reset your password.
            </p>
        </div>
        <form class="grid gap-4" method="POST" action="?/reset" use:enhance>
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
            <Button type="submit" class="w-full">Continue</Button>
        </form>
    </div>
</div>
