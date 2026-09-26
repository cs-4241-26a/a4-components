import { useState } from 'react'

const TodoRow = ( { todo, isEditing, onEdit, onCancel, onSave, onDelete } ) => {
    const [ task, setTask ] = useState( todo.task )
    const [ priority, setPriority ] = useState( todo.priority )

    const deadlineDate = new Date( todo.deadline ).toLocaleDateString()
    const createdDate = new Date( todo.created ).toLocaleDateString()

    if( isEditing ) {
        return (
            <tr>
                <td><input type='text' value={task} onChange={ e => setTask( e.target.value ) } /></td>
                <td>
                    <select value={priority} onChange={ e => setPriority( e.target.value ) }>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                    </select>
                </td>
                <td>{createdDate}</td>
                <td>{deadlineDate}</td>
                <td>
                    <button onClick={ () => onSave( todo.id, task, priority ) }>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                </td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{todo.task}</td>
            <td className={`priority-${todo.priority}`}>{todo.priority}</td>
            <td>{createdDate}</td>
            <td>{deadlineDate}</td>
            <td>
                <button onClick={ () => onEdit( todo.id ) }>Edit</button>
                <button onClick={ () => onDelete( todo.id ) }>Delete</button>
            </td>
        </tr>
    )
}

export default TodoRow