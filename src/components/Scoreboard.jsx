export default function Scoreboard({ rows, myId, onRename, onDelete, onBack }) {
  function handleRename( row ) {
    const name = window.prompt( 'New name', row.name )
    if( name ) onRename( row.id, name )
  }

  return (
    <div id="scoreboard" className="container py-4">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Hits</th>
            <th>Hits/sec</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { rows.map( function( row, i ) {
            return (
              <tr key={row.id}>
                <td>{ i + 1 }</td>
                <td>{ row.name }</td>
                <td>{ row.hits }</td>
                <td>{ row.hitsPerSecond }</td>
                <td className="actions">
                  { row.ownerId === myId && (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success me-1"
                        onClick={ () => handleRename( row ) }
                      >Rename</button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={ () => onDelete( row.id ) }
                      >Delete</button>
                    </>
                  ) }
                </td>
              </tr>
            )
          }) }
        </tbody>
      </table>
      <button className="btn btn-secondary" onClick={onBack}>Home</button>
    </div>
  )
}
