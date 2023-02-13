import { db } from "../config/database.connection.js";

export async function getGamesList(req, res){
    try {
        const gamesList = await db.query("SELECT * FROM games")
        res.send(gamesList.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postNewGame(req, res){
    const newGame = {
        name: req.body.name,
        image: req.body.image,
        stockTotal: req.body.stockTotal,
        pricePerDay: req.body.pricePerDay
    }

    console.log(newGame)

    try {
        if (newGame.name === "" || newGame.stockTotal <= 0 || newGame.pricePerDay <= 0) return res.status(400).send("Dados inválidos.")

        const isGame = await db.query(`SELECT * FROM games WHERE name = '${newGame.name}'`)
        if (isGame.rowCount) return res.status(409).send("Este jogo já está cadastrado.")

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${newGame.name}', '${newGame.image}', '${newGame.stockTotal}', '${newGame.pricePerDay}')`)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}