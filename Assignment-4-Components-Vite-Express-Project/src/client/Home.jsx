import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Fragment } from "react";
import {useEffect} from "react";

import GamesComponent from "./GamesComponent"
import MenuComponent from "./MenuComponent"
import PasswordComponent from "./PasswordComponent"
import ProfilePictureComponent from "./ProfilePictureComponent"
import UsernameComponent from "./UsernameComponent"

function Home() {
    const [component, setComponent] = useState(<Fragment></Fragment>);
    useEffect(() => {
        updateForm(true);
        updateShownData();
    }, []) 

    let username = "Player 1"

    // Logout and return to default landing page for not logged in users
    const logout = async function( event ) {
        const response = await fetch( '/logout', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {} ) 
        })
        window.location.href = '/'
    }

    const updateUsername = async function() {
        const newUsername1 = document.querySelector( '#username1' ),
            newUsername2 = document.querySelector( '#username2' )
        if (newUsername1.value != newUsername2.value) {
            newUsername2.setCustomValidity("Your usernames must match!")
        }
        else {
            newUsername2.setCustomValidity("")
            //POST req to change username in server
            const response = await fetch( '/submit', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {option:'Change Username', newUsername:newUsername1.value} ) 
            })
        }
        updateForm(true)
        updateShownData()
    }

    const updatePassword = async function() {
        const password1 = document.querySelector( '#password1' ),
            password2 = document.querySelector( '#password2' )
        if (password1.value != password2.value) {
            password2.setCustomValidity("Your passwords must match!")
        }
        else {
            password2.setCustomValidity("")
            //POST req to change password in server
            const response = await fetch( '/submit', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {option:'Change Password', newPassword:password1.value} ) 
            })
        }
        updateForm(true)
        updateShownData()
    }

    const updateProfilePicture = async function() {
        //update picture from selected
        const newpfp = document.querySelector('input[name="pfp"]:checked')
        //POST req to change this  in server
        const response = await fetch( '/submit', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {option:'Change Profile Picture', pfp:newpfp.value} ) 
        })
        updateForm(true)
        updateShownData()
    }

    const updateGameScore = async function() {
        const mode = document.querySelector( '#option' ),
            game = document.querySelector( '#game' ),
            score = document.querySelector( '#highscore' ),
            today = new Date().toISOString().slice(0, 10), 
            json = { option: mode.value, game: game.value, highscore: score.value, date: today}

        const response = await fetch( '/submit', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( json ) 
        })

        // Do something with the response from POST
        const data = await response.text()
        // checking if data is not an error message would be ideal

        updateShownData()    
    }

    const updateShownData = async function() {
        // Run a get after running a post, to see if the page changes
        const response = await fetch( '/docs', {
            method:'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({})
        })
        const text = await response.text()
        // TReact actually manges to parse this with the middleware, maybe?
        const data = JSON.parse(text)
        let dataToDisplay = ""
        // Data is sent back as an array with all documents 
        for (let i = 0; i < data.length; i++) {
            if (data[i].game != null) {
                dataToDisplay += "<li>"+(data[i].game+": "+data[i].highscore).replaceAll(/(<|>)/g, "")+"</li>"
            }
            //one of the elemnts sent back should contain the username so update that 
            else if (data[i].username != null) {
                username = data[i].username
                //this piece of data might also have a specific profile picture if so use it instead of default
                if (data[i].pfp != null) {
                    const pfpImage = document.getElementById("profile picture")
                    pfpImage.src = data[i].pfp
                }
            }
        }
        // Overwrite the displayed scoretable with the updated version after it returns
        document.getElementById('scoretable').innerHTML = dataToDisplay
        // Also update player name
        document.getElementById('welcome').innerText = `Welcome back ${username}! What would you like to do?`
    }

    const updateForm = async function(reset) {
        console.log("Updating form")
        const selection = document.querySelector('input[name="whatToDo"]:checked')
        if (reset) {
            // React browserrouter will remember a selection even if it is not on current page, so be able to pass in reset
            // Also can change over from using constants and setting intter html to using react components
            //document.getElementById('home').innerHTML = ...
            setComponent(<MenuComponent setFunction={updateForm}/>)
        }
        else if (selection != null) {
            if (selection.value === "1") {
                setComponent(<UsernameComponent setFunction={updateForm} onSubmitFunction={updateUsername}/>)   
            }
            else if (selection.value === "2") {
                setComponent(<PasswordComponent setFunction={updateForm} onSubmitFunction={updatePassword}/>) 
            }
            else if (selection.value === "3") {
                setComponent(<ProfilePictureComponent setFunction={updateForm} onSubmitFunction={updateProfilePicture}/>)
            }
            else if (selection.value === "4") {
                setComponent(<GamesComponent setFunction={updateForm} onSubmitFunction={updateGameScore}/>)   
            }
            else {
                // Invalid selction for where to go so return to menu
                setComponent(<MenuComponent setFunction={updateForm}/>)
            }
        } 
        else {
            // There was not selection for where to go so return to menu
            setComponent(<MenuComponent setFunction={updateForm}/>)
        }   
    }

    return (
        <Fragment>
        <title>Scoredisplay - CS4241 Assignment 2</title>
        <meta charSet='utf-8' />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossOrigin="anonymous"/>
        <meta name="description" content="The login page for a simple database that lets you store highscores for games you play."/>

        <header>
            <button type="button" onClick={logout}> Log Out</button>
            <img id="profile picture" src="images/Black Elephant.png" alt="your profile picture" width="50" height="50"></img>
        </header>
        <main>
            <h1> Scoredisplay Home Page </h1>
            <p id='welcome'>
            Welcome back Player 1! What would you like to do?
            </p>
            <div className="pure-g" id="layout">
            <form className="pure-u-1-2 pure-form pure-form-stacked" id="home">
                {component}
            </form>
            <section className="pure-u-1-2">
                <h2 >Highscores</h2>
                <ul className="pure-menu" id = 'scoretable'>
                <li>
                    Submit a Score to see how how it compares to other highscores
                </li>
                </ul>
            </section>
            </div>
        </main>
        </Fragment>
    );
}

export default Home;
