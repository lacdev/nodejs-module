const { kStringMaxLength } = require('buffer')
const http = require('http')
const port = 8080 || 3000

const server = http.createServer((request, response) => {
  const metodo = request.method
  const url = request.url
  response.statusCode = 200
  response.setHeader('Content-type', 'text/json')

  const mensaje = {
    message: '',
  }

  if (metodo === 'GET' && url === '/koder') {
    mensaje.message = 'Aqui estan todos los koders.'
  } else if (metodo === 'POST' && url === '/koder') {
    mensaje.message = 'Aqui puedes crear koders.'
  } else {
    response.statusCode = 400
    mensaje.message = 'No se que hacer aiuda'
  }

  const respuesta = JSON.stringify(mensaje)
  console.log(respuesta)
  response.write(respuesta)
  response.end()
})

server.listen(port, () => console.log(`Server up and running on ${port}`))

// const port = process.env.PORT || 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/html')
//   res.end('<h1>Hello, World!</h1>')
// })

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`)
// })
