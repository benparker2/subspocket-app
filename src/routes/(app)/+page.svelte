<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";


</script>

<Button on:click={() => goto('/sign-out')}>Sign out</Button>
