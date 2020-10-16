const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const path = require('path');
const HomeRoutes = express.Router();

const correct_path = path.join(__dirname + '/../views/home/');
HomeRoutes.get('/', function(req, res) {
    let email = req.session.email;
    res.render('home/index', { user_email: email });
});

module.exports = { "HomeRoutes": HomeRoutes };