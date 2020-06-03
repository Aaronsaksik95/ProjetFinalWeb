const express = require('express');
const router = express.Router();
const panier = require('../models').Panier;
var passport = require('passport');
const userModel = require('../models').User;
const session = require('express-session')


router.get('/:UserId', async function(req, res){
    await panier.findAll({ where: { UserId: req.params.UserId } })
        .then(panier => {
            res.status(200).json(panier)
        })
        .catch(err => {
            res.send('error: ' + err)
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

router.delete('/:id', async function (req, res) {
    console.log('coucoucoucoucoucou')
    await panier.destroy({
        where: {
            ProduitId: req.params.id
          }
    })
    console.log('coucoucoucoucoucou')
    res.json('Votre article a bien été supprimé du panier.');
})
})


module.exports = router;