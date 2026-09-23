import { useState } from 'react'

function ExpenseTable({ expenses, onExpensesChanged }) {
  const [editingId, setEditingId] = useState(null)
  const [editDescription, setEditDescription] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editAmount, setEditAmount] = useState('')

  const startEdit = function(expense) {
    setEditingId(expense._id)
    setEditDescription(expense.description)
    setEditCategory(expense.category)
    setEditAmount(expense.amount)
  }

  const saveEdit = async function(id) {
    const json = { id, description: editDescription, category: editCategory, amount: editAmount },
          body = JSON.stringify( json )

    await fetch( '/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    setEditingId(null)
    onExpensesChanged()
  }

  const deleteExpense = async function(id) {
    const json = { id },
          body = JSON.stringify( json )

    await fetch( '/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })

    onExpensesChanged()
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Spend Level</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(function(expense) {
          if( editingId === expense._id ) {
            return (
              <tr key={expense._id}>
                <td><input className="form-control" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} /></td>
                <td><input className="form-control" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} /></td>
                <td><input className="form-control" type="number" step="0.01" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} /></td>
                <td colSpan="2">
                  <button className="btn btn-info btn-sm" onClick={() => saveEdit(expense._id)}>Save</button>
                </td>
              </tr>
            )
          }

          return (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.spendLevel}</td>
              <td>
                <button className="btn btn-info btn-sm me-1" onClick={() => startEdit(expense)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteExpense(expense._id)}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ExpenseTable