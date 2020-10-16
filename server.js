const express = require('express');

const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

// import the account route
var AccountRoutes = require('./controllers/account_controller');

const port = process.env.PORT || 3000;

app.set('view-engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// secrete session
app.use(session({ secret: 'randomstringsessionsecret' }));

// use account routes
app.use('/', AccountRoutes.AccountRoutes);

// listen to port
app.listen(port);