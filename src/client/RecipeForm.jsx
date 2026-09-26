import { useState, useEffect, useRef } from 'react'

export default function RecipeForm ({mode, setMode, formData, setFormData, setRecipes, recipes}){
	const [ingredientList, setIngredientList] = useState([])
	const [instructionList, setInstructionList] = useState([])

	const nameRef = useRef(null)
	const timeRef = useRef(null)

	//prefill list fields if they're there
	useEffect( () => {
		if(formData){
			const ingredientsToEdit = formData.ingredients.map(ingredient => (
				{ id: crypto.randomUUID(), name : ingredient }
			))
			const instructionsToEdit = formData.instructions.map(instruction => (
				{ id: crypto.randomUUID(), name : instruction }
			))
			setIngredientList(ingredientsToEdit)
			setInstructionList(instructionsToEdit)
			if (nameRef.current) nameRef.current.value = formData.recipeName;
    	if (timeRef.current) timeRef.current.value = formData.cookTime;
		}else{
			setIngredientList([])
			setInstructionList([])
			if(nameRef.current) nameRef.current.value = ''
			if(timeRef.current) timeRef.current.value = 1
		}
	}, [formData])

	const handleSubmit = async (event) =>{
		event.preventDefault()
		// const nameInput = document.querySelector( '#recipe-name' )
  	// const timeInput = document.querySelector('#cook-time')
		const listOfIngredients = ingredientList.map(item => item.name)
		const listOfInstructions = instructionList.map(item => item.name)
		
		const json = { recipeName: nameRef.current.value, 
    	ingredients : listOfIngredients,
    	instructions : listOfInstructions,  
    	cookTime : parseInt(timeRef.current.value)}
		
		let route = '/api/add'
		if(formData){
			json._id = formData._id
			route = '/api/update'
		}

		const body = JSON.stringify( json )
  	console.log(`Sending ${body}`)
  	const response = await fetch( route, {
    	headers:  {'Content-Type' : 'application/json'},
    	method:'POST',
    	body : body
  	})

		const recipe = await response.json()
  	console.log(recipe)
		setIngredientList([])
		setInstructionList([])
		//if add mode, add recipe to top
		if(mode === 'add'){
			setRecipes([...recipes, recipe])
		}
		//else in edit mode, find the recipe index and replace it with the updated recipe
		else{
			const index = recipes.findIndex(recipe => recipe._id === formData._id)
			setRecipes(oldRecipes =>{
				let newRecipes = [...oldRecipes]
				newRecipes[index] = recipe
				return newRecipes
			})
			setFormData(null)
			setMode('add')
		}
	}

	return (
		<article className="padding auto-height container-card medium-width">
      <form id='form' onSubmit = {handleSubmit}>
        <h2>
					{mode === 'add' ? 'Add Recipe' : `Editing Recipe for ${formData.recipeName}` }
				</h2>
        <div className="field label">
          <input type='text' id='recipe-name' ref={nameRef} minLength = {1}/>
          <label htmlFor='recipe-name'><strong>Recipe Name:</strong></label>
        </div>
        <div className="field label">
          <input type='number' id='cook-time' ref={timeRef} min = {1} />
          <label htmlFor='cook-time'><strong>Cook time:</strong> </label>
        </div>
				<ListInputField type = 'ingredient' list = {ingredientList} setList={setIngredientList}/>
				<ListInputField type = 'instruction' list = {instructionList} setList={setInstructionList}/>
        <div className="right-align">
          <button id="submit" className = 'submit' data-action="submit">
					{mode === 'add' ? 'Submit Recipe' : 'Save Changes' }
		    </button>
        </div>
      </form>
    </article>
	)
}

function ListInputField ({type, list, setList}){
	const [text, setText] = useState('')
	const ListType = type==='ingredient' ? 'ul' : 'ol'
	const handleAdd = (itemText) =>{
		const input = document.querySelector(`#${type}`)
		const newItem = {
			id : crypto.randomUUID(),
			name : itemText
		}
		setList(prevList => [...prevList, newItem] )
		setText('')
		input.focus()
		input.select()
	}
	const handleDelete = (itemId) =>{
		setList(list.filter(item => item.id !==itemId))
	}
	const fieldLabel = type.charAt(0).toUpperCase() + type.slice(1)
	return(
		<>
			<div className="field padding">
      	<label htmlFor={type}><strong>{`${fieldLabel}s:`}</strong></label>
        <textarea id={type} minLength = {1} placeholder={`Enter an ${type}`} 
					onChange={(e) => setText(e.target.value)} value={text}>
				</textarea>
        <output>Enter ingredients one by one</output>
      </div>
      <div>
        <button type='button' className='tertiary add' 
					onClick = {e => handleAdd(text)}>Add {type}</button>
      </div>
      <div className="padding">
        <ListType id={`${type}-list`} className="list border">
					{list.length>0 && list.map((listitem) =>
						<li key={listitem.id}>
							<div className='row'>
								<span className='max'>{listitem.name}</span>
								<button className='error' type='button' 
									onClick={(e => handleDelete(listitem.id))}>X</button>
							</div>
						</li>
					)}
				</ListType>
      </div>
		</>	
	)
}