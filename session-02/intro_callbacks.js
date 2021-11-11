console.log("Intro Callbacks")

//Implementar filter a mano
//Function toma como argumento un arreglo
//Function toma un callback

const filterArray = (array, callback) => {
    const newArray = []

    for (let index = 0; index < array.length; index++) {
        if (callback(array[index])) {
            newArray.push(array[index])
        }
    }

    return newArray
}

//Los callbacks debe recibir un valor, que sera un elemento del arreglo. 

const resultado1 = filterArray([1,2,4,7,8,10,15,65,30], x => x % 2 === 0)

const resultado2 = filterArray(['a','b','c','d', 1], x => x === 'a' )

const resultado3 = filterArray([1,2,3,4,5], x => x === 10)

const resultado4 = filterArray([1,"a",2,"b",3,"c",4,"d",5,"e"],
x => typeof x === "string")

const resultado5 = filterArray([1,"a",2,"b",3,"c",4,"d",5,"e"],
    x => typeof x === "number")