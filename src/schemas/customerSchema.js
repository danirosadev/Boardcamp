import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    cpf: Joi.number().required(),
    birthday: Joi.date().required()
})