// simple callback function

const mycallback = (callback) => {
    setTimeout(() => {
        callback(undefined, "Success!"); // callback for success
        callback("There was a major error", undefined); // callback for error
    },2000)
}


mycallback((error, result) => {
    if(result)
    {
        return console.log(result)
    }

    console.log(error);
})


const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Yeah boy");
        //reject("hell no!!!!") 
    }, 2000)
})


myPromise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})