import { mount } from 'svelte'
import RecipeList from './lib/RecipeList.svelte'
import Header from './lib/Header.svelte'
import LoginForm from './lib/LoginForm.svelte'
import Index from './Index.svelte'
import Profile from './Profile.svelte'

// Fetches the username from the server
const get_username = async function() {
  const response = await fetch( '/amiloggedin', {
    method:'GET'
  })

  const returnedtext = await response.text()

  const username = JSON.parse(returnedtext).username
  return username
}
const username = await get_username()
let loggedin = false
if(username){
  loggedin = true
}

// Checks login status and then mounts the page content depending on the path
if(window.location.pathname == '/index.html'){
  if(!loggedin){
    window.location.replace('login.html')
  }
  else{
    const index = mount(Index, {
      target: document.querySelector('body')
    })
  }
}
if(window.location.pathname == '/profile.html'){
  if(!loggedin){
    window.location.replace('login.html')
  }
  const profile = mount(Profile, {
    target: document.querySelector('body')
  })
}
if(window.location.pathname == '/login.html'){
  if(loggedin){
    window.location.replace('index.html')
  }
  else{
    console.log('Attempting to mount login')
    const loginForm = mount(LoginForm, {
      target: document.querySelector('body'),
      props: {
        action:'/login',
        heading:'Log in',
        title:'Log In',
        description:'Log in to share your recipes.'
      }
    })
  }
}
if(window.location.pathname == '/createaccount.html'){
  if(loggedin){
    window.location.replace('index.html')
  }
  else{
    const loginForm = mount(LoginForm, {
      target: document.querySelector('body'),
      props: {
        action:'/createaccount',
        heading:'Create account',
        title:'Create Account',
        description:'Create an account to share your recipes.'
      }
    })
  }
}

// Mounts the header on every page
const header = mount(Header, {
  target: document.querySelector('header'),
  props: {loggedin, currentpath:window.location.pathname}
})