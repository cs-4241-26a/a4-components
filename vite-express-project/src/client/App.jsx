import React, { useEffect, useState } from 'react';
// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.
function Todo({item, count, cost, id, deleteE}) {
    return <li className="listli"> {item + " x " + count + " = $" + (cost * count)} 
    <button className="itembutton" id={id} onClick={e => deleteE(e, id)}>
      X
    </button>
    </li>
}


// main component
function App() {

const [todo, setTodo] = useState([])
const [total, setTotal] = useState(0)

useEffect(function(){
  load()
}, []
)
useEffect(function(){
  //handle the total and stuff

  let localTotal = 0

  for(let i = 0; i < todo.length; i++){

    localTotal += (todo[i].count * todo[i].cost)
  }

  setTotal(localTotal)
  
}, [todo])


  // load in our data from the server
  function load() {
    fetch( '/read', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
         setTodo(json)
      })
  }
   
  // add a new todo list item
  function add( evt ) {
    evt.preventDefault()
    const item = document.querySelector('#item').value
    const cost = document.querySelector('#cost').value
    const count = document.querySelector('#count').value

    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ item:item , cost:cost, count: count, id: crypto.randomUUID() }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {

       setTodo(json) 
    })
  }
  //delete route here
  function deleteEntry( evt, id ){
    evt.preventDefault()

    fetch('/delete', {
      method:'POST',
      body: JSON.stringify({ id:id }), //update this with correct fields
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {

       setTodo(json) 
    })
  }

  // render component HTML using JSX 

    return (
      <div className="App">
      <h1 id="title" className="titles">
      Shopping List
      </h1>
      <form className="form1" method="POST">
        <input className="listinput" type='text' id='item' placeholder='Item?'/>
        <br></br>
        <input className="listinput" id='cost' placeholder='Cost? $' type="number" min="0"/>
        <br></br>
        <input className="listinput" id='count' placeholder='How many?' type="number" name="quantity" min="0" step="1"/>
        <br></br>
        <button className="submitbutton" onClick={ e => add( e )}>Submit</button>
      </form>
             {
        todo.length != 0  ?  <h2 id="tdisp" className="titles"> Total is ${total} </h2> : ""
       }
        <ul className="mainlist">
          {/* ensure that this todo has the correct fields */}
          { todo.map( (t,i) => 
            <Todo
              key={i}
              item={t.item}
              count = {t.count}
              cost = {t.cost}
              id = {t.id}
              deleteE={deleteEntry}
            /> ) }
       </ul> 

      
      </div>
    )
  }


export default App