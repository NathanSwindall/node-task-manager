const mongodb = require("mongodb");

const { MongoClient, ObjectId} = require("mongodb"); // destruction 


//const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'  // you have to put the ip # and not local host or it will slow down
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log("unable to connect to server.");
    }

    const db = client.db(databaseName);

    db.collection('tasks').updateMany({completed: false}, {$set: 
        {
            completed: true
        }
    }
    
   
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})






/*
challenges:

Goal: Use updateMany to complete all tasks

1) Check the documentation for updateMany
2) Setup the call with the query and the updates
3) Use promise methods to setup the success/error handlers
4) Test your work



Goal #2
1) Use findOne to fetch the last task by its id (print doc to console)
2) Use find to fetch all tasks that are not completed (print docs to console)
3) Test your work!

Insert 3 tasks into a new tasks collection

1) Use insertMany to insert three documents
    -description (string), completed (boolean)
2) Setup the callback to handle error or print ops
3) Run the script
4) refresh database and check robo 3t

old code:

db.collection('tasks').insertMany([
        {
            description: "4 hours of Udemy courses",
            completed: false
        },
        {
            description: "3 hours of Molecular engineering",
            completed: false

        },
        {
            description: "1 hour of Korean television",
            completed: false
        },
        {
            description: "watching korean dramas",
            completed: false
        }], (error, result) => {
            if(error){
                return console.log("Unable to insert the documents")
            }

            console.log(result.ops)
        }
    )

        Reading documents
     db.collection('tasks').findOne({ _id : new ObjectId("5e971226d3810b39087ff057")}, (error,result) => {
        if(error)
        {
            console.log("something went wrong")
        }
        console.log(result)
    })
    db.collection("tasks").find({ _id : new ObjectId("5e971226d3810b39087ff057")}).count((error, count) =>{
        console.log(count);
    })


    db.collection("db-users").insertMany([
        {
            name: 'Thomas',
            type: 'Korean'
        },
        {
            name: 'Annie',
            type: "Korean"
        },
        {
            name: 'Jessica',
            type: "hispanic/Korean"
        },
        {
            name: "Danika",
            type: "Korean",
            _id: "Korean"
        }
    ], (error, result) => {
        console.log(result)
    })


    db.collection('db-users').findOne({name: "Danika"}, (error, result) => {
        console.log(result);
    })
    const updateOne_Promise = db.collection('db-users').updateOne({_id: "Korean"}, {$set: {_id2 : new ObjectId()}})
    
    updateOne_Promise.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

*/