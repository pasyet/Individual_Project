var jwt = require('jsonwebtoken');

function signin(user){
    console.log(process.env.JWT_SECRET, 'ini jwt');
    return jwt.sign(user,process.env.JWT_SECRET)
}

function verify(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {signin, verify};