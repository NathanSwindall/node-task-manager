const bcrypt = require('bcryptjs');


const myFunc = async (password) => {
    console.log(password)
    const hashpassword = await bcrypt.hash(password,8)
    console.log("hash password", hashpassword);
    const isMatch = await bcrypt.compare(password, hashpassword);
    console.log(isMatch)
}

myFunc("theGoodsand34354");