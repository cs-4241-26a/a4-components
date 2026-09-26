import TodoItem from './TodoItem.jsx'

// one of the three list cards
function TodoList( props ) {
  return (
    <section className='col-md-4'>
      <div className='card'>
        <h2 className='card-header h5'>{ props.title }</h2>
        <ul className='list-group list-group-flush'>
          { props.todos.map( function( todo ) {
            return <TodoItem key={ todo._id } todo={ todo } onMove={ props.onMove } onEdit={ props.onEdit } onDelete={ props.onDelete } />
          })}
        </ul>
      </div>
    </section>
  )
}

export default TodoList
