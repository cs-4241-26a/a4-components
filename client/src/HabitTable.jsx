import { useState } from 'react';

export default function HabitTable({ habits, onDeleteHabit, onUpdateHabit }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editFrequency, setEditFrequency] = useState('');

  if (!habits || habits.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No habits tracked yet. Add one above!</p>;
  }

  const startEditing = (habit) => {
    setEditingId(habit._id || habit.id);
    setEditName(habit.name);
    setEditFrequency(habit.frequency);
  };

  const saveEdit = (id) => {
    onUpdateHabit(id, { name: editName, frequency: editFrequency });
    setEditingId(null);
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: '#1e1e1e', color: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
      <thead>
        <tr style={{ background: '#333', textAlign: 'left' }}>
          <th style={{ padding: '10px' }}>Habit Name</th>
          <th style={{ padding: '10px' }}>Frequency (Days)</th>
          <th style={{ padding: '10px' }}>Next Due</th>
          <th style={{ padding: '10px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((habit) => {
          const id = habit._id || habit.id;
          const isEditing = editingId === id;

          return (
            <tr key={id} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '10px' }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: '4px' }}
                  />
                ) : (
                  habit.name
                )}
              </td>
              <td style={{ padding: '10px' }}>
                {isEditing ? (
                  <input
                    type="number"
                    value={editFrequency}
                    onChange={(e) => setEditFrequency(e.target.value)}
                    style={{ padding: '4px', width: '80px' }}
                  />
                ) : (
                  habit.frequency
                )}
              </td>
              <td style={{ padding: '10px' }}>{habit.nextDue || 'N/A'}</td>
              <td style={{ padding: '10px' }}>
                {isEditing ? (
                  <button
                    onClick={() => saveEdit(id)}
                    style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(habit)}
                    style={{ background: '#2196F3', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' }}
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => onDeleteHabit(id)}
                  style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}