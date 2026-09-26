import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import "./App.css";

const App = () => {
  const [isLoggedIn, setLogin] = useState(false)

  function handleLogin(status){
    setLogin(status)
  }
  
  //checks the login status when the page loads in case of refresh
  useEffect(()=> {
    
    fetch('/api/status', { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        handleLogin(json.status)
      })
  }, [])

  return (
    <div className='background'>
      <Header isLoggedIn = {isLoggedIn} onLogin = {handleLogin}/>
      {isLoggedIn ? <Dashboard/> : <Login onLogin={handleLogin}/>}
    </div>
  );
}

export default App