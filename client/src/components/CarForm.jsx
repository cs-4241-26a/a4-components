import { useEffect, useState } from 'react'

const FUEL_TYPES = [ 'Gasoline', 'Diesel', 'Hybrid', 'Electric' ]

const emptyForm = {
  model: '',
  year: '',
  mpg: '',
  fuelType: 'Gasoline',
  notes: '',
  favorite: false
}

const toFormState = function( car ) {
  if( !car ) return emptyForm
  return {
    model: car.model,
    year: String( car.year ),
    mpg: String( car.mpg ),
    fuelType: car.fuelType,
    notes: car.notes || '',
    favorite: !!car.favorite
  }
}

// Controlled form used for both adding and editing. When `editingCar` changes
// (user clicked Edit, or the edit finished/cancelled) the fields are reloaded.
const CarForm = function({ editingCar, onSave, onCancel }) {
  const [ form, setForm ] = useState( emptyForm )

  useEffect( function() {
    setForm( toFormState( editingCar ) )
  }, [ editingCar ] )

  const update = function( field, value ) {
    setForm( prev => ({ ...prev, [ field ]: value }) )
  }

  const handleSubmit = async function( event ) {
    event.preventDefault()

    const model = form.model.trim()
    if( !model || !form.year || !form.mpg ) return

    const saved = await onSave({ ...form, model, notes: form.notes.trim() })
    if( saved && !editingCar ) setForm( emptyForm )
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className='field'>
        <label className='label' htmlFor='model'>Model</label>
        <div className='control'>
          <input className='input' type='text' id='model' required
            value={ form.model } onChange={ e => update( 'model', e.target.value ) } />
        </div>
      </div>

      <div className='field'>
        <label className='label' htmlFor='year'>Year</label>
        <div className='control'>
          <input className='input' type='number' id='year' min='1900' max='2100' required
            value={ form.year } onChange={ e => update( 'year', e.target.value ) } />
        </div>
      </div>

      <div className='field'>
        <label className='label' htmlFor='mpg'>MPG</label>
        <div className='control'>
          <input className='input' type='number' id='mpg' min='0' step='0.1' required
            value={ form.mpg } onChange={ e => update( 'mpg', e.target.value ) } />
        </div>
      </div>

      <div className='field'>
        <label className='label' id='fuel-type-label'>Fuel Type</label>
        <div className='control' role='radiogroup' aria-labelledby='fuel-type-label'>
          { FUEL_TYPES.map( type => (
            <label className='radio' key={ type }>
              <input type='radio' name='fuelType' value={ type }
                checked={ form.fuelType === type }
                onChange={ () => update( 'fuelType', type ) } />
              { ' ' }{ type }
            </label>
          ))}
        </div>
      </div>

      <div className='field'>
        <label className='label' htmlFor='notes'>Notes</label>
        <div className='control'>
          <textarea className='textarea' id='notes' rows='3' placeholder='Optional notes about this car'
            value={ form.notes } onChange={ e => update( 'notes', e.target.value ) } />
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <label className='checkbox'>
            <input type='checkbox' id='favorite'
              checked={ form.favorite } onChange={ e => update( 'favorite', e.target.checked ) } />
            { ' ' }Mark as favorite
          </label>
        </div>
      </div>

      <div className='field is-grouped mt-4'>
        <div className='control'>
          <button type='submit' className='button is-primary'>
            { editingCar ? 'Update Car' : 'Add Car' }
          </button>
        </div>
        { editingCar && (
          <div className='control'>
            <button type='button' className='button is-light' onClick={ onCancel }>Cancel</button>
          </div>
        )}
      </div>
    </form>
  )
}

export default CarForm
