import { Router } from "express";
import { getGamesList, postNewGame } from "../controllers/games.controllers.js";
import { gamesSchema } from "../schemas/gamesSchema.js";
import validateSchema from "../middlewares/validateSchema.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGamesList)
gamesRouter.post("/games", validateSchema(gamesSchema), postNewGame)

export default gamesRouter