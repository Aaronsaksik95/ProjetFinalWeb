const express = require('express');
const router = express.Router();
const Commande = require('../models').Commande;

router.get('/', async function (req, res) {
    await Commande.findAll()
        .then(panier => {
            res.status(200).json(panier)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:UserId', async function (req, res) {
    await Commande.findAll({ where: { UserId: req.params.UserId } })
        .then(panier => {
            res.status(200).json(panier)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:UserId/:ProduitId', async function (req, res) {
    await Commande.findAll({ where: { UserId: req.params.UserId, ProduitId: req.params.ProduitId } })
        .then(Commande => {
            res.status(200).json(Commande)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/count/:id', function (req, res) {
    Commande.count({ where: { UserId: req.params.id } })
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/:id', async function (req, res) {
    const sameCommande = await Commande.findOne({ where: { ProduitId: req.params.id, UserId: req.body.UserId } });
    if (sameCommande === null) {
        await Commande.create({
            ProduitId: req.params.id,
            UserId: req.body.UserId
        }).then(Response => {
            res.status(200).json(Response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
    else {
        return res.json('Cette article est déjà dans votre Commande.');
    }

})

router.delete('/user/:UserId', async function (req, res) {
    const user = Commande.findOne({ where: { UserId: req.params.UserId } })
    if (user) {
        Commande.destroy({
            where: {
                UserId: req.params.UserId
            }
        })
    }
})
router.delete('/produit/:ProduitId', async function (req, res) {
    const produit = Commande.findOne({ where: { ProduitId: req.params.ProduitId } })
    if (produit) {
        Commande.destroy({
            where: {
                ProduitId: req.params.ProduitId
            }
        })
    }
})


module.exports = router;