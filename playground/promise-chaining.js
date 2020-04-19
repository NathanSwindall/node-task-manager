require("../src/db/mongoose");
const User = require("../src/models/users");

User.findOneAndUpdate({age :28}, {age: 1}).then((result) => {
    console.log(result);
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e);
})