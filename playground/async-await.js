// original function

const add = (a, b) => {
    setTimeout(() => {
        console.log(a + b)
    }, 2000)
}


// now let's use promises
const addPromise = (a,b) => { 
    return new Promise( (resolve,reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0)
            { 
             return  reject("There is a negative number")
            }

            resolve(a + b)
        }, 2000)
})}


// I am not too familiar with all that stuff but who knows right
addPromise(3,4).then((result) => {
    console.log("This is the result 1: ",result)
    return addPromise(100, result)
}).then((result) => {
    console.log("This is the result 2: ", result)
}).catch((e) => {
    console.log(e);
})


// Now let's use asyn and await
// first an example showing that it returns a promise
const first_Async = async () => {
    return "Nathan"
}

console.log(first_Async())


const addAsync = async (a, b) => {
    return a + b
}

console.log(addAsync(3,4))

const add_numbers_async = async (a,b) => {
    const sum = await addAsync(a,b)
    const sum2 = await addPromise(sum, sum)
    const sum3 = await addPromise(sum2,sum)
    return sum3
}

add_numbers_async(3,12).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

