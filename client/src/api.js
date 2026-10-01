// Thin wrappers around the Express API. Every car route returns the user's
// full, updated car list, so callers can just replace their state with it.

const redirectToLogin = function() {
  window.location.href = '/'
}

const request = async function( url, options = {} ) {
  const response = await fetch( url, options )

  if( response.status === 401 ) {
    redirectToLogin()
    throw new Error( 'Not authenticated' )
  }

  const data = await response.json()
  if( !response.ok ) throw new Error( data.error || 'Request failed' )
  return data
}

const sendJson = function( url, method, body ) {
  return request( url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( body )
  })
}

export const getSession = function() {
  return request( '/api/session' )
}

export const getCars = function() {
  return request( '/cars' )
}

export const addCar = function( car ) {
  return sendJson( '/cars', 'POST', car )
}

export const updateCar = function( id, car ) {
  return sendJson( `/cars/${ id }`, 'PUT', car )
}

export const deleteCar = function( id ) {
  return request( `/cars/${ id }`, { method: 'DELETE' } )
}

export const logout = async function() {
  await fetch( '/logout', { method: 'POST' } )
  redirectToLogin()
}
