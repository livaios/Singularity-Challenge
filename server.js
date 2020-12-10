const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const loggerMiddleware = require('./api/middleware/logger')
const calendar_entry = require('./api/routers/calendar_entry.router')

// DB Config
const uri = require('./config/keys').mongoURI
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }

// Connect to mongo
const db1 = mongoose
  .connect(uri, dbConfig)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(loggerMiddleware)

app.use('/api/v1/calendar_entry', calendar_entry)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server up and running on ${port}.`))
