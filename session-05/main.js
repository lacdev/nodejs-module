console.log('Session 05 Async Await')

// const fs = require('fs').promises
const fs = require('fs/promises')
const { arch } = require('os')
const path = require('path/posix')

const encoding = 'utf8'

const createDocument = async (name, content) => {
  try {
    await fs.writeFile(name, content, encoding)
    console.log('Archivo creado con exito')
  } catch (error) {
    console.log(error)
  }
}

const updateDocument = async (name, content) => {
  try {
    await fs.appendFile(name, content, encoding)
    console.log('Archivo actualizado con exito')
  } catch (error) {
    console.log(error)
  }
}

const deleteDocument = async (name) => {
  try {
    await fs.unlink(name)
    console.log('Archivo borrado con exito')
  } catch (error) {
    console.log(error)
  }
}

const readDocument = async (name) => {
  try {
    await fs.readFile(name, encoding)
  } catch (error) {
    console.log(error)
  }
}

const createDirectory = async (path) => {
  try {
    await fs.mkdir(path)
  } catch (error) {
    console.log(error)
  }
}

const removeDirectory = async (path) => {
  try {
    await fs.rmdir(path)
  } catch (error) {
    console.log(error)
  }
}

const readDirectory = async (path) => {
  try {
    await fs.readdir(path)
  } catch (error) {
    console.log(error)
  }
}

const main = async () => {
  //   await createDirectory('./carpeta1')
  //   await createDocument('./carpeta1/hola.txt', 'ejercicio de prueba')
  //   await readDocument('./carpeta1/hola.txt')
  //   await updateDocument('./carpeta1/hola.txt', 'Documento actualizado')
  //   await readDocument('./carpeta1/hola.txt')
  //   //   await deleteDocument('./hola.txt')
  //   await removeDirectory('./carpeta1')
  //   await createDirectory('./carpetaAEliminar')
  //   await removeDirectory('./carpetaAEliminar')
  await readDirectory('./carpeta1')
}

main()
