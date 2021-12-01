require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koder_model')

// Paso opcional pero recomendado

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

console.log('Username', DB_USER)
console.log('Username', DB_PASSWORD)

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const app = express()
app.use(express.json())

//It's a promise
mongoose
  .connect(URL)
  .then((connection) => {
    console.log('DB Connected!')

    //It's asynchronous with a callback
    app.listen(PORT, () => {
      console.log('Server is running')
    })
  })
  .catch((error) => console.error(error))

//Health endpoint
app.get('/', (req, res) => {
  res.end('server is running')
})

app.get('/koders', async (req, res) => {
  try {
    const { gender, age, min_age, max_age } = req.query
    const filters = {}

    // function hasFilters(minAgeFilter, maxAgeFilter) {
    //     if (minAgeFilter && maxAgeFilter) {
    //         return
    //     }

    //     if (minAgeFilter) {
    //         return
    //     }

    //     if (maxAgeFilter) {

    //     }
    // }

    if (gender) filters.gender = gender
    if (age) filters.age = age
    if (min_age) filters.age = { $gte: min_age }
    if (max_age) filters.age = { $lte: max_age }

    console.log('Fitros', filters)

    const koders = await Koder.find(filters)
    res.json(koders)
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    res.end()
  }
})

app.post('/koders', async (req, res) => {
  const { name, lastName, gender, age } = req.body

  try {
    const newKoder = await Koder.create({
      name,
      lastName,
      age,
      gender,
    })

    res.statusCode = 201
    res.json({
      success: true,
      data: {
        koder: newKoder,
      },
    })
  } catch (error) {
    res.statusCode = 400
    res.json({
      success: false,
      error,
    })
  }
})
