<script>
    import RecipeList from './lib/RecipeList.svelte'

    const getRecipes = function() {
        const p = fetch('/allrecipes', {
            method:'GET' 
        })
        .then( response => response.json() )
        .then( json => {
            console.log(json)
            return json
        })
        
        return p
    }

    const newRecipe = function(event){
        event.preventDefault()

        const name = document.querySelector( '#recipename' ),
            preptime = document.querySelector( '#preptime' ),
            cooktime = document.querySelector( '#cooktime' ),
            ingredients = document.querySelector( '#ingredients' ),
            steps = document.querySelector( '#steps' ),
            json = {name: name.value,
                    preptime:preptime.valueAsNumber,
                    cooktime:cooktime.valueAsNumber,
                    ingredients:ingredients.value,
                    steps:steps.value
                },
            body = JSON.stringify( json )

        promise = fetch( '/newrecipe', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        })
        .then(response => response.json() )

        document.querySelector('#create-recipe').reset()
    }

    let promise = $state(getRecipes())
</script>

<svelte:head>
    <title>Browse Recipes - Recipe Wiki</title>
    <meta name='description' content='Upload your recipes and see what other people are making.'>
</svelte:head>

<main class='pure-g'>
    <section id='recipe-form' class='pure-u-1 pure-u-md-1-2 form-wrapper'>
        <h2>New Recipe</h2>
        <form id='create-recipe' onsubmit={newRecipe} class='pure-form pure-form-aligned centered'>
        <div class='pure-control-group'>
            <label for='recipename'>*Recipe name:</label>
            <input type='text' id='recipename' placeholder='Chocolate Chip Cookies' required>
        </div>

        <div class='pure-control-group'>
            <label for='preptime'>Prep time:</label>
            <unit-wrapper>
            <input type='number' id='preptime' placeholder='30' min=0 />
            <input-unit>minutes</input-unit>
            </unit-wrapper>
        </div>

        <div class='pure-control-group'>
            <label for='cooktime'>Cook time:</label>
            <unit-wrapper>
            <input type='number' id='cooktime' placeholder='15' min=0 />
            <input-unit>minutes</input-unit>
            </unit-wrapper>
        </div>

        <div class='pure-control-group'>
            <label for='ingredients'>*Ingredients:</label>
            <textarea required id='ingredients' placeholder='1 cup sugar&#10;1 cup flour&#10;...'></textarea>
        </div>

        <div class='pure-control-group'>
            <label for='steps'>*Steps:</label>
            <textarea required id='steps' placeholder='1. Combine dry ingredients in a small bowl...'></textarea>
        </div>
        

        <div class='pure-controls'>
            <input type='submit' value='Create' class='pure-button pure-button-primary'>
        </div>
        </form>
    </section>

    <section id='recipe-list' class='pure-u-1 pure-u-md-1-2'>
        <h2>Submitted Recipes</h2>
        <RecipeList onprofile={false} {promise} />
    </section>
</main>