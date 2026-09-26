import TodoRow from './TodoRow.jsx'

const TodoTable = ( { todos, editingId, onEdit, onCancel, onSave, onDelete } ) => (
    <table id='todo-table'>
        <thead>
        <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Deadline</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        { todos.map( todo => (
            <TodoRow
                key={todo.id}
                todo={todo}
                isEditing={todo.id === editingId}
                onEdit={onEdit}
                onCancel={onCancel}
                onSave={onSave}
                onDelete={onDelete}
            />
        ))}
        </tbody>
    </table>
)

export default TodoTable