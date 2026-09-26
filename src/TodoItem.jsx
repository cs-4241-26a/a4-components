const buttonClass = 'btn btn-sm btn-outline-dark ms-1'

// one task in a list
function TodoItem( props ) {
  const todo = props.todo

  return (
    <li className='list-group-item text-break'>
      <div className='fw-semibold'>{ todo.task } ({ todo.priority }, due { todo.deadline })</div>
      <div className='small mb-2'>Created: { todo.created } | Important: { todo.important ? 'Yes' : 'No' } | Notes: { todo.notes || 'None' }</div>

      <div className='text-end'>
        {/* changing buttons depending on which list */}
        { todo.list === 'open' &&
          <button className={ buttonClass } onClick={ function() { props.onMove( todo._id, 'closed' ) } }>Start</button>
        }

        { todo.list === 'closed' &&
          <>
            <button className={ buttonClass } onClick={ function() { props.onMove( todo._id, 'done' ) } }>Done</button>
            <button className={ buttonClass } onClick={ function() { props.onMove( todo._id, 'open' ) } }>Back</button>
          </>
        }

        { todo.list === 'done' &&
          <button className={ buttonClass } onClick={ function() { props.onMove( todo._id, 'open' ) } }>Reopen</button>
        }

        <button className={ buttonClass } onClick={ function() { props.onEdit( todo ) } }>Edit</button>
        <button className={ buttonClass } onClick={ function() { props.onDelete( todo._id ) } }>Delete</button>
      </div>
    </li>
  )
}

export default TodoItem
