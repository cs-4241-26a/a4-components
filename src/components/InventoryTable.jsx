const VALUE_COLOURS = {
  'Great Deal': 'success',
  'Good Value': 'primary',
  'Fair Price': 'warning text-dark',
  'Premium': 'secondary'
}

function CarRow({ car, onEdit, onDelete }) {
  return (
    <tr>
      <td>{car.make}</td>
      <td>{car.model}</td>
      <td>{car.year}</td>
      <td>${car.price.toLocaleString()}</td>
      <td>{car.mpg}</td>
      <td>{car.transmission || 'Automatic'}</td>
      <td>
        {car.certified && <span className="badge bg-info text-dark">CPO</span>}
      </td>
      <td>
        <span className={`badge bg-${VALUE_COLOURS[car.valueRating] || 'secondary'}`}>
          {car.valueRating}
        </span>
      </td>
      <td className="text-muted small">{car.notes || ''}</td>
      <td className="text-nowrap">
        <button className="btn btn-outline-primary btn-sm me-1" onClick={() => onEdit(car)}>
          Edit
        </button>
        <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(car.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default function InventoryTable({ cars, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h5 card-title fw-bold">My Inventory</h2>
        {cars.length === 0 ? (
          <p className="text-muted text-center py-3" role="status" aria-live="polite">
            No cars in your inventory yet — add one using the form!
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-sm align-middle" aria-label="Car inventory">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Make</th>
                  <th scope="col">Model</th>
                  <th scope="col">Year</th>
                  <th scope="col">Price</th>
                  <th scope="col">MPG</th>
                  <th scope="col">Trans.</th>
                  <th scope="col">CPO</th>
                  <th scope="col">Value</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <CarRow key={car.id} car={car} onEdit={onEdit} onDelete={onDelete} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
