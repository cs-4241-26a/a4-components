import { useState, useEffect } from 'react'

let maqamNames = [ 'Rast', 'Bayati', 'Hijaz', 'Saba', 'Kurd', 'Nahawand', 'Ajam', 'Sikah', 'Jiharkah' ]
let poemForms = [ 'Qasida', 'Ghazal', 'Muwashshah', 'Free verse' ]

function PoemForm( props ) {
  let [ author, setAuthor ] = useState( '' )
  let [ title, setTitle ] = useState( '' )
  let [ maqams, setMaqams ] = useState( [] )
  let [ form, setForm ] = useState( '' )
  let [ notes, setNotes ] = useState( '' )
  let [ birthYear, setBirthYear ] = useState( '' )

  let editingPoem = props.editingPoem

  // fills the form with an existing poem's values so it can be edited
  useEffect( function() {
    if( editingPoem === null ) {
      setAuthor( '' )
      setTitle( '' )
      setMaqams( [] )
      setForm( '' )
      setNotes( '' )
      setBirthYear( '' )
    }else{
      setAuthor( editingPoem.author )
      setTitle( editingPoem.title )
      setMaqams( editingPoem.maqams )
      setForm( editingPoem.form )
      setNotes( editingPoem.notes )
      setBirthYear( editingPoem.birthYear )
    }
  }, [ editingPoem ] )

  function toggleMaqam( name ) {
    if( maqams.includes( name ) ) {
      setMaqams( maqams.filter( function( m ) { return m !== name } ) )
    }else{
      setMaqams( maqams.concat( name ) )
    }
  }

  async function handleSubmit( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    if( maqams.length === 0 ) {
      props.setStatus( 'Please check at least one maqam.' )
      return
    }

    let saved = await props.onSave({
      author: author,
      title: title,
      form: form,
      maqams: maqams,
      notes: notes,
      birthYear: birthYear
    })

    if( saved ) {
      setAuthor( '' )
      setTitle( '' )
      setMaqams( [] )
      setForm( '' )
      setNotes( '' )
      setBirthYear( '' )
    }
  }

  return (
    <>
      <h2>{ editingPoem === null ? 'Add a Poem' : 'Edit a Poem' }</h2>
      <p>Fields marked (required) must be filled in.</p>

      <form id="poem-form" onSubmit={ handleSubmit }>
        <label htmlFor="author">Author (required)</label>
        <input type="text" id="author" value={ author } onChange={ e => setAuthor( e.target.value ) } required />

        <label htmlFor="title">Title (required)</label>
        <input type="text" id="title" value={ title } onChange={ e => setTitle( e.target.value ) } required />

        <fieldset>
          <legend>Maqam(s) (required, check every maqam the poem uses)</legend>
          { maqamNames.map( function( name ) {
            return (
              <label key={ name }>
                <input
                  type="checkbox"
                  name="maqam"
                  value={ name }
                  checked={ maqams.includes( name ) }
                  onChange={ () => toggleMaqam( name ) }
                /> { name }
              </label>
            )
          })}
        </fieldset>

        <label htmlFor="birthYear">Author's birth year (required)</label>
        <input
          type="number"
          id="birthYear"
          min="1"
          max="2026"
          aria-describedby="year-hint"
          value={ birthYear }
          onChange={ e => setBirthYear( e.target.value ) }
          required
        />
        <small id="year-hint">Enter a year like 1923. Poets born in 1800 or later count as Modern.</small>

        <fieldset>
          <legend>Form (required)</legend>
          { poemForms.map( function( name ) {
            return (
              <label key={ name }>
                <input
                  type="radio"
                  name="poemForm"
                  value={ name }
                  checked={ form === name }
                  onChange={ () => setForm( name ) }
                  required
                /> { name }
              </label>
            )
          })}
        </fieldset>

        <label htmlFor="notes">Notes</label>
        <textarea id="notes" value={ notes } onChange={ e => setNotes( e.target.value ) }></textarea>

        <button type="submit">{ editingPoem === null ? 'Add Poem' : 'Save Changes' }</button>
        { editingPoem !== null && <button type="button" className="secondary" onClick={ props.onCancel }>Cancel</button> }
      </form>
    </>
  )
}

export default PoemForm
