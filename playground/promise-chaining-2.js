require("../src/db/mongoose.js")
const Task = require("../src/models/tasks.js");





// // ObjectId("5e9b187adaf0a528a48ee961")
// Task.findByIdAndRemove("5e9b187adaf0a528a48ee961").then((result) => {
//     console.log(result);
//     return Task.countDocuments({completed : false})
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })






const deleteTaskAndCount = async (id) => {
    const document_deleted = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false})
    return count
}



deleteTaskAndCount("5e9afbc60d72b251202efdf9").then((result) => {
    console.log("The number of documents in the db: ",result)
}).catch((e) => {
    console.log(e)
})







/*
Goal: Use async/ await

    1. Create deleteTaskAndCount as an async function
        -Accept id of task to remove
    2. Use await to delete Task to remove
    3. Return the count
    4. Call the function and attach then/catch to log results
    5. Test your work


*/