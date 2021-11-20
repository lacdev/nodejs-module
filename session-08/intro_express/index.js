const express = require('express')

const app = express() //also named server

const port = 8080

//Response format

// res.format({
//   'text/plain': function () {
//     res.send('hey')
//   },

//   'text/html': function () {
//     res.send('<p>hey</p>')
//   },

//   'application/json': function () {
//     res.send({ message: 'hey' })
//   },

//   default: function () {
//     // log the request and respond with 406
//     res.status(406).send('Not Acceptable')
//   },
// })

//define a handler
//para la ruta localhost:8080/ para el metodo GET
app.get('/', (req, res) => {
  res.send('Hola Koders')
})

app.get('/koder', (req, res) => {
  res.send('Aqui estan todos los koders')
})

app.get('/json', (req, res) => {
  res.json({ response: 'This is a Json response on json route' })
})

app.post('/', (req, res) => {
  res.send('Aqui puedes crear cosas')
})

app.post('/koder', (req, res) => {
  res.send('Aqui puedes crear Koders')
})

app.put('/koder', (req, res) => {
  res.send('Aqui puedes sustituir koders')
})

//Aqui se inicia su server o app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
