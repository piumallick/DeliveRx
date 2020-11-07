const express = require('express');
const app = express();
const router = express.Router();
const {pool} = require('../dbConfig');
app.use(express.static('public'));
const auth = require('./auth');
const getUser = auth[2];
const checkAuthenticated = auth[1];
const isAuthenticated = auth[3];
const httpStatusCodes = require('http-status-codes');
const reasonPhrases = httpStatusCodes.ReasonPhrases;
const statusCodes = httpStatusCodes.StatusCodes;

router.get('/', verifyStuff, function (req, res, next) {
    res.render('dashboard_staff');
});

function verifyStuff(req, res, next) {
    if (isAuthenticated(req)) {
        if (!isStuff(req, res)) {
            res.redirect('/dashboard');
        }
        return next;
    }
    res.redirect('/users/login');
}

function isStuff(req, res) {
    if (isAuthenticated(req)) {
        const user = getUser(req);
        return user.role !== 3
    }
    res.redirect('/users/login');
}

module.exports = [router, verifyStuff, isStuff];