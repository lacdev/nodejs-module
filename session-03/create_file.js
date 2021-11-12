const fs = require('fs')

fs.writeFile('./hola.txt', 'Hola Koders', 'utf8', (error) => {
  if (error) {
    console.log('Error' + error)
  } else {
    console.log('Se creo el archivo correctamente')
  }
})

/* 

Firma mas comun de un callback

function callback(error, data) {
    if (error) {
        //panic!
    }
    //happy path
}

*/
