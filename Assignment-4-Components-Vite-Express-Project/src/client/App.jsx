import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Fragment } from "react";

const login = async function() {
    console.log("running login")
    const mode = document.querySelector( '#option' ),
        username = document.querySelector( '#username' ),
        password = document.querySelector( '#password' ),
        json = {mode: mode.value, username: username.value, password: password.value}

    const response = await fetch( '/login', {
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify( json ) 
    })

    const text = await response.text()

    console.log("response", text)

    // If response was 200 OK redirect, if not show given error message
    const errorMessage = document.querySelector( '#error' )
    console.log("status", response.status)
    if (response.status == 200) {
        // I was adding and removing hidden but I think it makes more sense to add remove alert and the text for the error
        errorMessage.setAttribute("role", "")
        errorMessage.innerText = " "
        window.location.href = '/home.html'
    }
    else {  
        errorMessage.setAttribute("role", "alert")
        errorMessage.innerText = text
    }
}

//page to return
function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <title>Scoredisplay Login - CS4241 Assignment 2</title>
      <meta charSet='utf-8' />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossOrigin="anonymous" />
      <meta name="description" content="The login page for a simple database that lets you store highscores for games you play." />
      <main>
        <form className="pure-form" id="login-form">
          <h1> Scoredisplay Login Page </h1>
          <section className="pure-g" id="layout">
            <label htmlFor="username"> Select Login/Sign Up: </label>
            <select className="pure-u-1 pure-u-md-1-3" id='option'>
              <option>Login</option>
              <option>Create Account</option>
            </select>
            <label htmlFor="username"> Enter your Username: </label>
            <input className="pure-u-1 pure-u-md-1-3" type='text' id='username' defaultValue='' placeholder='enter your username'/>
            <label htmlFor="username"> Enter your Password: </label>
            <input className="pure-u-1 pure-u-md-1-3" type='password' id='password' defaultValue='' placeholder='enter your password here'/>
            <div className="pure-u-1" id='error'></div>
            <button className="pure-button pure-button-primary pure-u-1" type="button" onClick={login} >Log In</button>
          </section>
        </form>
      </main>
    </Fragment>
  );
}

export default App;
