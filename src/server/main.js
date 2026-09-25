import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

let players = [
  { 'name': 'Yordan Alvarez', 'avg': 0.315, 'obp': 0.432, 'slg': 0.600 },
  { 'name': 'Mike Trout', 'avg': 0.246, 'obp': 0.385, 'slg': 0.428 },
  { 'name': 'Juan Soto', 'avg': 0.274, 'obp': 0.393, 'slg': 0.522 },
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