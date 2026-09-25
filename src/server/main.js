import 'dotenv/config'
import morgan from 'morgan'
import express from  'express'
import ViteExpress from 'vite-express'
import {MongoClient, ObjectId} from 'mongodb'
import cookie from 'cookie-session'
import responseTime from 'response-time'
import timeout from 'connect-timeout'
import favicon from 'serve-favicon'
import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.resolve(__dirname, '../../public');


const app = express()

app.use( express.urlencoded({ extended:true }) )
app.use( express.json() )

//store login info in a cookie
app.use(cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

//serve this to allow the SEO lighthouse to get 100. It doesnt actually exist but this makes it pass
app.get('/robots.txt', (req, res) => {
  res.sendFile(__dirname + '/robots.txt')
})

//Middleware:
//log http requests

app.use(morgan('dev'))

//add server response time info

app.use(responseTime())

//create max timeout of 15s for requests

app.use(timeout('15s'))

//create web app favicon



app.use(favicon(publicDirectory + '/favicon.ico'))
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASS}@${process.env.HOST}`

//connect to collections
const client = new MongoClient( uri )
let collection = null
let users = null
async function run() {
  await client.connect();
  collection = await client
      .db('tvTracker')
      .collection('shows')
  users = client
      .db('tvTracker')
      .collection('users')
}

run()
//check connection
app.use( (req,res,next) => {
  if( collection !== null && users !== null) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.use('/css', express.static(publicDirectory +'/css'))
//make login page default

//handles login auth
app.post('/login', async(req, res) => {
  const username = req.body.username
  const password = req.body.password
  const user = await users.findOne({
    username: username
  })

  //make new user if one doesnt exist
  if (user === null) {
    await users.insertOne({
      username: username,
      password: password
    })
    req.session.login = true
    //only gets data for user thats logged in
    req.session.username = username
    res.redirect('/')
  } else if (user.password === password) {
    req.session.login = true
    req.session.username = username
    res.redirect('/')
  } else {
    res.sendFile(publicDirectory + '/login.html')
  }
})


//send unauthenticated users to login page
app.get('/', (req, res, next) => {
  if (req.session.login === true){
    next()
  } else {
    res.sendFile(publicDirectory + '/login.html')
  }
})
app.use((req, res, next) => {
  if (req.session.login === true){
    next()
  } else {
    res.sendFile(publicDirectory + '/login.html')
  }
})


//allows page to display what user is viewing it
app.get('/user', (req, res) => {
  res.json({
    username: req.session.username,
  })
})

//logout functionality
app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

//display results table
app.get('/results', async (req, res) => {
  const appdata = await collection.find({
    //only gets data for user thats logged in
    username: req.session.username
  }).toArray()
  res.json(appdata)
})

//create new show
app.post('/submit', async(req, res) => {
  const newItem = {
    //assigns item to this username
    username: req.session.username,
    show: req.body.show,
    watched: req.body.watched,
    total: req.body.total
  }
  calculatePercent(newItem)
  await collection.insertOne(newItem)
  const appdata = await collection.find({
    //searches for item based on username
    username: req.session.username
  }).toArray()
  res.json(appdata)
})

//delete existing show
app.post('/delete', async (req, res) => {
  await collection.deleteOne({
    _id: new ObjectId(req.body._id),
    //this just makes sure that the user modifying/deleting this actually "owns" it. probably not necessary...
    username: req.session.username
  })
  const appdata = await collection.find({
    username: req.session.username
  }).toArray()
  res.json(appdata)
})

//modify existing show
app.post('/modify', async(req, res) => {
  const modifiedItem = {
    show: req.body.show,
    watched: req.body.watched,
    total: req.body.total
  }
  calculatePercent(modifiedItem)
  await collection.updateOne(
      {
        _id: new ObjectId(req.body._id),
        //this just makes sure that the user modifying/deleting this actually "owns" it. probably not necessary...
        username: req.session.username
      }, {
        $set: modifiedItem
      })
  const appdata = await collection.find({
    username: req.session.username
  }).toArray()
  res.json(appdata)
})

//calculates the percent complete thru a show the user is
const calculatePercent = function (item) {
  //from total episodes and watched so far
  if (item.total === 0) {
    item.percent = 0
  } else {
    item.percent = Math.round ((item.watched / item.total) * 100)
  }
  return item
}
//appdata.forEach( calculatePercent )
ViteExpress.listen( app, 3000 )
