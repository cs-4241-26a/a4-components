const CarRow = function({ car, isEditing, onEdit, onDelete }) {
  return (
    <tr className={ isEditing ? 'is-selected' : '' }>
      <td>{ car.favorite ? '★ ' + car.model : car.model }</td>
      <td>{ car.year }</td>
      <td>{ car.mpg }</td>
      <td>{ car.fuelType }</td>
      <td className={ 'efficiency-' + car.efficiency.toLowerCase() }>{ car.efficiency }</td>
      <td>{ car.ageCategory }</td>
      <td>{ car.notes }</td>
      <td>
        <button className='button is-small is-info mr-2' onClick={ () => onEdit( car ) }>Edit</button>
        <button className='button is-small is-danger' onClick={ () => onDelete( car.id ) }>Delete</button>
      </td>
    </tr>
  )
}

export default CarRow
