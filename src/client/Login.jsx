export default function Login({onLogin}){

	const handleSubmit = async(event) => {
		event.preventDefault()
		const username = document.querySelector('input[name="username"]').value
		const password = document.querySelector('input[name="password"]').value

		fetch( '/api/login', {
      method:'POST',
      body: JSON.stringify({ username : username, password : password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(json => {
      onLogin(json.status)
    })		
	}

  return (
    <main>
      <div className="row center-align medium-height">
        <article className="surface-variant dark center-align">
          <form id='login' onSubmit={handleSubmit}>
            <blockquote> If no account with the entered username exists, one will be created upon login</blockquote>
            <div className="field label">
              <input type='text' name='username' required/>
              <label htmlFor='username'>Username:</label>         
            </div>
            <div className="field label">
              <input type='password' name='password' required/>
              <label htmlFor='password'>Password:</label>
            </div>
            <div className="padding">
                <button type='submit' className ='primary' onSubmit={handleSubmit}>Log In</button>
            </div>
          </form>
        </article>  
      </div>
    </main>)
}