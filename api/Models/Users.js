const mongoose = require('mongoose')
const schema = mongoose.Schema

const User = mongoose.model('User', new schema({
    email: String,
    password: String,
    salt: String,
    role : { type : String, default : 'user' }
}))

module.exports = User