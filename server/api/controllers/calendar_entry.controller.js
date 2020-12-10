const mongoose = require('mongoose')

const CalendarEntry = require('../models/calendar_entry.model')

const validator = require('../helpers/validations/calendar_entry.validation')

const AddEntry = async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    const entry = await CalendarEntry.create({
      ...req.body,
    })
    res.json({ msg: 'Entry was created successfully', data: entry })
  } catch (err) {
    return res.send(err)
  }
}
const EditEntry = async (req, res) => {
  try {
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    const { id } = req.body
    const entry = await CalendarEntry.findById(id)
    res.json({ data: entry })
    if (!entry) return res.status(404).send({ error: 'Entry does not exist' })
    const updated_entry = await CalendarEntry.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.json({ msg: 'Entry was updated successfully', data: updated_entry })
  } catch (err) {
    return res.send(err)
  }
}
const GetEntryById = async (req, res) => {
  try {
    const isValidated = validator.idValidation(req.body)
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    const { id } = req.body
    const entry = await CalendarEntry.findById({ id })
    if (!entry) return res.status(404).send({ error: 'Entry does not exist' })
    res.json({ data: entry })
  } catch (err) {
    return res.send(err)
  }
}
const GetAllEntries = async (req, res) => {
  try {
    const entries = await CalendarEntry.find()
    res.json({ data: entries })
  } catch (err) {
    return res.send(err)
  }
}
const GetEntriesInDateRange = async (req, res) => {
  try {
    const isValidated = validator.dateValidation(req.body)
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    const { start_date, end_date } = req.body
    const entries = await CalendarEntry.find({
      date: {
        $gte: new Date(new Date(start_date).setHours(00, 00, 00)),
        $lt: new Date(new Date(end_date).setHours(23, 59, 59)),
      },
    }).sort({ date: 'asc' })
    res.json({ data: entries })
  } catch (err) {
    return res.send(err)
  }
}
const DeleteById = async (req, res) => {
  try {
    const isValidated = validator.idValidation(req.body)
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    const { id } = req.body
    const deleted = await CalendarEntry.findByIdAndDelete(id)
    res.json({ msg: 'Entry successfully deleted', data: deleted })
  } catch (err) {
    return res.send(err)
  }
}
const DeleteAllEntries = async (req, res) => {
  try {
    const deleted = await CalendarEntry.remove({})
    res.json({ msg: 'Entries successfully deleted', data: deleted })
  } catch (err) {
    return res.send(err)
  }
}
module.exports = {
  AddEntry,
  EditEntry,
  GetEntryById,
  GetAllEntries,
  GetEntriesInDateRange,
  DeleteAllEntries,
  DeleteById,
}
