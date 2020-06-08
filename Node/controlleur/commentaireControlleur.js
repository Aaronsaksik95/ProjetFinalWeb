const express = require('express');
const router = express.Router();
const commentaire = require('../models').Commentaire;

router.get('/commentaire', function (req, res) {
    commentaire.findAll()
        .then(commentaire => {
            console.log(commentaire)
            res.status(200).json(commentaire)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:idPro/commentaire', async function (req, res) {
    const commentairePro = await commentaire.findAll({ where: { ProduitId: req.params.idPro } })
        .then(commentairePro => {
            res.status(200).json(commentairePro)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:idPro/commentaire', async function (req, res) {
    if (req.body.content) {
        commentaire.create({
            content:req.body.content,
            date: Date(),
            userName: req.body.userName,
            ProduitId:req.params.idPro,
            UserId:req.body.UserId
        })
    }
})

router.put('/commentaire/:id', async function (req, res) {
    if (req.body.content) {
        commentaire.update({
            content:req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })
    }
})

router.delete('/commentaire/:id', async function (req, res) {
    await commentaire.destroy({
        where: {
            id: req.params.id
        }
    })
})

router.delete('/commentaire/user/:UserId', async function (req, res) {
    await commentaire.destroy({
        where: {
            UserId: req.params.UserId
        }
    })
})

router.delete('/commentaire/produit/:ProduitId', async function (req, res) {
    await commentaire.destroy({
        where: {
            ProduitId: req.params.ProduitId
        }
    })
})


module.exports = router;