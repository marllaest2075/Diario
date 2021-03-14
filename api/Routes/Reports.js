const express = require('express')
const Reports = require('../Models/Reports')
const router = express.Router()
const autorization = require('../auth')

function Fecha() {
    const hoy = new Date()
    const month = hoy.getMonth() + 1 < 10 ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)
    const day = hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()
    const fecha = hoy.getFullYear() + '/' + month + '/' + day
    return fecha
}

function Horas() {
    const hoy = new Date()
    const hora = hoy.getHours() < 10 ? '0' + hoy.getHours() : hoy.getHours()
    const minuto = hoy.getMinutes() < 10 ? '0' + hoy.getMinutes() : hoy.getMinutes()
    return hora + ':' + minuto
}

function getAll(req, res) {
    Reports.find().exec().then(x=>
    res.status(200).send(x))
}

function getSingle(req,res) {
    console.log(req.params.id)
    Reports.findById(req.params.id).exec().then(x=>
        res.status(200).send(x))
}


function Add(req, res) {
    const { inicio, fin, descripcion, user_id } = req.body
    Reports.create(req.body).then(x => res.status(200).send(x))
}

function update(req,res) {
    Reports.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>{res.sendStatus(204)})
}

function remove(req,res) {
    Reports.findByIdAndDelete(req.params.id)
    .then(()=>{res.sendStatus(204)})
}


router.get("/", autorization.isAuthenticated, autorization.hasRoles(['admin', 'user']), getAll)
router.get("/:id", autorization.isAuthenticated, autorization.hasRoles(['admin', 'user']), getSingle)
router.post('/', autorization.isAuthenticated, autorization.hasRoles(['admin', 'user']),Add)
router.put('/:id', autorization.isAuthenticated, autorization.hasRoles(['admin', 'user']),update)
router.delete('/:id', autorization.isAuthenticated, autorization.hasRoles(['admin']),remove)
module.exports = router