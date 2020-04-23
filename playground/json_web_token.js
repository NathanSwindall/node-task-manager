const jwt = require("jsonwebtoken");


const json_web_token = (_id) => {
    const token = jwt.sign({_id}, "This is my secret")
    console.log(token);
    const isToken = jwt.verify(token, "This is my secret");
    console.log(isToken);
}

json_web_token("hello1232")
