import { NextFunction, Request, Response } from "express"
import Joi from "joi"

export default function schemaValidator (schema: Joi.ObjectSchema, requestProperty: string) {
  console.log("Middleware here")
  return (req: Request, res: Response, next: NextFunction) => {
    let dataToValidate;
    if(requestProperty === "body") dataToValidate = req["body"]
    if (requestProperty === "params") dataToValidate = req["params"]

    const { error } = schema.validate(dataToValidate, { abortEarly: false })

    if(error) {
      throw new Error("The data doesn't match this endpoint data schema")
    }
    next()
  }
}