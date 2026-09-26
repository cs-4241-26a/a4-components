<script>
    import RecipeCard from './RecipeCard.svelte'
    let {onprofile = false, promise, deleteFunction=null} = $props()
    console.log(promise)
</script>

{#await promise then recipes}
    {#each recipes as recipe}
    <RecipeCard {recipe} {onprofile} {deleteFunction} />
    {/each}
{/await}  