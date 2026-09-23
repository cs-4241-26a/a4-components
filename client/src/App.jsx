import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseTable from './ExpenseTable'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])

  const loadExpenses = async function() {
    const response = await fetch( '/expenses' )
    const data = await response.json()
    setExpenses( data )
  }

  useEffect( function() {
    loadExpenses()
  }, [] )

  const logout = async function() {
    await fetch( '/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Expense Tracker</h1>
        <button className="btn btn-outline-secondary" onClick={logout}>Log Out</button>
      </div>
      <ExpenseForm onExpenseAdded={loadExpenses} />
      <ExpenseTable expenses={expenses} onExpensesChanged={loadExpenses} />
    </div>
  )
}

export default App