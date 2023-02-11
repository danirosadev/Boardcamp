import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gamesRouter from "./routers/games.routers.js"
import customersRouter from "./routers/customers.routers.js"

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([gamesRouter, customersRouter])

server.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta " + process.env.PORT)
})