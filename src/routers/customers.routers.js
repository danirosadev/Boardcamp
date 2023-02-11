import { Router } from "express";
import { getCustomerById, getCustomersList, postNewCustomer, updateCustomer } from "../controllers/customers.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";

const customersRouter = Router()

customersRouter.get("/customers", getCustomersList)
customersRouter.get("/customers/:id", getCustomerById)
customersRouter.post("/customers", validateSchema(customerSchema), postNewCustomer)
customersRouter.put("/customers/:id", validateSchema(customerSchema), updateCustomer)

export default customersRouter