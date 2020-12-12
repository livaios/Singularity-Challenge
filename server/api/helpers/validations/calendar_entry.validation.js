const Joi = require('joi-oid')

const createValidation = (request) => {
  const calendarSchema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().iso().required(),
    recurrence: Joi.string()
      .valid('none', 'daily', 'weekly', 'monthly', 'yearly')
      .required(),
    description: Joi.string().optional(),
  })
  return calendarSchema.validate(request)
}
const updateValidation = (request) => {
  const calendarSchema = Joi.object({
    id: Joi.objectId().required(),
    title: Joi.string().optional(),
    date: Joi.date().iso().optional(),
    recurrence: Joi.string()
      .valid('none', 'daily', 'weekly', 'monthly', 'yearly')
      .optional(),
    description: Joi.string().optional(),
  })
  return calendarSchema.validate(request)
}
const idValidation = (request) => {
  const calendarSchema = Joi.object({
    id: Joi.objectId().required(),
  })
  return calendarSchema.validate(request)
}
const dateValidation = (request) => {
  const calendarSchema = Joi.object({
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
  })
  return calendarSchema.validate(request)
}

module.exports = {
  createValidation,
  updateValidation,
  idValidation,
  dateValidation,
}
