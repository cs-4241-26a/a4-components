import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import AlertBox from './components/AlertBox.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import TransactionTable from './components/TransactionTable.jsx'
import { api } from './utils.js'

// Top-level component: owns the transaction list, the logged-in user, the
// alert banner, and which transaction (if any) is being edited. Everything
// below it is presentational and talks back up through callbacks.
export default function App() {
  const [username, setUsername] = useState('')
  const [transactions, setTransactions] = useState([])
  const [editing, setEditing] = useState(null)
  const [alert, setAlert] = useState(null)

  const showAlert = useCallback((message, type = 'danger') => {
    setAlert({ message, type })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const loadTransactions = useCallback(async () => {
    try {
      setTransactions(await api('/api/transactions'))
    } catch (err) {
      console.error(err)
      showAlert('Could not load your transactions. Please refresh the page.')
    }
  }, [showAlert])

  useEffect(() => {
    api('/api/me')
      .then((data) => {
        setUsername(data.username)
        if (sessionStorage.getItem('justCreatedAccount')) {
          showAlert("Welcome! Since that username didn't exist yet, we created a new account for you.", 'success')
          sessionStorage.removeItem('justCreatedAccount')
        }
      })
      .catch(() => { window.location.href = '/login.html' })
    loadTransactions()
  }, [loadTransactions, showAlert])

  async function saveTransaction(payload, id) {
    setAlert(null)
    try {
      await api(id ? `/api/transactions/${id}` : '/api/transactions', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      })
      setEditing(null)
      await loadTransactions()
      return true
    } catch (err) {
      showAlert(err.message || 'Something went wrong saving your transaction.')
      return false
    }
  }

  async function deleteTransaction(id) {
    if (!confirm('Delete this transaction? This cannot be undone.')) return
    try {
      await api(`/api/transactions/${id}`, { method: 'DELETE' })
      if (editing && editing._id === id) setEditing(null)
      loadTransactions()
    } catch (err) {
      showAlert(err.message || 'Something went wrong deleting your transaction.')
    }
  }

  async function logout() {
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch (err) {
      console.error(err)
    } finally {
      window.location.href = '/login.html'
    }
  }

  return (
    <>
      <a className="visually-hidden-focusable skip-link" href="#main-content">Skip to main content</a>
      <Navbar username={username} onLogout={logout} />

      <main id="main-content" className="container py-4">
        <AlertBox alert={alert} />

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <TransactionForm
              key={editing ? editing._id : 'new'}
              editing={editing}
              onSave={saveTransaction}
              onCancel={() => setEditing(null)}
              onError={showAlert}
            />
          </div>

          <div className="col-12 col-lg-7">
            <SummaryCards transactions={transactions} />
            <TransactionTable
              transactions={transactions}
              onEdit={setEditing}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>
    </>
  )
}
