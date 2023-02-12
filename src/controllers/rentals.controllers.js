import { db } from "../config/database.connection.js";
import dayjs from "dayjs";

export async function getRentals (req, res){
    try {
        const rentalsList = await db.query(`SELECT rentals.*,
             json_build_object(
                'id', customers.id,
                'name', customers.name
            ) AS customer,
             json_build_object(
                'id', games.id,
                'name', games.name
            ) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id`)
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
        const isCustomer = await db.query(`SELECT * FROM customers WHERE id = ${newRental.customerId}`)
        if(isCustomer.rows.length === 0){
            return res.sendStatus(400);
        }

        const isGame = await db.query(`SELECT * FROM games WHERE id = ${newRental.gameId}`)
        if(isGame.rows.length === 0 || isGame.rows === null){
            return res.sendStatus(400);
        }

        if(newRental.daysRented <= 0){
            return res.sendStatus(400);
        }

        const rentDate = dayjs().format('DD/MM/YYYY');
        const originalPrice = Number(newRental.daysRented) * Number(isGame.rows[0].pricePerDay);

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ('${newRental.customerId}', '${newRental.gameId}', '${rentDate}', '${newRental.daysRented}', null, '${originalPrice}', null)`)
        res.status(201).send("Novo aluguel inserido.")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function endRental (req, res){
    const { id } = req.params
    const body = req.body

    try {
        const isRental = await db.query(`SELECT * FROM rentals WHERE id = ${id}`)
        if(isRental.rows.length === 0) return res.sendStatus(404)

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