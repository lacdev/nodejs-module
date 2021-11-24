const exp = require('constants')
const express = require('express')
const fs = require('fs/promises')
const encoding = 'utf8'
const koders = './koders.json'
const app = express() //also named server
const port = 8080

//Middleware para convertir a JSON
app.use(express.json())

// HELPERS
function isValidKoder(koder) {
  return koder.nombre && koder.genero
}

//define a handler
//para la ruta localhost:8080/ para el metodo GET
app.get('/', (req, res) => {
  res.send('Hola Koders')
})

app.get('/koder', (req, res) => {
  res.send('Aqui estan todos los koders')
})

async function loadKoders() {
  // app.get('/koders', async (req, res) => {
  //   const content = await fs.readFile(koders, encoding)
  //   const kodersObject = JSON.parse(content)
  //   const kodersArray = kodersObject.koders
  //   res.send(kodersArray)
  // })
  try {
    const content = await fs.readFile(koders, encoding)
    const parsedFile = JSON.parse(content)
    return parsedFile.koders
  } catch (error) {
    console.error('No se pudieron cargar los koders')
    console.error(error)
  }
}

app.get('/koders', async (req, res) => {
  const koders = await loadKoders()

  res.json(koders) // convierte a koders a JSON y manda el header text/json
})

async function saveKoders() {
  try {
    const newObject = { koders }
    const newContent = JSON.stringify(newObject, null, 4)
  } catch (error) {
    console.error('No se pudieron guardar los koders')
    console.error(error)
  }
}

app.patch('/koders/:name', async (req, res) => {
  const koders = await loadKoders()

  const newKoder = req.body
  const koderName = req.params.name

  if (!isValidKoder(newKoder)) {
    res.statusCode = 400
    res.end('Please provide a valid Koder object')

    return
  }

  const koderIndex = koders.findIndex((koder) => koder.nombre === koderName)

  if (koderIndex === -1) {
    res.statusCode = 404
    res.end('Koder Not Found')

    return
  }

  koders[koderIndex].nombre = newKoder.nombre
  koders[koderIndex].genero = newKoder.genero

  await saveKoders(koders)

  res.json(newKoder)
})

app.get('koders/:name', async (req, res) => {
  const koders = await loadKoders()
  const koderName = req.params.name

  if (!isValidKoder(newKoderData)) {
    res.statusCode = 400
    res.end('Please provide a valid Koder object')
  }

  const koder = koders.filter((koder) => koder.nombre === koderName)

  res.json(koder)
})

app.delete('koders/:name', async (req, res) => {
  const koders = await loadKoders()
  const koderName = req.params.name

  if (!isValidKoder(newKoderData)) {
    res.statusCode = 400
    res.end('Please provide a valid Koder object')
  }

  const koderIndex = koders.findIndex((koder) => koder.nombre === koderName)

  if (koderIndex === -1) {
    res.statusCode = 404
    res.end('Koder Not Found')
    return
  } else {
    koders.splice(index, 1)
  }

  await saveKoders(koders)

  res.json(koders)
})

// localhost:8080/koders/Otro
app.patch('/koders/map/:name', async (req, res) => {
  const koders = await loadKoders()

  const koderName = req.params.name
  const newKoderData = req.body

  if (!isValidKoder(newKoderData)) {
    res.statusCode = 400
    res.end('Please provide a valid Koder object')
  }

  let koderFound = false
  let modifiedKoder = {}
  const modifiedKoders = koders.map((koder) => {
    if (koder.nombre === koderName) {
      koderFound = true

      koder.nombre = newKoderData.nombre
      koder.genero = newKoderData.genero

      modifiedKoder = { ...koder }
    }

    return koder
  })

  if (!koderFound) {
    res.statusCode = 404
    res.end('Koder Not Found')
    return
  }

  await saveKoders(modifiedKoders)
  res.json(modifiedKoder)
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

// ///===========================================

// const express = require('express')
// const fs = require('fs/promises')
// const { findSourceMap } = require('module')

// const PORT = 8080
// const ENCODING = 'utf8'
// const KODERS_FILE = 'koders.json'

// const app = express()
// // Middleware para convertir request a JSON
// app.use(express.json()) // equivalente a JSON.parse

// // ROUTES
// app.get('/koders', async (req, res) => {
//   const koders = await loadKoders()

//   res.json(koders) // convierte a koders a JSON y manda el header text/json
// })

// app.post('/koders', async (req, res) => {
//   const koders = await loadKoders()
//   const newKoder = req.body

//   if (!isValidKoder(newKoder)) {
//     res.statusCode = 400
//     res.end('Please provide a valid Koder object')

//     return
//   }

//   res.statusCode = 201
//   koders.push(newKoder)
//   await saveKoders(koders)

//   res.json(newKoder)
// })

// app.patch('/koders/:name', async (req, res) => {
//   const koders = await loadKoders()

//   const newKoder = req.body
//   const koderName = req.params.name

//   if (!isValidKoder(newKoder)) {
//     res.statusCode = 400
//     res.end('Please provide a valid Koder object')

//     return
//   }

//   const koderIndex = koders.findIndex((koder) => koder.nombre === koderName)

//   if (koderIndex === -1) {
//     res.statusCode = 404
//     res.end('Koder Not Found')

//     return
//   }

//   koders[koderIndex].nombre = newKoder.nombre
//   koders[koderIndex].genero = newKoder.genero

//   await saveKoders(koders)

//   res.json(newKoder)
// })

// // localhost:8080/koders/Otro
// app.patch('/koders/map/:name', async (req, res) => {
//   const koders = await loadKoders()

//   const koderName = req.params.name
//   const newKoderData = req.body

//   if (!isValidKoder(newKoderData)) {
//     res.statusCode = 400
//     res.end('Please provide a valid Koder object')
//   }

//   let koderFound = false
//   let modifiedKoder = {}
//   const modifiedKoders = koders.map((koder) => {
//     if (koder.nombre === koderName) {
//       koderFound = true

//       koder.nombre = newKoderData.nombre
//       koder.genero = newKoderData.genero

//       modifiedKoder = { ...koder }
//     }

//     return koder
//   })

//   if (!koderFound) {
//     res.statusCode = 404
//     res.end('Koder Not Found')
//     return
//   }

//   await saveKoders(modifiedKoders)
//   res.json(modifiedKoder)
// })

// app.listen(PORT, () => {
//   console.log(`Koders API listening at http://localhost:${PORT}`)
// })

// // HELPERS
// function isValidKoder(koder) {
//   return koder.nombre && koder.genero
// }

// /*
//     Loads KODERS_FILE and returns the koders property value
// */
// async function loadKoders() {
//   try {
//     const content = await fs.readFile(KODERS_FILE, ENCODING)
//     const parsedFile = JSON.parse(content)

//     return parsedFile.koders
//   } catch (error) {
//     console.error('No se pudieron cargar los koders')
//     console.error(error)

//     return []
//   }
// }

// /*
//     Saves koders value in a new object which is written to KODERS_FILE
// */
// async function saveKoders(koders) {
//   try {
//     const newObject = { koders, mentores: [] } // creamos un nuevo objeto
//     const newContent = JSON.stringify(newObject, null, 4) // para mantener formato de JSON

//     await fs.writeFile(KODERS_FILE, newContent, ENCODING)
//   } catch (error) {
//     console.error('No se pudieron guardar los koders')
//     console.error(error)
//   }
// }
