import { useEffect, useRef, useState } from 'react'
import RecurrencePicker from './RecurrencePicker.jsx'
import { CATEGORIES, PAYMENT_METHODS, todayISO } from '../utils.js'

const EMPTY_RECURRENCE = { frequency: 'daily', daysOfWeek: [], daysOfMonth: [] }

function blankForm() {
  return {
    type: 'expense',
    description: '',
    amount: '',
    date: todayISO(),
    category: CATEGORIES.expense[0],
    paymentMethod: 'Cash',
    recurring: false,
    recurrence: EMPTY_RECURRENCE,
    notes: ''
  }
}

function formFromTransaction(t) {
  return {
    type: t.type,
    description: t.description,
    amount: String(t.amount),
    date: new Date(t.date).toISOString().slice(0, 10),
    category: t.category,
    paymentMethod: t.paymentMethod,
    recurring: !!t.recurring,
    recurrence: { ...EMPTY_RECURRENCE, ...(t.recurring ? t.recurrence : {}) },
    notes: t.notes || ''
  }
}

// Add/Edit form. App remounts it (via `key`) whenever the transaction being
// edited changes, so initial state can come straight from props.
export default function TransactionForm({ editing, onSave, onCancel, onError }) {
  const [form, setForm] = useState(() => (editing ? formFromTransaction(editing) : blankForm()))
  const cardRef = useRef(null)

  useEffect(() => {
    if (editing) cardRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [editing])

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function changeType(type) {
    // Swap in the category list for the new type, keeping the choice if it exists there too
    setForm((prev) => ({
      ...prev,
      type,
      category: CATEGORIES[type].includes(prev.category) ? prev.category : CATEGORIES[type][0]
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const { recurring, recurrence } = form
    let cleanRecurrence = null
    if (recurring) {
      const { frequency, daysOfWeek, daysOfMonth } = recurrence
      if (frequency === 'weekly' && daysOfWeek.length === 0) {
        return onError('Please select at least one day of the week.')
      }
      if (frequency === 'monthly' && daysOfMonth.length === 0) {
        return onError('Please select at least one day of the month.')
      }
      cleanRecurrence = { frequency }
      if (frequency === 'weekly') cleanRecurrence.daysOfWeek = daysOfWeek
      if (frequency === 'monthly') cleanRecurrence.daysOfMonth = daysOfMonth
    }

    const saved = await onSave(
      {
        ...form,
        description: form.description.trim(),
        notes: form.notes.trim(),
        recurrence: cleanRecurrence
      },
      editing?._id
    )
    if (saved && !editing) setForm(blankForm())
  }

  return (
    <div className="card shadow-sm" ref={cardRef}>
      <div className="card-body">
        <h2 className="h5 card-title">{editing ? 'Edit Transaction' : 'Add a Transaction'}</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="mb-3">
            <legend className="form-label h6">Type</legend>
            <div className="btn-group w-100" role="group" aria-label="Transaction type">
              <input
                type="radio" className="btn-check" name="type" id="type-expense" value="expense"
                checked={form.type === 'expense'} onChange={() => changeType('expense')}
              />
              <label className="btn btn-outline-danger" htmlFor="type-expense">Expense</label>

              <input
                type="radio" className="btn-check" name="type" id="type-income" value="income"
                checked={form.type === 'income'} onChange={() => changeType('income')}
              />
              <label className="btn btn-outline-success" htmlFor="type-income">Income</label>
            </div>
          </fieldset>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text" className="form-control" id="description" required maxLength={200}
              value={form.description} onChange={(e) => update('description', e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="amount" className="form-label">Amount ($)</label>
              <input
                type="number" className="form-control" id="amount" step="0.01" min="0.01" required
                value={form.amount} onChange={(e) => update('amount', e.target.value)}
              />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date" className="form-control" id="date" required
                value={form.date} onChange={(e) => update('date', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select" id="category" required
              value={form.category} onChange={(e) => update('category', e.target.value)}
            >
              {CATEGORIES[form.type].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <fieldset className="mb-3">
            <legend className="form-label h6">Payment Method</legend>
            {PAYMENT_METHODS.map((pm) => (
              <div className="form-check form-check-inline" key={pm}>
                <input
                  className="form-check-input" type="radio" name="paymentMethod"
                  id={`pm-${pm.toLowerCase()}`} value={pm}
                  checked={form.paymentMethod === pm} onChange={() => update('paymentMethod', pm)}
                />
                <label className="form-check-label" htmlFor={`pm-${pm.toLowerCase()}`}>{pm}</label>
              </div>
            ))}
          </fieldset>

          <div className="mb-2 form-check">
            <input
              type="checkbox" className="form-check-input" id="recurring"
              checked={form.recurring} onChange={(e) => update('recurring', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="recurring">This is a recurring transaction</label>
          </div>

          {form.recurring && (
            <RecurrencePicker value={form.recurrence} onChange={(r) => update('recurrence', r)} />
          )}

          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notes (optional)</label>
            <textarea
              className="form-control" id="notes" rows="2" maxLength={500}
              value={form.notes} onChange={(e) => update('notes', e.target.value)}
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editing ? 'Save Changes' : 'Add Transaction'}
            </button>
            {editing && (
              <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
