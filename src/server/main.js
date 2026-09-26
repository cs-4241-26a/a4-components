import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.use(express.static("public"));
app.use(express.json());

const data = [
  {
    title: "note 1",
    message: "description of note 1",
    status: "incomplete",
    due: "2027-01-01",
    important: "no",
  },
  {
    title: "note 2",
    message: "description of note 2",
    status: "complete",
    due: "2027-01-01",
    important: "no",
  },
  {
    title: "note 3",
    message: "description of note 3",
    status: "incomplete",
    due: "2027-01-01",
    important: "no",
  },
];

// requests
app.post("/submit", async (req, res) => {
  data.push(req.body);
  res.json(data);
});

app.get("/data", async (req, res) => {
  res.json(data);
});

app.delete("/delete", async (req, res) => {
  const index = data.findIndex((note) => note.title === req.body.title);

  if (index === -1) {
    res.status(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Note not found" }));
    return;
  }

  data.splice(index, 1);
  res.json(data);
});

ViteExpress.listen( app, 3000 )