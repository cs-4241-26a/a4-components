import { useState } from 'react'

function ExpenseForm({ onExpenseAdded }) {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async function(event) {
    event.preventDefault()

    const json = { description, category, amount },
          body = JSON.stringify( json )

    await fetch( '/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    setDescription('')
    setCategory('')
    setAmount('')

    onExpenseAdded()
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-sm-3">
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="col-sm-3">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="col-sm-3">
        <input
          type="number"
          step="0.01"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="col-sm-3">
        <button type="submit" className="btn btn-primary w-100">Add Expense</button>
      </div>
    </form>
  )
}

export default ExpenseForm