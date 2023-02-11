export default function validSchema(schema){
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false})
        if (error) {
            const errorMsg = error.details.map(err => err.message)
            return res.status(400).send(errorMsg)
        }
        next()
    }
}