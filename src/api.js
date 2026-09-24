async function json( response ) {
  return response.json()
}

export function getMe() {
  return fetch( '/api/me' ).then( json )
}

export function logout() {
  return fetch( '/auth/logout', { method: 'POST' } ).then( json )
}

export function getScores() {
  return fetch( '/api/scores' ).then( json )
}

export function postScore({ name, hits, durationSeconds }) {
  return fetch( '/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, hits, durationSeconds })
  }).then( json )
}

export function patchScore( id, { name } ) {
  return fetch( '/api/scores/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  }).then( json )
}

export function deleteScore( id ) {
  return fetch( '/api/scores/' + id, { method: 'DELETE' } ).then( json )
}
