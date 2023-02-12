import { db } from "../config/database.connection.js";

export async function getRentals (req, res){
    try {
        const rentalsList = await db.query("SELECT * FROM rentals")
        res.send(rentalsList.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postNewRental (req, res){
    const newRental = {
        customerId: req.body.customerId,
        gameId: req.body.gameId,
        daysRented: req.body.daysRented
    }

    try {
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented") VALUES ('${newRental.customerId}', '${newRental.gameId}', '${newRental.daysRented}')`)
        res.status(201).send("Novo aluguel inserido.")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function endRental (req, res){
    const { id } = req.params
    const body = req.body

    try {
        await db.query(`UPDATE rentals SET "returnDate" = date_trunc('day', now()) WHERE id = ${id}`)
        res.status(200).send("Jogo devolvido")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function deleteRental (req, res){
    const { id } = req.params

    try {
        await db.query(`DELETE FROM rentals WHERE id = ${id}`)
        res.status(200).send("Jogo deletado.")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}