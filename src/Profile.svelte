<script>
    import RecipeList from './lib/RecipeList.svelte'

    const getRecipes = function() {
        const p = fetch('/myrecipes', {
            method:'GET' 
        })
        .then( response => response.json() )
        .then( json => {
            console.log(json)
            return json
        })
        
        return p
    }

    const deleteRecipe = function(event) {
        event.preventDefault()

        const recipeCard = event.target.parentElement.parentElement

        const recipeId = recipeCard.id
        console.log('htmlid: ', recipeId)
        const id = recipeId.substring(6)
        console.log('extractedid: ', id)

        const body = JSON.stringify({id: id})

        promise = fetch( '/deleterecipe', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        })
        .then(response => response.json() )
    }

    let promise = $state(getRecipes())
</script>

<svelte:head>
    <title>My Account - Recipe Wiki</title>
    <meta name="description" content="See your recipes and update your account settings." />
</svelte:head>

<main class='pure-g'>
    <section id='profile-info' class='pure-u-1 form-wrapper'>
        <form action='/editaccount' method='POST' class='pure-form centered'>
            <label for='password'>New password:</label>
            <input type='password' id='password' name='password' required>
            <input type='submit' value='Submit' class='pure-button pure-button-primary'>
        </form>
    </section>
    <section id='recipe-list' class='pure-u-1'>
        <h2>My recipes</h2>
        <RecipeList onprofile={true} {promise} deleteFunction={deleteRecipe} />
    </section>
</main>