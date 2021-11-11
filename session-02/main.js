console.log("Session 02 Callbacks")

const getMax = (...numbers) => {
    let result = -Infinity
    for (let number of numbers) {
        if (number > result) result = number
    }
    return result
}

const reverseString = (string) => {
    let reversed = ""
    for (let index = string.length -1; index >= 0; index --) {
        reversed += string[index]
    }
    return reversed
}

const divide = (num1, num2) => {
    if (num2 === 0) return 'ERROR'
    return num1 / num2
}



// const maxNumber = getMax(499,500,550,551,750,751,1000,2500)

// console.log(maxNumber)

// const reversedString = reverseString("hello world")

// console.log(reversedString)

// const divideError = divide(20,0)

// console.log(divideError)

// const divideGood = divide(20,2)

// console.log(divideGood)
