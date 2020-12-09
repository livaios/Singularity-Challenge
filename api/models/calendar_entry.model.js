const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  recurrence: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
})

module.exports = Investor = mongoose.model('calendar_entry', EntrySchema)
