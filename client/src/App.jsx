import { useState, useEffect } from 'react';
import HabitForm from './HabitForm';
import HabitTable from './HabitTable';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch habits from Express backend API
  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/items');
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      }
    } catch (err) {
      console.error('Failed to fetch habits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Add a new habit via API
  const handleAddHabit = async (newHabit) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHabit),
      });
      if (response.ok) {
        fetchHabits(); // Refresh list
      }
    } catch (err) {
      console.error('Failed to add habit:', err);
    }
  };

  // Update an existing habit via API
  const handleUpdateHabit = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchHabits(); // Refresh list
      }
    } catch (err) {
      console.error('Failed to update habit:', err);
    }
  };

  // Delete a habit via API
  const handleDeleteHabit = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHabits(habits.filter((h) => (h._id || h.id) !== id));
      }
    } catch (err) {
      console.error('Failed to delete habit:', err);
    }
  };

  // Handle Logout (matches your auth.js route)
  const handleLogout = () => {
    window.location.href = '/auth/logout';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Track 'Em</h1>
          <h3 style={{ margin: '5px 0 0 0', color: '#aaa' }}>Dashboard</h3>
        </div>
        <button 
          onClick={handleLogout}
          style={{ background: '#555', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      <p style={{ color: '#ccc' }}>Manage your active habits below.</p>
      
      <HabitForm onAddHabit={handleAddHabit} />
      
      {loading ? (
        <p>Loading habits...</p>
      ) : (
        <HabitTable 
          habits={habits} 
          onDeleteHabit={handleDeleteHabit} 
          onUpdateHabit={handleUpdateHabit} 
        />
      )}
    </div>
  );
}