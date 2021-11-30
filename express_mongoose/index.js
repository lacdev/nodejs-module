const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koder_model')

const PORT = 8080
const DB_USER = 'german'
const DB_PASSWORD = 'test123'
const DB_HOST = 'cluster0.xftq5.mongodb.net'
const DB_NAME = 'kodemia'

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const app = express()

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
  //cargar los koders
  const koders = await Koder.find({})
  //mandar una respuesta
  res.json(koders)
})

app.get('/koders')

app.post('/koders', async (req, res) => {
  try {
    await Koder.create({
      name: 'Jesus',
      lastName: 'Solis',
      age: 150,
      gender: 'm',
    })
  } catch (error) {
    res.statusCode = 500
    res.end()
  }
  //crear koder con Schema definido
  //   .catch((error) => console.log(error))

  //   const koders = await Koder.find({})
  //   console.log(koders)
  //   res.json(koders)

  res.statusCode = 201
  res.json({ success: true })
})
