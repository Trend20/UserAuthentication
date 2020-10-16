const express = require('express');

const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path');

// import the account route
var AccountRoutes = require('./controllers/account_controller');

// home routes
var HomeRoutes = require('./controllers/home_controller');

const port = process.env.PORT || 3000;

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// secrete session
app.use(session({ secret: 'randomstringsessionsecret' }));

// use account routes
app.use('/', AccountRoutes.AccountRoutes);

// routing the home page
app.use(function(req, res, next) {
    if (req.session.email == null || req.session.email.length == 0) {
        res.redirect('/login');
    } else {
        next();
    }
});
app.use('/', HomeRoutes.HomeRoutes);

// listen to port
app.listen(port);