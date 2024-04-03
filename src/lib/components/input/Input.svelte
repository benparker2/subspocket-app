<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";

    export let id: string;
    export let name: string;
    export let placeholder: string;
    export let type: string;
    export let issues: any;
    export let required: boolean;
</script>

<Input
    {type}
    {id}
    {name}
    {placeholder}
    class="{issues ? 'border-red-500' : ''}"
    {required}
/>
{#if issues}
    <span class="text-xs text-red-500">
        {issues._errors[0]}
    </span>
{/if}
