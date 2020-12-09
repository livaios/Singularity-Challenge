const express = require('express')

const router = express.Router()

const calendarEntryController = require('../controllers/calendar_entry.controller')
const {
  AddEntry,
  EditEntry,
  GetEntryById,
  GetAllEntries,
} = calendarEntryController

router.post('/create', AddEntry)
router.put('/update', EditEntry)
router.get('/getById', GetEntryById)
router.get('/getAll', GetAllEntries)
module.exports = router
