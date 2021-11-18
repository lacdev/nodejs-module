const http = require('http')

const port = 8080 || 3000
//Create server, using createServer Method

const server = http.createServer((request, response) => {
  //Define the header with setHeader or writeHead
  response.writeHead(200, {})
  response.write('Hello World')
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
