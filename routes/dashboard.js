const express = require('express');
const app = express();
const router = express.Router();
app.use(express.static('public'));
const auth = require('./auth');

const staff = require('./staff');
const isStaff = staff[2];

router.get('/', function (req, res, next) {
    if (isStaff(req, res)) {
        res.render('dashboard_staff');
    } else {
        res.render('dashboard_customer');
    }
});

module.exports = router;