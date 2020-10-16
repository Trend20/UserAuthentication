const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const models = require('../models');


// routes
const accountRoutes = express.Router();

// login and register routes

accountRoutes.get('/login', function(req, res) {
    res.render('account/login');
});

accountRoutes.get('/register', function(req, res) {
    res.render('account/register', { errors: "" });
});

// creation of a user

// register handle

accountRoutes.post('/register', function(req, res) {
    const matched_users_promise = models.User.findAll({
        where: Sequelize.or({ username: req.body.username }, { email: req.body.email })
    });

    matched_users_promise.then(function(users) {
        if (users.length == 0) {
            const passwordHash =
                bcrypt.hashSync(req.body.password, 10);
            models.User.create({
                username: req.body.username,
                email: req.body.email,
                password: passwordHash
            }).then(function() {
                let newSession = req.session;
                newSession.email = req.body.email;
                res.redirect('/');
            });
        } else {
            res.render('account/register', { errors: "Username or Email already in use" });
        }
    })
});

// login handle
accountRoutes.post('/login', function(req, res) {
    var matched_users_promise = models.User.findAll({
        where: Sequelize.and({ email: req.body.email }, )
    });
    matched_users_promise.then(function(users) {
        if (users.length > 0) {
            let user = users[0];
            let passwordHash = user.password;
            if (bcrypt.compareSync(req.body.password, passwordHash)) {
                req.session.email = req.body.email;
                res.redirect('/');
            } else {
                res.redirect('/register');
            }
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = { "AccountRoutes": accountRoutes };