const express = require('express')
const fs = require('fs/promises')
const encoding = 'utf8'
const app = express() //also named server
const port = 8080

//define a handler
//para la ruta localhost:8080/ para el metodo GET
app.get('/', (req, res) => {
  res.send('Hola Koders')
})

app.get('/koder', (req, res) => {
  res.send('Aqui estan todos los koders')
})

app.get('/koders', async (req, res) => {
  const koders = './koders.json'
  const content = await fs.readFile(koders, encoding)
  res.send(JSON.parse(content))
})

app.get('/json', (req, res) => {
  res.json({ response: 'This is a Json response on json route' })
})

app.get('/posts', (req, res) => {
  const posts = [{ key: 'post1' }, { key: 'post2' }, { key: 'post3' }]
  res.send(posts)
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
