import { useState } from 'react';

export default function HabitForm({ onAddHabit }) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddHabit({ name, frequency });
    setName('');
    setFrequency('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Habit Name (e.g., Workout)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="number"
        placeholder="Frequency (days)"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Add Habit</button>
    </form>
  );
}