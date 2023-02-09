import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gamesRouter from "./routers/games.routers.js"

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use(gamesRouter)

server.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta " + process.env.PORT)
})