import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoTable from './components/TodoTable.jsx'
import './index.css'

const App = () => {
    const [ todos, setTodos ] = useState( [] )
    const [ editingId, setEditingId ] = useState( null )

    // load data once when the app first mounts — replaces A2's window.onload
    useEffect( () => {
        loadTodos()
    }, [] )

    const loadTodos = async () => {
        const response = await fetch( '/api/todos' )
        const data = await response.json()
        setTodos( data )
    }

    const addTodo = async ( task, priority ) => {
        const response = await fetch( '/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, priority })
        })
        const updated = await response.json()
        setTodos( updated )
    }

    const deleteTodo = async ( id ) => {
        const response = await fetch( '/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        const updated = await response.json()
        setTodos( updated )
    }

    const saveTodo = async ( id, task, priority ) => {
        const response = await fetch( '/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, task, priority })
        })
        const updated = await response.json()
        setEditingId( null )
        setTodos( updated )
    }

    return (
        <div className="App">
            <h1>My Todo List</h1>
            <TodoForm onAdd={addTodo} />
            <TodoTable
                todos={todos}
                editingId={editingId}
                onEdit={setEditingId}
                onCancel={() => setEditingId(null)}
                onSave={saveTodo}
                onDelete={deleteTodo}
            />
        </div>
    )
}

export default App