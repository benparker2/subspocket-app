<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Eye, EyeOff } from 'lucide-svelte';

    export let id: string;
    export let name: string;
    export let placeholder: string;
    export let issues: any;
    export let disabled: boolean = false;

    let show_password = false
    $: type = show_password ? 'text' : 'password'
</script>

<div class="relative">
    <Input
        {type}
        {id}
        {name}
        {placeholder}
        class="{issues ? 'border-red-500' : ''} h-12 mb-2 pl-12"
        {disabled}
        required
    />
    <Button
        class="btn-password absolute right-0 top-0 border-none h-12 bg-transparent hover:bg-transparent shadow-none"
        on:click="{ () => show_password = !show_password }"
    >
        {#if show_password}
            <EyeOff class="w-5 h-5 text-muted-foreground" />
        {:else}
            <Eye class="w-5 h-5 text-muted-foreground" />
        {/if}
    </Button>
</div>
{#if issues}
    <span class="text-xs text-red-500">
        {issues._errors[0]}
    </span>
{/if}
