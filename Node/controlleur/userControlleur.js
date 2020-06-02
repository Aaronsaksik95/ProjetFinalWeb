const express = require('express');
const router = express.Router();
const user = require('../models').User;
var passport = require('passport');

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

router.get('/auth', async function (req, res) {
    oneUser = await user.findOne({ where: { id: req.user.id } })
         .then(oneUser => {
             res.status(200).json(oneUser)
         })
         .catch(err => {
             res.send(err)
         })
 })

router.put('/auth' , async function (req, res) {
    const sameUser = await user.findOne({ where: { email: req.body.email, id: { $not: req.user.id } } });
    console.log(req.user.email)
    if (req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.dateBirth, req.body.sold) {
        if (sameUser === null) {
            user.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                dateBirth: req.body.dateBirth,
                sold: req.body.sold
            }, {
                where: {
                    id: req.user.id
                }
            })
            res.json('User bien modifié');
        }
        else {
            res.json('User deja existant');
        }
    }
})

router.delete('/:id', async function (req, res) {
    user.destroy({
        where: {
            id: req.param('id')
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
