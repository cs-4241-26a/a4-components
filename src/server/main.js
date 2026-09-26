import express from 'express'
import ViteExpress from 'vite-express'

const app = express()


let appdata = [
  { id: 1, task: 'buy groceries', priority: 'medium', created: Date.now() },
  { id: 2, task: 'finish homework', priority: 'high', created: Date.now() },
  { id: 3, task: 'do the laundry', priority: 'low', created: Date.now() }
]

let nextId = 4


const addDerivedFields = function( item ) {
  const daysByPriority = { high: 1, medium: 3, low: 7 }
  const daysToAdd = daysByPriority[ item.priority ] || 3
  const deadline = item.created + daysToAdd * 24 * 60 * 60 * 1000
  return { ...item, deadline }
}

app.use( express.json() )

app.get( '/api/todos', ( req, res ) => {
  res.json( appdata )
})

app.post( '/add', ( req, res ) => {
  const newTodo = {
    id: nextId++,
    task: req.body.task,
    priority: req.body.priority,
    created: Date.now()
  }
  appdata.push( addDerivedFields( newTodo ) )
  res.json( appdata )
})

app.post( '/delete', ( req, res ) => {
  appdata = appdata.filter( item => item.id !== req.body.id )
  res.json( appdata )
})

app.post( '/update', ( req, res ) => {
  appdata = appdata.map( function( item ) {
    if( item.id === req.body.id ) {
      const updated = { ...item, task: req.body.task, priority: req.body.priority }
      return addDerivedFields( updated )
    }
    return item
  })
  res.json( appdata )
})

ViteExpress.listen( app, 3000 )