import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import CarForm from './components/CarForm.jsx'
import CarTable from './components/CarTable.jsx'
import * as api from './api.js'

const App = function() {
  const [ username, setUsername ] = useState( '' )
  const [ cars, setCars ] = useState( [] )
  const [ editingCar, setEditingCar ] = useState( null )
  const [ error, setError ] = useState( '' )

  useEffect( function() {
    api.getSession().then( data => setUsername( data.username ) ).catch( () => {} )
    api.getCars().then( setCars ).catch( err => setError( err.message ) )
  }, [] )

  const handleSave = async function( car ) {
    try {
      const updated = editingCar
        ? await api.updateCar( editingCar.id, car )
        : await api.addCar( car )
      setCars( updated )
      setEditingCar( null )
      setError( '' )
      return true
    }catch( err ) {
      setError( err.message )
      return false
    }
  }

  const handleDelete = async function( id ) {
    try {
      setCars( await api.deleteCar( id ) )
      if( editingCar && editingCar.id === id ) setEditingCar( null )
      setError( '' )
    }catch( err ) {
      setError( err.message )
    }
  }

  return (
    <>
      <Navbar username={ username } onLogout={ api.logout } />

      <section className='section'>
        <div className='container'>
          <header className='mb-5'>
            <h1 className='title'>Fleet Data</h1>
            <p className='subtitle is-6'>
              Add, edit, and remove cars from your fleet. Efficiency and age category are calculated automatically by the server.
            </p>
          </header>

          { error && (
            <div className='notification is-danger'>
              <button className='delete' aria-label='Dismiss' onClick={ () => setError( '' ) }></button>
              { error }
            </div>
          )}

          <div className='columns'>
            <div className='column is-4'>
              <div className='box'>
                <h2 className='title is-5'>{ editingCar ? 'Edit Car' : 'Add Car' }</h2>
                <CarForm
                  editingCar={ editingCar }
                  onSave={ handleSave }
                  onCancel={ () => setEditingCar( null ) }
                />
              </div>
            </div>

            <div className='column is-8'>
              <div className='box'>
                <h2 className='title is-5'>Your Fleet</h2>
                <CarTable
                  cars={ cars }
                  editingId={ editingCar ? editingCar.id : null }
                  onEdit={ setEditingCar }
                  onDelete={ handleDelete }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
