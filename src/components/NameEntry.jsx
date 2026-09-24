import { useState } from 'react'

export default function NameEntry({ finalHits, onSave, onSkip }) {
  const [ name, setName ] = useState( '' )

  function handleSubmit( e ) {
    e.preventDefault()
    const trimmed = name.trim()
    if( !trimmed ) return
    onSave( trimmed )
  }

  return (
    <div id="nameEntry" className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '380px' }}>
        <p className="text-center mb-3">Your score: <span id="finalHits">{finalHits}</span> hits</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter your name:</label>
            <input
              id="name"
              className="form-control"
              placeholder="Name"
              required
              value={name}
              onChange={ e => setName( e.target.value ) }
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Save</button>
        </form>
        <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={onSkip}>Don't Save</button>
      </div>
    </div>
  )
}
