import express from 'express'
import ViteExpress from 'vite-express'
const app = express()

const games = [
    {userName: "Luke", oppName: "John", userScore: 65, oppScore: 58, result: "Win", id: 0}
]
let nextId = 1

app.use(express.json())
app.use(express.static('public'))

app.get('/read', (req, res) => res.json(games))

app.post('/add', (req,res) => {
    const game = req.body

    setResult(game)
    game.id = nextId
    nextId++

    games.push(game)
    res.json(games)
})

app.post('/modify', (req,res) => {
    const game = req.body
    setResult(game)

    const index = games.findIndex(x => x.id === game.id)
    games[index] = game

    res.json(games)
})

app.post('/delete', (req, res) => {
    const index = games.findIndex(x => x.id === req.body.id)
    games.splice(index, 1)
    res.json(games)
})

const setResult = (data) => {
    if(data.userScore > data.oppScore) { data.result = "Win" }
    else if(data.userScore < data.oppScore) { data.result = "Loss" }
    else { data.result = "Tie" }
}

const port = 3000
ViteExpress.listen(app, port)
console.log(`Express server listening on port ${port}`)