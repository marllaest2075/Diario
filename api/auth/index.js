const jwt = require('jsonwebtoken')
const Users = require('../Models/Users')

function isAuthenticated(req,res,next) {
    const token = req.headers.authorization
    if(!token){
        return res.sendStatus(403)
    }
    jwt.verify(token,'mi-secreto',(err,decoded)=>{
        const { _id, iat } = decoded
        Users.findOne({_id}).exec()
        .then(user=>{
            req.user = user
            req.iat=iat
            next()
        })
    })
}

const hasRoles = roles =>(req,res,next)=>{
    if(roles.indexOf(req.user.role) > -1){
        return next()
    }
    res.sendStatus(403)
}
module.exports = { isAuthenticated, hasRoles }