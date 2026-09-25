import React, { useState, useEffect } from 'react';

export default function App() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    avg: '',
    obp: '',
    slg: ''
  });
  const [removeName, setRemoveName] = useState('');

  // Table Data State
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await fetch('/read');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    const { name, avg, obp, slg } = formData;


    if (name === '' || avg === '' || obp === '' || slg === '') {
      alert('Please fill in all fields before submitting.');
      return;
    }
    const playerExists = players.some(
      (player) => player.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (playerExists) {
      alert('Player already exists in the table! The player will be updated with the new stats.');
    }
    const numAvg = parseFloat(avg);
    const numObp = parseFloat(obp);
    const numSlg = parseFloat(slg);

    if (
      isNaN(numAvg) || isNaN(numObp) || isNaN(numSlg) ||
      numAvg < 0 || numAvg > 1 ||
      numObp < 0 || numObp > 1 ||
      numSlg < 0 || numSlg > 4 ||
      numAvg > numSlg ||
      (numObp === 0 && (numAvg > 0 || numSlg > 0))
    ) {
      alert('Please enter valid numbers for AVG, OBP, and SLG.');
      return;
    }

    try {
      const response = await fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avg, obp, slg })
      });
      const updatedList = await response.json();
      setPlayers(updatedList);
      setFormData({ name: '', avg: '', obp: '', slg: '' });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const handleRemovePlayer = async (e) => {
    e.preventDefault();

    if (!removeName.trim()) {
      alert('Please enter a player name to remove.');
      return;
    }
    const playerExists = players.some(
      (player) => player.name.toLowerCase() === removeName.trim().toLowerCase()
    );

    if (!playerExists) {
      alert('Player not found in the table.');
      return;
    }
    try {
      const response = await fetch('/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: removeName })
      });
      const updatedList = await response.json();
      setPlayers(updatedList);
      setRemoveName('');
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  return (
    <div className="google-sans">
      <h1>Baseball Player Stats Table</h1>
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          id="name"
          placeholder="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="avg"
          placeholder="average"
          value={formData.avg}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="obp"
          placeholder="on-base"
          value={formData.obp}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="slg"
          placeholder="slugging"
          value={formData.slg}
          onChange={handleInputChange}
        />
        <button type="submit" id="AddPlayer">add</button>
      </form>

      <p className="first-paragraph">
        This is a table to add your favorite players! In order to add a player, enter their name, batting average, on-base percentage, and slugging percentage, then click the <span id="submit-span">add</span> button.
      </p>
      <p>
        In order to remove a player, enter their name in the remove field and click the <span id="remove-span">remove</span> button.
      </p>
      <table id="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Batting Average</th>
            <th>On-Base Percentage</th>
            <th>Slugging Percentage</th>
            <th>OPS</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {players.map((player, index) => {
            const avgVal = parseFloat(player.avg).toFixed(3);
            const obpVal = parseFloat(player.obp).toFixed(3);
            const slgVal = parseFloat(player.slg).toFixed(3);
            const opsVal = (parseFloat(player.obp) + parseFloat(player.slg)).toFixed(3);

            return (
              <tr key={player.name || index}>
                <td>{player.name}</td>
                <td>{avgVal}</td>
                <td>{obpVal}</td>
                <td>{slgVal}</td>
                <td>{opsVal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form onSubmit={handleRemovePlayer}>
        <input
          type="text"
          id="remove"
          placeholder="name"
          value={removeName}
          onChange={(e) => setRemoveName(e.target.value)}
        />
        <button type="submit" id="RemovePlayer">remove</button>
      </form>

      <h2>Stat Definitions</h2>
      <ul>
        <li>
          <strong>Batting Average</strong> - The number of hits divided by the number of at-bats. Must be between 0 and 1.
        </li>
        <li>
          <strong>On-Base Percentage</strong> - How frequently a batter reaches base per plate appearance. Must be between 0 and 1.
        </li>
        <li>
          <strong>Slugging Percentage</strong> - The total number of bases per at-bat. Must be between 0 and 4.
        </li>
        <li>
          <strong>OPS</strong> - On-base plus slugging. This is calculated by adding a player's on-base percentage and slugging percentage together.
        </li>
      </ul>
    </div>
  );
}