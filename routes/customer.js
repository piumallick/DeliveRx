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

router.get('/', verifyCustomer, function (req, res, next) {
    res.render('dashboard_customer', {
        title: "Dashboard",
        userData: req.user,
        messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
    });
});

function verifyCustomer(req, res, next) {
    if (isAuthenticated(req)) {
        if (isCustomer(req, res)) {
            return next;
        }
        res.redirect('/dashboard');
        return;
    }
    res.redirect('/users/login');
}

function isCustomer(req, res) {
    if (isAuthenticated(req)) {
        const user = getUser(req);
        return user.role === 3
    }
    res.redirect('/users/login');
}

module.exports = [router, verifyCustomer, isCustomer];