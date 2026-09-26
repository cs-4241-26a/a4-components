import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import CarForm from './components/CarForm.jsx'
import InventoryTable from './components/InventoryTable.jsx'

const postJSON = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

export default function App() {
  const [username, setUsername] = useState('')
  const [cars, setCars] = useState([])
  const [editingCar, setEditingCar] = useState(null)

  useEffect(() => {
    (async () => {
      const sessionRes = await fetch('/session')
      if (sessionRes.status === 401) {
        window.location.href = '/login.html'
        return
      }
      const { username } = await sessionRes.json()
      setUsername(username)

      const dataRes = await fetch('/data')
      if (dataRes.status === 401) {
        window.location.href = '/login.html'
        return
      }
      setCars(await dataRes.json())
    })()
  }, [])

  const handleLogout = async () => {
    await fetch('/logout', { method: 'POST' })
    window.location.href = '/login.html'
  }

  const handleSubmit = async (formData) => {
    const isEditing = editingCar !== null
    if (isEditing) formData.id = editingCar.id
    const data = await postJSON(isEditing ? '/update' : '/submit', formData)
    setCars(data)
    setEditingCar(null)
  }

  const handleEdit = (car) => {
    setEditingCar(car)
  }

  const handleCancelEdit = () => {
    setEditingCar(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this car?')) return
    const data = await postJSON('/delete', { id })
    setCars(data)
  }

  return (
    <>
      <Navbar username={username} onLogout={handleLogout} />
      <main className="container-fluid py-4 flex-grow-1" id="main-content">
        <div className="row g-4 align-items-start">
          <div className="col-lg-3">
            <CarForm
              editingCar={editingCar}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
            />
          </div>
          <div className="col-lg-9">
            <InventoryTable
              cars={cars}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
      <footer className="bg-dark text-secondary text-center py-2 small">
        &copy; 2026 Max's Auto Dealership
      </footer>
    </>
  )
}
