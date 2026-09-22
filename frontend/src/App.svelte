<script>
  import { onMount } from 'svelte';
  import Login from './Login.svelte';
  import Store from './Store.svelte';

  let user = null;
  let loading = true;

  onMount(async () => {
    const res = await fetch('/api/user');
    if (res.ok) {
      user = await res.json();
    }
    loading = false;
  });
</script>

{#if !loading}
  {#if user}
    <Store {user} />
  {:else}
    <Login />
  {/if}
{/if}