import { useState, useEffect } from 'react'

// Where user adds a new task or edits an existing one
function TodoForm( props ) {
  const [ task, setTask ] = useState( '' )
  const [ notes, setNotes ] = useState( '' )
  const [ priority, setPriority ] = useState( 'low' )
  const [ important, setImportant ] = useState( false )

  const clear = function() {
    setTask( '' )
    setNotes( '' )
    setPriority( 'low' )
    setImportant( false )
  }

  // fill in the form when edit is clicked, empty it when editing stops
  useEffect( function() {
    if( props.editing === null ) {
      clear()
    }

    else {
      setTask( props.editing.task )
      setNotes( props.editing.notes )
      setPriority( props.editing.priority )
      setImportant( props.editing.important )
    }
  }, [ props.editing ] )

  const submit = function( event ) {
    event.preventDefault()
    props.onSave({ task: task, notes: notes, priority: priority, important: important })
    clear()
  }

  const cancel = function() {
    clear()
    props.onCancel()
  }

  return (
    <form onSubmit={ submit }>
      <div className='mb-3'>
        <label htmlFor='task' className='form-label'>Task</label>
        <input type='text' id='task' className='form-control' placeholder='What do you need to do?' required value={ task } onChange={ function( e ) { setTask( e.target.value ) } } />
      </div>

      <div className='mb-3'>
        <label htmlFor='notes' className='form-label'>Notes</label>
        <textarea id='notes' className='form-control' value={ notes } onChange={ function( e ) { setNotes( e.target.value ) } }></textarea>
      </div>

      <fieldset className='mb-3'>
        <legend className='fs-6'>Priority</legend>
        <div className='form-check form-check-inline'>
          <input type='radio' id='high' name='priority' value='high' className='form-check-input' checked={ priority === 'high' } onChange={ function( e ) { setPriority( e.target.value ) } } />
          <label htmlFor='high' className='form-check-label'>High</label>
        </div>
        <div className='form-check form-check-inline'>
          <input type='radio' id='medium' name='priority' value='medium' className='form-check-input' checked={ priority === 'medium' } onChange={ function( e ) { setPriority( e.target.value ) } } />
          <label htmlFor='medium' className='form-check-label'>Medium</label>
        </div>
        <div className='form-check form-check-inline'>
          <input type='radio' id='low' name='priority' value='low' className='form-check-input' checked={ priority === 'low' } onChange={ function( e ) { setPriority( e.target.value ) } } />
          <label htmlFor='low' className='form-check-label'>Low</label>
        </div>
      </fieldset>

      <div className='form-check mb-3'>
        <input type='checkbox' id='important' className='form-check-input' checked={ important } onChange={ function( e ) { setImportant( e.target.checked ) } } />
        <label htmlFor='important' className='form-check-label'>Important</label>
      </div>

      <button type='submit' className='btn btn-success'>{ props.editing === null ? 'Add Task' : 'Save Changes' }</button>
      <button type='button' className='btn btn-outline-secondary ms-1' onClick={ cancel }>Cancel</button>
    </form>
  )
}

export default TodoForm
