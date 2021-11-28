const express = require('express')
const fs = require('fs/promises')

const ENCODING = 'utf8'
const KODERS_FILE = 'koders.json'

const router = express.Router()

router.get('/', async (req, res) => {
  const koders = await loadKoders()

  const count = parseInt(req.query.count ?? 0)
  const gender = req.query.gender

  let responseData = null
  if (gender) {
    responseData = koders.filter((koder) => koder.genero === gender)
  }

  if (count) {
    const dataToCount = responseData ?? koders
    responseData = dataToCount.splice(0, count)
  }

  res.json(responseData) // convierte a koders a JSON y manda el header text/json
})

router.post('/', async (req, res) => {
  const koders = await loadKoders()
  const newKoder = req.body // Objeto
  console.log(newKoder)

  if (!isValidKoder(newKoder)) {
    res.statusCode = 400
    res.end('Please provide a valid Koder object')

    return
  }

  res.statusCode = 201
  koders.push(newKoder)
  await saveKoders(koders)

  res.json(newKoder)
})

router.get('/:genero123', (req, res) => {
  const genero = req.params.genero123

  console.log('Parametro: ', genero)
  res.end(genero)
})

router.patch('/:name', async (req, res) => {
  const koders = await loadKoders()

  const newKoder = req.body // Ya es un objeto, gracias al middleware
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

// localhost:8080/koders/Otro
router.patch('/map/:name', async (req, res) => {
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

// HELPERS
function isValidKoder(koder) {
  return koder.nombre && koder.genero
}

/*
    Loads KODERS_FILE and returns the koders property value
*/
async function loadKoders() {
  try {
    const content = await fs.readFile(KODERS_FILE, ENCODING) // texto JSON string
    const parsedFile = JSON.parse(content)

    return parsedFile.koders
  } catch (error) {
    console.error('No se pudieron cargar los koders')
    console.error(error)

    return []
  }
}

/*
    Saves koders value in a new object which is written to KODERS_FILE
*/
async function saveKoders(koders) {
  try {
    // const mentores = await loadMentores()
    const mentores = []
    const newObject = { koders, mentores } // creamos un nuevo objeto
    const newContent = JSON.stringify(newObject, null, 4) // para mantener formato de JSON

    await fs.writeFile(KODERS_FILE, newContent, ENCODING)
  } catch (error) {
    console.error('No se pudieron guardar los koders')
    console.error(error)
  }
}

module.exports = router

const Posts = (() => {
  return {
    get: async (resource) => {
      return await fetch(resource)
        .then((response) => response.json())
        .then((json) => console.log(json))
    },
    create: async (data) => {
      return await fetch(resource, {
        type: 'POST',
        body: JSON.stringify(data),
      }).then((x) => x.json())
    },
  }
})()
