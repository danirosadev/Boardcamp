import { Router } from "express";
import { getRentals, postNewRental } from "../controllers/rentals.controllers.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import validateSchema from "../middlewares/validateSchema.js";

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(rentalSchema), postNewRental)
rentalsRouter.post("/rentals/:id/return")
rentalsRouter.delete("/rentals/:id")

export default rentalsRouter