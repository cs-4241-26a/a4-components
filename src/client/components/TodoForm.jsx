import { useState } from 'react'

const TodoForm = ( { onAdd } ) => {
    const [ task, setTask ] = useState( '' )
    const [ priority, setPriority ] = useState( 'medium' )

    const handleSubmit = ( event ) => {
        event.preventDefault()
        onAdd( task, priority )
        setTask( '' )
    }

    return (
        <form id='todo-form' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='What needs doing?'
                value={task}
                onChange={ e => setTask( e.target.value ) }
                required
            />
            <select value={priority} onChange={ e => setPriority( e.target.value ) }>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
            <button type='submit'>Add Task</button>
        </form>
    )
}

export default TodoForm