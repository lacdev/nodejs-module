const fs = require('fs')

const createDocument = (name, content) => {
  fs.writeFile(name, content, 'utf8', (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Se creo el archivo correctamente')
    }
  })
}

const updateDocument = (name, content) => {
  fs.appendFile(name, content, 'utf-8', (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Se actualizo el archivo correctamente')
    }
  })
}

const deleteDocument = (name) => {
  fs.unlink(name, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Se borro el archivo exitosamente')
    }
  })
}

const readDocument = (name) => {
  fs.readFile(name, 'utf8', (error, data) => {
    if (error) throw error
    console.log(data)
  })
}

createDocument('./test.txt', 'Documento inicial ')

readDocument('./test.txt')

updateDocument('./test.txt', 'Documento actualizado')

deleteDocument('./test.txt')
