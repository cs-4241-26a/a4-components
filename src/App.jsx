import { useState, useEffect } from 'react'
import LoginBox from './components/LoginBox.jsx'
import PoemForm from './components/PoemForm.jsx'
import PoemTable from './components/PoemTable.jsx'

function App() {
  let [ poems, setPoems ] = useState( [] )
  let [ loggedIn, setLoggedIn ] = useState( false )
  let [ status, setStatus ] = useState( '' )
  // null means adding and a real id means editing
  let [ editingPoem, setEditingPoem ] = useState( null )

  // loads whatever poems are already on the server when the page first opens
  useEffect( function() {
    async function loadPoems() {
      let response = await fetch( '/data' )
      let data = await response.json()

      if( data !== null ) {
        setLoggedIn( true )
        setPoems( data )
      }
    }

    loadPoems()

    if( window.location.search === '?new' ) {
      alert( 'This is your first time logging in, so a new account was created for your GitHub username.' )
    }
  }, [] )

  async function savePoem( poem ) {
    let url = '/submit'

    // if we're editing an existing poem, include its id and hit /edit instead
    if( editingPoem !== null ) {
      url = '/edit'
      poem.id = editingPoem._id
    }

    let response = await fetch( url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( poem )
    })

    if( response.status === 401 ) {
      setStatus( 'Please log in with GitHub to save poems.' )
      return false
    }

    let data = await response.json()

    setPoems( data )
    setStatus( editingPoem === null ? 'Poem added.' : 'Poem updated.' )
    // back to "add" mode
    setEditingPoem( null )

    return true
  }

  // similar to submit  but hits /delete instead of /submit
  async function deletePoem( id ) {
    if( !confirm( 'Delete this poem? This cannot be undone.' ) ) {
      return
    }

    let response = await fetch( '/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { id: id } )
    })

    let data = await response.json()

    setPoems( data )
    setStatus( 'Poem deleted.' )

    if( editingPoem !== null && editingPoem._id === id ) {
      setEditingPoem( null )
    }
  }

  return (
    <main className="container">
      <h1>Poetry Entry System</h1>

      { !loggedIn && <LoginBox /> }

      <PoemForm
        editingPoem={ editingPoem }
        onSave={ savePoem }
        onCancel={ () => setEditingPoem( null ) }
        setStatus={ setStatus }
      />

      <p id="status" role="status">{ status }</p>

      <h2>Your Poems</h2>

      <PoemTable
        poems={ poems }
        onEdit={ setEditingPoem }
        onDelete={ deletePoem }
      />
    </main>
  )
}

export default App
