const express = require('express');
const app = express();
const router = express.Router();
app.use(express.static('public'));
const auth = require('./auth');

const stuff = require('./staff');
const isStuff = stuff[2];

router.get('/', function (req, res, next) {
    if (isStuff(req, res)) {
        res.render('dashboard_staff');
    } else {
        res.render('dashboard_customer');
    }
});

module.exports = router;