const express = require('express')

const router = express.Router()

const calendarEntryController = require('../controllers/calendar_entry.controller')
const {
  AddEntry,
  EditEntry,
  GetEntryById,
  GetAllEntries,
  GetEntriesInDateRange,
  DeleteById,
  DeleteAllEntries,
} = calendarEntryController

router.post('/create', AddEntry)
router.put('/update', EditEntry)
router.get('/getById', GetEntryById)
router.get('/getAll', GetAllEntries)
router.get('/getInRange', GetEntriesInDateRange)
router.delete('/deleteById', DeleteById)
router.delete('/reset', DeleteAllEntries)
module.exports = router
