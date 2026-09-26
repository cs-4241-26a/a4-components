import { useState, useEffect } from 'react'
import RecipeForm from './RecipeForm.jsx'
import RecipeList from './RecipeList.jsx'

export default function Dashboard(){
	const [recipes, setRecipes] = useState([ ]) 
	const [mode , setMode] = useState('add')
	//used for changing form and prefilling fields
	const [formData, setFormData] = useState(null)

	//get the recipes for the logged in user
	useEffect( ()=> {
		fetch( '/api/docs' )
			.then( response => response.json() )
			.then( json => {
				setRecipes( json ) 
			})
	}, [] )
	
  return(
		<main>
			<div className="row center-align top-align">
				<RecipeForm mode = {mode} setMode={setMode}
					formData={formData} setFormData={setFormData} 
					setRecipes={setRecipes} recipes={recipes}/>
				<RecipeList setMode = {setMode}
					recipes={recipes} setRecipes={setRecipes} 
					setFormData={setFormData}/>
			</div>
		</main>
	)
}