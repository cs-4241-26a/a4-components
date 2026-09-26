export default function RecipeList ({setMode, recipes, setRecipes, setFormData}){
	const isNoRecipes =  recipes.length === 0
	return(
		<article id='recipes' className="container-card large-width auto-height top">
      <h2 id = 'all-recipes' className='padding'>All Recipes</h2>
      <div>
        {isNoRecipes ? (
				  <p className='center-align middle-align'>No recipes yet...</p> 
			  ) : (
				  recipes.map((recipe) =>
					  <Recipe key= {recipe._id} recipe={recipe} recipeList={recipes}setRecipes={setRecipes}
              setMode={setMode} setFormData={setFormData}/>
				  )
			  )}
      </div>
    </article>
	)
}

function Recipe ({setMode, recipe, recipeList, setRecipes, setFormData}){
  const handleDelete = async () =>{
    setRecipes(recipeList.filter(item => recipe._id !== item._id))
    const response = await fetch('/api/remove', 
      {headers:  {'Content-Type' : 'application/json'},
        method :'POST', 
        body : JSON.stringify({_id : recipe._id})} )
  }
  const handleEdit = () =>{
    setMode('edit')
    setFormData(recipe)
  }
  return (
    <article className='secondary margin padding'>
      <h3 className="top-padding">{recipe.recipeName}</h3>
      <hr/>
      <div className="row top-padding">
        <span> Cook time: {recipe.cookTime}</span>
        <span> Difficulty: {recipe.difficulty}</span>
      </div>
      <hr/>
      <div className="grid top-align top-padding">
        <div className='l4'>
          <ul>
            {recipe.ingredients.map((ingredient, index) =>
              <li key={index} className='no-padding'>{ingredient}</li>
            )}
          </ul>
        </div>
        <div className="l8">
          <ol>
            {recipe.instructions.map((step, index) =>
              <li key={index} className='no-padding'>{step}</li>
            )}
          </ol>
        </div>
      </div>
      <div className="row right-align">
        <button type='button' className='secondary-container' onClick={handleEdit}>Edit Recipe</button>
        <button type='button' className="error" onClick={handleDelete}>
          X
        </button>
      </div>
    </article>
  )
}