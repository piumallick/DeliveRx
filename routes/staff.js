const express = require('express');
const app = express();
const router = express.Router();
const dbService = require('../dbServices');
// app.use('/public',express.static('public'));
const auth = require('./auth');
const getUser = auth[2];
const checkAuthenticated = auth[1];
const isAuthenticated = auth[3];
const httpStatusCodes = require('http-status-codes');
const reasonPhrases = httpStatusCodes.ReasonPhrases;
const statusCodes = httpStatusCodes.StatusCodes;
const rootFinder = require('../rootFinder');
app.engine("html", require("ejs").renderFile);

// /staff
router.get('/', verifyStaff, function (req, res) {
    res.render('dashboard_staff');
});

router.get('/view_medicines', function (req, res) {
    let path = rootFinder() + "/public/view_medicines.html";
    return res.status(200).sendFile(path, (err => {
        console.log(err);
    }));
});

router.get('/view_medicines/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    // response.json({
    //     success:true
    // })

    result//result is a promise object
        .then(data => response.json({data: data}))
        .catch(err => console.log(err));
})


function verifyStaff(req, res, next) {
    if (isAuthenticated(req)) {
        if (!isStaff(req, res)) {
            res.redirect('/dashboard');
        }
        return next();
    }
    res.redirect('/users/login');
}

function isStaff(req, res) {
    if (isAuthenticated(req)) {
        const user = getUser(req);
        return user.role !== 3
    }
    res.redirect('/users/login');
}


module.exports = [router, verifyStaff, isStaff];