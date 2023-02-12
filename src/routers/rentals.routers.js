import { Router } from "express";
import { deleteRental, endRental, getRentals, postNewRental } from "../controllers/rentals.controllers.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import validateSchema from "../middlewares/validateSchema.js";

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", postNewRental)
rentalsRouter.post("/rentals/:id/return", endRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter