import express from "express";
import ViteExpress from "vite-express";
import { loadEnvFile } from 'node:process';

try {
  // Loads environment variables from the default .env file
  loadEnvFile();
} catch(e) {console.log("Cannot find .env file!")}

const port = process.env.PORT ?? 3000

const app = express();
app.use(express.json());

let data = [
  { 'entry': 'shower',            'deadline': Number(new Date("2026-10-12T22:00:00")), 'priority':3 },
  { 'entry': 'meal prep',         'deadline': Number(new Date("2026-10-12T21:30:00")), 'priority':3 },
  { 'entry': 'webware homework',  'deadline': Number(new Date("2026-10-12T21:30:00")), 'priority':1 },
]

function orderData() {
  data.sort();
  for(let i = 0; i < data.length; i++) {
    data[i].order = i; 
  }
}

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.post('/data', (req, res) => {
  console.log(req.body)
  let newdata = { 
    entry : req.body["entryname"], 
    deadline : req.body["deadline"], 
    priority : req.body["priority"], 
    order : -1
  }
  data.push(newdata)
  orderData();
  res.end()
})

app.get('/data', (req, res) => {
  res.send(JSON.stringify(data))
})

app.post('/delete', (req, res) => {
  console.log(req.body) 
  data.splice(req.body.index, 1) 
  res.end()
})

orderData();
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
);