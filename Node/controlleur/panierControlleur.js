const express = require('express');
const router = express.Router();
const panier = require('../models').Panier;


router.get('/:UserId', async function (req, res) {
    await panier.findAll({ where: { UserId: req.params.UserId } })
        .then(panier => {
            res.status(200).json(panier)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/:id', async function (req, res) {
    const samePanier = await panier.findOne({ where: { ProduitId: req.params.id, UserId: req.body.UserId } });
    if (samePanier === null) {
        await panier.create({
            ProduitId: req.params.id,
            UserId: req.body.UserId
        }).then(Response => {
            res.status(200).json(Response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
    else {
        return res.json('Cette article est déjà dans votre panier.');
    }

})


module.exports = router;