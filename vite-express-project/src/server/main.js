import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const todos = [

]

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( todos ) ) //get list

app.post( '/add', ( req,res ) => { //submit
  todos.push( req.body )
  res.json( todos )
})

app.post('/delete', (req, res) => {
  for(let i = 0; i < todos.length; i++){
    if(todos[i].id === req.body.id){
        todos.splice(i, 1)
      }
  }
  
  res.json( todos )
})

ViteExpress.listen( app, 3000 )