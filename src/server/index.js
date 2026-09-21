import express from "express"
import { join } from "path"
import { connect } from "mongoose"
import cookie from "cookie-session"
import { config } from "dotenv"

import { authRoutes } from "./auth.js"
import { listRoutes } from "./lists.js"

config();

const app = express()

app.use(cookie({
    name: "session",
    keys: [process.env.COOKIE_KEY]
}))
app.use(express.static(join(import.meta.dirname, "../../static")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

authRoutes(app);
listRoutes(app);

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`
connect(uri);

app.get("/", (req, res) => {
    res.sendFile(join(import.meta.dirname, "../client/index.html"))
})

app.get("/:list", (req, res) => {
    res.sendFile(join(import.meta.dirname, "../client/index.html"))
})

app.listen(process.env.PORT || 3000)