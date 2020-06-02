const express = require('express');
const router = express.Router();
const produit = require('../models').Produit;
var passport = require('passport');

router.get('/', function(req, res){
    produit.findAll()
        .then(produit => {
            console.log(produit)
            res.status(200).json(produit)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:id', async function (req, res) {
    const oneProduit = await produit.findOne({ where: { id: req.param('id') } })
        .then(oneProduit => {
            res.status(200).json(oneProduit)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', async function (req, res) {
    const sameProduit = await produit.findOne({ where: { name: req.body.name } });
    if (req.body.name, req.body.description, req.body.price, req.body.image) {

        if (sameProduit === null) {
            produit.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            })
            res.json('Votre article a bien été ajouté.');
        }
        else {
            res.json('Votre article existe deja.');
        }
    }
})

router.put('/:id', async function (req, res) {
    const sameProduit = await produit.findOne({ where: { name: req.body.name, id: { $not: req.param('id') } } });
    if (req.body.name, req.body.description, req.body.price, req.body.image) {
        if (sameProduit === null) {
            produit.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }, {
                where: {
                    id: req.param('id')
                }
            })
            res.json('Votre article a bien été modifié.');
        }
        else {
            res.json('Votre article existe deja.');
        }
    }
    

})

router.delete('/:id', async function (req, res) {
    await produit.destroy({
        where: {
            id: req.param('id')
          }
    })
    res.json('Votre article a bien été supprimé.');
})

module.exports = router;