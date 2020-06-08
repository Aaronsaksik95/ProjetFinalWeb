const express = require('express');
const router = express.Router();
const user = require('../models').User;
var passport = require('passport');
const { Op } = require("sequelize");

require('../authentification/passport_config');


router.get('/all', function (req, res) {
    user.findAll()
        .then(user => {
            res.status(200).json(user)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:id', async function (req, res) {
    oneUser = await user.findOne({ where: { id: req.params.id } })
        .then(oneUser => {
            res.status(200).json(oneUser)
        })
        .catch(err => {
            res.send(err)
        })
})

router.put('/:id', async function (req, res) {
    const sameUser = await user.findOne({ where: { email: req.body.email, id:{[Op.not]: req.params.id}} });
    if (req.body.firstName, req.body.lastName, req.body.email, req.body.sold) {
        if (sameUser === null) {
            user.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateBirth: req.body.dateBirth,
                sold: req.body.sold,
                email: req.body.email
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.json('User bien modifié');
        }
        else {
            res.json('User deja existant');
        }
    }
})

router.put('/sold/:id', async function (req, res) {
    if (req.body.sold) {

        user.update({
            sold: req.body.sold
        }, {
            where: {
                id: req.params.id
            }
        })
        res.json('User bien modifié');

    }
})

router.delete('/:id', async function (req, res) {
    user.destroy({
        where: {
            id: req.params.id
        }
    })
})

passport.deserializeUser(function (id, done) {
    user.findByPk(id, function (err, user) {
        console.log(user.id)
        console.log('VOILLLLAAA')
        done(err, user);
    });
});


module.exports = router;
