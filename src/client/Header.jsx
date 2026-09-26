export default function Header({isLoggedIn, onLogin}){
	const handleSubmit = async(event) => {
		event.preventDefault()
		fetch( '/api/logout', {
      		method:'POST',
      		headers: { 'Content-Type': 'application/json' }
    	}).then(response => response.json())
    		.then(json => {
      		onLogin(json.status)
    	})		
	}
	
	return (
    <header className ="row padding center-align">
    	<div className = "max center-align top-margin ">
        <h1 className = 'small-blur medium-width round center'>Cookbook</h1> 
      </div>
      {isLoggedIn && 
				<form onSubmit = {handleSubmit}>
        	<button type='submit left'>Log Out</button>
      	</form>}
    </header>
	)
}