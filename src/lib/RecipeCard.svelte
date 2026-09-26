<script>
  let {recipe, onprofile, deleteFunction} = $props()
  import TimeItem from './TimeItem.svelte'
</script>

<article id="recipe{recipe._id}" class="pure-g">
  <h3 class="pure-u-1">{recipe.name}</h3>
  <time-info class="pure-u-1">
    <TimeItem text={'Prep time'} time={recipe.preptime} />
    <TimeItem text={'Cook time'} time={recipe.cooktime} />
    <TimeItem text={'Total time'} time={recipe.totaltime} />
  </time-info>
  <div class="pure-u-1-2">
    <ingredient-card>{recipe.ingredients}</ingredient-card>
  </div>
  <div class="pure-u-1-2">
    <step-card>{recipe.steps}</step-card>
  </div>
  {#if !onprofile}
    <author-card class="pure-u-1-2">{recipe.author}</author-card>
  {:else}
    <button-wrapper class="pure-u-1">
      <input onclick={deleteFunction} class="pure-button" type="button" value="Delete">
    </button-wrapper>
  {/if}
</article>