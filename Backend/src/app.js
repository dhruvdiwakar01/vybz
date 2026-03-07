
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://vybz-1.onrender.com",
  credentials: true
}))
app.use(express.static("./public"))

/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/songs", songRoutes)
app.use("/api/auth", authRoutes)

module.exports = app