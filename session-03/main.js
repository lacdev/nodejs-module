console.log('Factory Functions')

//Factory Functions

function factory(result) {
  console.log('Trabajando')

  return function () {
    console.log('resultado: ', result)
  }
}

const r = factory('saludos')

r()

//Caso muy visto en programacion funcional

function factorySumaParcial(a) {
  return function (b) {
    return a + b
  }
}

const suma2 = factorySumaParcial(2)

console.log(suma2(5))

//Ejemplo 2 Factory functions

const suma5 = factorySumaParcial(5)

console.log(suma5(5))

function generateRoleValidator(roles) {
  return (rol) => {
    if (roles.includes(rol)) {
      console.log('autorizado')
    } else {
      console.log('denegado')
    }
  }
}

const onlyAdmin = generateRoleValidator(['admin'])

onlyAdmin('desarrollador')
onlyAdmin('admin')

const onlyUserAndAdmin = generateRoleValidator(['admin', 'user'])

onlyUserAndAdmin('user')
onlyUserAndAdmin('admin')
onlyUserAndAdmin('desarrollador')
