console.log('Session 04 NodeJs Promises')

// Construiremos el equivalente a callbacks usando promises
// Si el muro no cumple con la fase anterior haremos reject de la promise

function construir(muro) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      muro.construido = true

      const error = muro.construido ? null : new Error('No se pudo construir')

      if (error) reject(error) // Se termina la ejecucion con reject

      resolve(muro)
    }, 1000)
  })
}

function aplanar(muro) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      muro.aplanado = true

      const error =
        muro.construido && muro.aplanado
          ? null
          : new Error('No se pudo aplanar')

      if (error) reject(error) // Se termina la ejecucion con reject

      resolve(muro)
    }, 1000)
  })
}

function pintar(muro) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      muro.pintado = true

      const error =
        muro.aplanado && muro.pintado ? null : new Error('No se pudo pintar')

      if (error) reject(error) // Se termina la ejecucion con reject

      resolve(muro)
    }, 1000)
  })
}

const muro = {} // es un objeto

construir(muro) //promesa 1
  .then((muroConstruido) => {
    // then de promesa 1
    console.log(muroConstruido)
    return aplanar(muroConstruido) // promesa 2
  })
  .then((muroAplanado) => {
    // then de proemsa 2
    console.log(muroAplanado)
    return pintar(muroAplanado) // promesa 3
  })
  .then((muroPintado) => {
    // then de promesa 3
    console.log(muroPintado) // el muro final
  })
  .catch((error) => {
    // catch para todas las promesas
    console.error(error)
  })
  .finally(() => {
    console.log('siempre se ejecuta')
  })
