// builds the results table from the array of poems the server sends back
function PoemTable( props ) {
  return (
    <table id="poem-table">
      <thead>
        <tr>
          <th scope="col">Author</th>
          <th scope="col">Title</th>
          <th scope="col">Form</th>
          <th scope="col">Maqam</th>
          <th scope="col">Era</th>
          <th scope="col">Mood</th>
          <th scope="col">Multiple Maqams?</th>
          <th scope="col">Notes</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody id="poem-rows">
        { props.poems.map( function( poem ) {
          return (
            <tr key={ poem._id }>
              <td>{ poem.author }</td>
              <td>{ poem.title }</td>
              <td>{ poem.form }</td>
              <td>{ poem.maqams.join( ', ' ) }</td>
              <td>{ poem.era }</td>
              <td>{ poem.mood }</td>
              <td>{ poem.multiMaqam ? 'Yes' : 'No' }</td>
              <td>{ poem.notes }</td>
              <td>
                <button
                  className="edit-button"
                  aria-label={ 'Edit ' + poem.title }
                  onClick={ () => props.onEdit( poem ) }
                >Edit</button>
                <button
                  className="delete-button"
                  aria-label={ 'Delete ' + poem.title }
                  onClick={ () => props.onDelete( poem._id ) }
                >Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PoemTable
