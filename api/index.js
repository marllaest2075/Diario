const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(cors());
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})

// apis
const  report  = require('./Routes/Reports')

//app.get('*',gets)
app.use('/api/reports',report)

module.exports = app