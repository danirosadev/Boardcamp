import { db } from "../config/database.connection.js";

export async function getCustomersList (req, res){
    try {
        const customersList = await db.query("SELECT * FROM customers")
        res.send(customersList.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getCustomerById (req, res){
    const { id } = req.params

    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = ${id}`)
        if (customer.rowCount <= 0) return res.status(404).send("Cliente não existe.")
        res.send(customer.rows[0])
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postNewCustomer (req, res){
    const newCustomer = {
        name: req.body.name,
        phone: req.body.phone,
        cpf: req.body.cpf,
        birthday: req.body.birthday
    }

    try {
        if (newCustomer.phone.length < 10 || newCustomer.phone.length > 11 || newCustomer.cpf.length != 11) return res.status(400).send("Dados inválidos.")

        const isCpf = await db.query(`SELECT * FROM customers WHERE cpf = '${newCustomer.cpf}'`)
        if (isCpf.rowCount > 0) return res.sendStatus(409)

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${newCustomer.name}', '${newCustomer.phone}', '${newCustomer.cpf}', '${newCustomer.birthday}')`)
        res.status(201).send("Cliente cadastrado.")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function updateCustomer (req, res){
    const { id } = req.params
    const body = req.body

    try {
        if (body.phone.length < 10 || body.phone.length > 11 || body.cpf.length != 11) return res.status(400).send("Dados inválidos.")

        const isCpf = await db.query(`SELECT * FROM customers WHERE cpf = '${newCustomer.cpf}'`)
        if (isCpf.rowCount > 0) return res.sendStatus(409)
        
        await db.query(`UPDATE customers SET name = '${body.name}', phone = '${body.phone}', cpf = '${body.cpf}', birthday = '${body.birthday}' WHERE id = ${id}`)
        res.status(200).send("Cliente atualizado.")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}