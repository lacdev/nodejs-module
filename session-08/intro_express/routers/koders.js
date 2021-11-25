const express = require('express')
const routerKoders = require('./routers/koders')
const port = 8080
const app = express() //also named server

//Middleware para convertir a JSON
app.use(express.json())

app.use('/router', routerKoders)

// HELPERS
function isValidKoder(koder) {
  return koder.nombre && koder.genero
}

//ROUTES

app.get('/paginas', (req, res) => {
  const arreglo = ['datos1', 'datos2', 'datos3']

  const pagina = req.query.p
  const index = parseInt(pagina)
  console.log('pagina ', pagina)

  res.end(JSON.stringify(arreglo[index - 1]))
})

//Aqui se inicia su server o app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
