export default function schemaValidator(schema, requestProperty) {
    console.log("Middleware here");
    return (req, res, next) => {
        let dataToValidate;
        if (requestProperty === "body")
            dataToValidate = req["body"];
        if (requestProperty === "params")
            dataToValidate = req["params"];
        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            throw new Error("The data doesn't match this endpoint data schema");
        }
        next();
    };
}
