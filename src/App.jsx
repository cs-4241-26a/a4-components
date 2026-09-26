import { useState, useEffect } from 'react'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'

const getJson = async function( url, options ) {
  const response = await fetch( url, options )
  if( response.status === 401 ) {
    window.location.href = '/login.html'
  }
  return response.json()
}

function App() {
  const [ username, setUsername ] = useState( '' )
  const [ newUser, setNewUser ] = useState( false )
  const [ todos, setTodos ] = useState( [] )
  const [ message, setMessage ] = useState( '' )
  const [ editing, setEditing ] = useState( null )

  // load the user and their tasks once when the page opens
  useEffect( function() {
    getJson( '/user' ).then( function( user ) {
      setUsername( user.username )
      setNewUser( user.newUser )
    })

    getJson( '/data' ).then( function( json ) {
      setTodos( json )
    })
  }, [] )

  // send post to server and update the lists with what it sends back
  const postData = async function( url, json ) {
    const result = await getJson( url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( json )
    })

    if( result.error !== null ) {
      setMessage( result.error )
    }

    else {
      setMessage( '' )
    }

    if( result.todos ) {
      setTodos( result.todos )
    }
  }

  const saveTodo = function( json ) {
    if( editing === null ) {
      postData( '/add', json )
    }

    else {
      json.id = editing._id
      postData( '/edit', json )
      setEditing( null )
    }
  }

  const moveTodo = function( id, list ) {
    postData( '/move', { id: id, list: list } )
  }

  const deleteTodo = function( id ) {
    if( editing !== null && editing._id === id ) {
      setEditing( null )
    }
    postData( '/delete', { id: id } )
  }

  return (
    <>
      <nav className='navbar bg-dark'>
        <div className='container'>
          <span className='navbar-brand text-white'>Griffin's To-Do List</span>
          <span className='text-white'>Logged in as <strong>{ username }</strong> <a href='/logout' className='btn btn-outline-light btn-sm ms-2'>Log Out</a></span>
        </div>
      </nav>

      <main className='container py-4'>
        <h1>My Tasks</h1>
        <p>Add a task and move it by clicking the buttons.</p>

        { newUser &&
          <div className='alert alert-success'>
            Welcome! We didn't find an account for you, so a new one was created with your GitHub username.
          </div>
        }

        <TodoForm editing={ editing } onSave={ saveTodo } onCancel={ function() { setEditing( null ) } } />

        {/* Shows only 3 items warning */}
        <p className='text-danger mt-3'>{ message }</p>

        <div className='row g-3'>
          <TodoList
            title='Open'
            todos={ todos.filter( function( todo ) { return todo.list === 'open' } ) }
            onMove={ moveTodo }
            onEdit={ setEditing }
            onDelete={ deleteTodo }
          />
          <TodoList
            title='In Progress (max 3)'
            todos={ todos.filter( function( todo ) { return todo.list === 'closed' } ) }
            onMove={ moveTodo }
            onEdit={ setEditing }
            onDelete={ deleteTodo }
          />
          <TodoList
            title='Done'
            todos={ todos.filter( function( todo ) { return todo.list === 'done' } ) }
            onMove={ moveTodo }
            onEdit={ setEditing }
            onDelete={ deleteTodo }
          />
        </div>
      </main>
    </>
  )
}

export default App
