import React from 'react'

const Item = ({ entry }) => {
  return (
    <li>
      <strong>name:</strong> {entry.yourname} <br/> 
      <strong>assignment type:</strong> {entry.assignmenttype} <br/> 
      <strong>grade:</strong> {entry.gradeletter} <br/> 
      <strong>GPA:</strong> {entry.GPA} <br/>
      <strong>comments:</strong> {entry.cmts} <br/> 
      <br/>
    </li>
  )
}

export default Item