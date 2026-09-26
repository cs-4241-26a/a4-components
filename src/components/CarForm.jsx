import { useState, useEffect, useRef } from 'react'

const emptyForm = {
  make: '',
  model: '',
  year: '',
  price: '',
  mpg: '',
  transmission: 'Automatic',
  certified: false,
  notes: ''
}

export default function CarForm({ editingCar, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const titleRef = useRef(null)
  const isEditing = editingCar !== null

  useEffect(() => {
    if (editingCar) {
      setForm({
        make: editingCar.make,
        model: editingCar.model,
        year: editingCar.year,
        price: editingCar.price,
        mpg: editingCar.mpg,
        transmission: editingCar.transmission || 'Automatic',
        certified: editingCar.certified || false,
        notes: editingCar.notes || ''
      })
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setForm(emptyForm)
    }
  }, [editingCar])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      make: form.make.trim(),
      model: form.model.trim(),
      year: form.year,
      price: form.price,
      mpg: form.mpg,
      transmission: form.transmission,
      certified: String(form.certified),
      notes: form.notes.trim()
    })
  }

  const handleCancel = () => {
    setForm(emptyForm)
    onCancel()
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h5 card-title fw-bold" ref={titleRef}>
          {isEditing ? 'Edit Car' : 'Add a Car'}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-2">
            <label htmlFor="make" className="form-label">Make</label>
            <input type="text" id="make" name="make" className="form-control form-control-sm"
                   placeholder="e.g. Toyota" required value={form.make} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label htmlFor="model" className="form-label">Model</label>
            <input type="text" id="model" name="model" className="form-control form-control-sm"
                   placeholder="e.g. Camry" required value={form.model} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label htmlFor="year" className="form-label">Year</label>
            <input type="number" id="year" name="year" className="form-control form-control-sm"
                   min="1900" max="2026" placeholder="e.g. 2020" required value={form.year} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label htmlFor="price" className="form-label">Price ($)</label>
            <input type="number" id="price" name="price" className="form-control form-control-sm"
                   min="0" step="100" placeholder="e.g. 18000" required value={form.price} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label htmlFor="mpg" className="form-label">MPG</label>
            <input type="number" id="mpg" name="mpg" className="form-control form-control-sm"
                   min="0" step="0.1" placeholder="e.g. 32" required value={form.mpg} onChange={handleChange} />
          </div>

          <fieldset className="mb-2">
            <legend className="form-label mb-1">Transmission</legend>
            <div className="d-flex gap-3">
              {['Automatic', 'Manual', 'CVT'].map(t => (
                <div className="form-check" key={t}>
                  <input className="form-check-input" type="radio" name="transmission"
                         id={`trans-${t.toLowerCase()}`} value={t}
                         checked={form.transmission === t} onChange={handleChange} />
                  <label className="form-check-label" htmlFor={`trans-${t.toLowerCase()}`}>{t}</label>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="certified" name="certified"
                   checked={form.certified} onChange={handleChange} />
            <label className="form-check-label" htmlFor="certified">Certified Pre-Owned</label>
          </div>

          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea id="notes" name="notes" className="form-control form-control-sm"
                      rows="2" placeholder="Additional details…" value={form.notes} onChange={handleChange} />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm flex-fill">
              {isEditing ? 'Update Car' : 'Add Car'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
