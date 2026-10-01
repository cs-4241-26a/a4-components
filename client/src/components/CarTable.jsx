import CarRow from './CarRow.jsx'

const CarTable = function({ cars, editingId, onEdit, onDelete }) {
  return (
    <div className='table-container'>
      <table className='table is-fullwidth is-striped is-hoverable'>
        <thead>
          <tr>
            <th scope='col'>Model</th>
            <th scope='col'>Year</th>
            <th scope='col'>MPG</th>
            <th scope='col'>Fuel Type</th>
            <th scope='col'>Efficiency</th>
            <th scope='col'>Age Category</th>
            <th scope='col'>Notes</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          { cars.length === 0 ? (
            <tr>
              <td colSpan='8' className='has-text-grey has-text-centered'>
                No cars yet &mdash; add one using the form.
              </td>
            </tr>
          ) : cars.map( car => (
            <CarRow
              key={ car.id }
              car={ car }
              isEditing={ car.id === editingId }
              onEdit={ onEdit }
              onDelete={ onDelete }
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CarTable
