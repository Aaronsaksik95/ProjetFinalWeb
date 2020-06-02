const express = require('express');
const router = express.Router();
const panier = require('../models').Panier;
var passport = require('passport');
const userModel = require('../models').User;
const session = require('express-session')


router.get('/', async function(req, res){
    await panier.findAll({ where: { UserId: req.user.id } })
        .then(panier => {
            res.status(200).json(panier)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/', async function(req, res){
    console.log(req.params.id)
    await panier.create({
        ProduitId: req.body.ProduitId,
        UserId: req.body.UserId
    }).then(Response => {
        res.status(200).json(Response)
    }).catch(error => {
        res.status(500).json(error)
    })
})
router.post('/:id', async function(req, res){
    console.log(req.params.id)
    await panier.create({
        ProduitId: req.params.id,
        UserId: req.body.UserId
    }).then(Response => {
        res.status(200).json(Response)
    }).catch(error => {
        res.status(500).json(error)
    })
})


module.exports = router;