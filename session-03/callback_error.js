// Tenemos tres acciones que debe hacerse una despues de otra
function construir(muro, callback) {
  console.log('construyendo...')

  setTimeout(() => {
    muro.construido = true // te voy a ejecutar, hasta que pasen 0.5s
    callback(muro)
  }, 500)
}

function aplanar(muro, callback) {
  console.log('status del muro: ', muro)
  console.log('aplanando...')

  setTimeout(() => {
    muro.aplanado = true // te voy a ejecutar, hasta que pasen 0.5s
    callback(muro)
  }, 200)
}

function pintar(muro, callback) {
  console.log('status del muro: ', muro)
  console.log('pintando...')

  setTimeout(() => {
    muro.pintado = true // te voy a ejecutar, hasta que pasen 0.5s
    callback(muro)
  }, 100)
}

const muro = {
  construido: false,
  aplanado: false,
  pintado: false,
}

construir(muro, (muroConstruido) => {
  // funcion flecha 1
  aplanar(muroConstruido, (muroAplanado) => {
    //funcion flecha 2
    pintar(muroAplanado, (muroPintado) => {
      // funcion flecha 3
      console.log(muroPintado)
      console.log('Se termino el muro!')
    })
  })
})
