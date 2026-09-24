import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import favicon from "serve-favicon";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";
import cookie from "cookie-session";
import morgan from "morgan";
import errorhandler from "errorhandler";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use( express.json() );
app.use(express.urlencoded({ extended:true }) );
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')));


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/?appName=Cluster0`
console.log( 'uri:', uri )
const client = new MongoClient( uri )

let collection = null
let signin_collection = null


    await client.connect()

    collection = await client.db("A3Database").collection("A3Collection")
    signin_collection = await client.db("A3Database").collection("A3UserInfo")


    app.get("/docs", async (req, res) => {
        if (collection !== null) {
            const docs = await collection.find({
              username: req.session.user
            }).toArray()
            res.json( docs )
            
        }
    })

    app.get("/alldocs", async (req, res) => {
        if (collection !== null) {
            const docs = await collection.find({}).toArray()
            res.json( docs )
        }
    })

    app.get("/user_docs", async (req, res) => {
        if (signin_collection !== null) {
            const docs = await signin_collection.find({}).toArray()
            res.json( docs )
        }
    })



app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post( '/submit', async (req,res) => {
  const newUser = {
    username: req.session.user,
    name: req.body.name,
    birth_year: Number(req.body.birth_year),
    user_class: req.body.user_class,
    age: 2026 - Number(req.body.birth_year)
  }
  const result = await collection.insertOne(newUser);
  newUser._id = result.insertedId;
  res.json( newUser )

})
app.post( '/remove', async (req,res) => {
  const result = await collection.deleteOne({ 
    _id:new ObjectId( req.body._id ) 
  })
  
  res.json( result )
})
app.post( '/update', async (req,res) => {
  const result = await collection.updateOne(
  { _id: new ObjectId(req.body._id) },
    {
      $set: {
        name: req.body.name,
        birth_year: Number(req.body.birth_year),
        user_class: req.body.user_class,
        age: 2026 - Number(req.body.birth_year)
      }
    }
  )
  res.json( result )
})


app.post( '/createAcct', async (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )
  

  const user = await signin_collection.findOne({
    username: req.body.username,
    password: req.body.password
  })

  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if(user){
    console.log( "User Already Exists" );
    res.sendStatus(401);
  }


  const new_user = await signin_collection.insertOne({
    username: req.body.username,
    password: req.body.password
  })
  console.log( "Account Created" )
  req.session.login = true;
  req.session.user = req.body.username
  res.sendStatus(200);
})



//sign in stuff
app.post( '/login', async (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  console.log( req.body )
  

  const user = await signin_collection.findOne({
    username: req.body.username,
    password: req.body.password
  })

  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if(user){
    console.log( "Sign-In Sucsessful" )
    req.session.login = true;
    req.session.user = user.username;
    res.sendStatus(200);
  
    
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
  }else{
    // password incorrect, redirect back to login page
    console.log( "Sign-In Failed" )
    res.sendStatus(401);
  }
})

/* add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.sendFile( __dirname + '/index.html' )
})
  */

ViteExpress.listen(app, 3000);


