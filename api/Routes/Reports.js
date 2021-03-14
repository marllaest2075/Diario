const express = require('express')
const Reports = require('../Models/Reports')
const router = express.Router()
const Repotrs = require('../Models/Reports')

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

function gets(req, res) {
    res.status(200).send({ messsage: 'Hello!!!!' })
}

function postear(req, res) {
    const { inicio, fin, descripcion, user_id } = req.body
    Reports.create(req.body).then(x => res.status(200).send(x))
}

router.get("/", gets)
router.post('/',postear)
module.exports = router