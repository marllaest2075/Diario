const express = require('express')
const router = express.Router()
const Users = require('../Models/Users')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const autentication = require('../auth')

const signToken = (_id) =>{
    return jwt.sign({_id},'mi-secreto',{expiresIn: 60 * 60 * 24 * 365 , })
}


function getAll(req,res) {
    Users.find().exec().then(x => {res.status(200).send(x)} )
}
function getSingle(req,res) {
    return req.user
}



function Registrar(req, res)  {
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encriptedPassword = key.toString('base64')
            Users.findOne({email}).exec()
                .then(users => {
                    if (users) {
                        return res.send('ya existe')
                    }
                    Users.create({
                        email,
                        password: encriptedPassword,
                        salt: newSalt
                    }).then(() => {
                        res.send('Usuario agregado')
                    })
                })
        })
    })
}

function acceder (req, res)  {
    const { email, password } = req.body
    Users.findOne({email}).exec()
        .then(user => {
            if (!user) {
                return res.send('Usuario y/o contraseña incorrecta')
            }            
           // console.log(user)
           crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                const encriptedPassword = key.toString('base64')
                if (user.password === encriptedPassword) {
                    const token = signToken(user._id)
                    return res.send({ token })
                }
                return res.send('Usuario y/o contraseña incorrecta')
            })
        })
}

function me(req,res) {
    res.send(req.user.email)
}



router.get('/',autentication.isAuthenticated,autentication.hasRoles(['admin']), getAll)
router.post('/register', Registrar)
router.post('/login',acceder)
router.get('/me',autentication.isAuthenticated,me)


module.exports = router