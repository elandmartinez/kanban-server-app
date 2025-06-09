import Joi from "joi"

export interface createBoardSchema {
  name: string
}

const idSchema = Joi.string().max(128,).required().messages({
  "string.max": "The board id exceeds the limit ",
  "string.base": "The ID must be a string",
  "string.required": "the ID is required"
})
const nameSchema = Joi.string().max(128).required().messages({
  "string.max": "Maximum characters for board name is 128",
  "string.base": "The name must be a string",
  "string.required": "the name is required"
})

export const createBoardSchema = Joi.object({ id: idSchema, name: nameSchema })
export const getBoardSchema = Joi.object({ id: idSchema })
export const updateBoardSchema = Joi.object({ id: idSchema, name: nameSchema})
export const deleteBoardSchema = Joi.object({ id: idSchema })