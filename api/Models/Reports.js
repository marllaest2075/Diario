const mongoose = require('mongoose')
const schema = mongoose.Schema

const Reports = mongoose.model('Report', new schema({
    fecha : String,
    inicio: String,
    fin: String,
    descripcion:String,
    user_id: String
}))

module.exports = Reports