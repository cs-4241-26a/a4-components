import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

let players = [
  { 'name': 'Yordan Alvarez', 'avg': 0.317, 'obp': 0.433, 'slg': 0.604 },
  { 'name': 'Mike Trout', 'avg': 0.239, 'obp': 0.375, 'slg': 0.423 },
  { 'name': 'Juan Soto', 'avg': 0.281, 'obp': 0.402, 'slg': 0.542 },
]

app.use(express.json())


app.get('/read', (req, res) => res.json(players))


app.post('/add', (req, res) => {
  const { name, avg, obp, slg } = req.body
  const existingIdx = players.findIndex((p) => p.name === name)

  if (existingIdx !== -1) {
    players[existingIdx] = { name, avg, obp, slg }
  } else {
    players.push({ name, avg, obp, slg })
  }

  res.json(players)
})

// Remove a player
app.post('/remove', (req, res) => {
  const { name } = req.body
  players = players.filter((p) => p.name !== name)
  res.json(players)
})

ViteExpress.listen(app, 3000)