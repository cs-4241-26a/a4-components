import React, { useState, useEffect } from 'react'
import Form from './Form.jsx'
import Item from './Items.jsx'

const App = () => {
  const [formData, setFormData] = useState({
    yourname: '',
    assignmenttype: '',
    gradeletter: '',
    GPA: '',
    cmts: ''
  })

  const [entries, setEntries] = useState([ ]) 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function add() {
    fetch( '/add', {
      method:'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       setEntries( json )
    })
  }
  
  // // make sure to only do this once
  // if( entries.length === 0 ) {
  //   fetch( '/read' )
  //     .then( response => response.json() )
  //     .then( json => {
  //       setEntries( json ) 
  //     })
  // }

  return (
    <div className="App">
      <Form 
        formData={formData} 
        onChange={handleChange} 
        onAdd={add} 
      />
      
      <ul>
        {entries.map((entry, i) => (
          <Item key={i} entry={entry} />
        ))}
      </ul> 
    </div>
  )
}

export default App
