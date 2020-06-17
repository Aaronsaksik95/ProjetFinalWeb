const express = require('express');
const router = express.Router();
const note = require('../models').Note;

router.get('/note', function (req, res) {
    note.findAll()
        .then(note => {
            console.log(note)
            res.status(200).json(note)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:idPro/:UserId/note', async function (req, res) {
    await note.findOne({ where: { ProduitId: req.params.idPro, UserId: req.params.UserId } })
        .then(oneNote => {
            res.status(200).json(oneNote)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:idPro/note', async function (req, res) {
    const myNote = await note.findOne({ where: { ProduitId: req.params.idPro, UserId: req.body.UserId } })
    if (myNote === null) {
        note.create({
            ProduitId: req.params.idPro,
            UserId: req.body.UserId
        })
    }
})

router.get('/note/count/:id', function (req, res) {
    note.count({ where: { ProduitId: req.params.id } })
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.delete('/:idPro/:idUser/note', async function (req, res) {
    note.destroy({
        where: {
            ProduitId: req.params.idPro,
            UserId: req.params.idUser
        }
    })
})
router.delete('/note/user/:UserId', async function (req, res) {
    const user = note.findOne({ where: { UserId: req.params.UserId } })
    if (user) {
        note.destroy({
            where: {
                UserId: req.params.UserId
            }
        })
    }
})
router.delete('/note/produit/:ProduitId', async function (req, res) {
    const produit = note.findOne({ where: { ProduitId: req.params.ProduitId } })
    if (produit) {
        note.destroy({
            where: {
                ProduitId: req.params.ProduitId
            }
        })
    }
})

module.exports = router;