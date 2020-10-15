const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const models = require('../models');