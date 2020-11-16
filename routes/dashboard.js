const express = require('express');
const app = express();
const router = express.Router();
app.use(express.static('public'));
const path = require('path');
const auth = require('./auth');

const staff = require('./staff');
const isStaff = staff[2];

router.get('/', function (req, res, next) {
    if (isStaff(req, res)) {
        res.render('dashboard_staff');
    } else {
        res.sendFile(path.join(__dirname, '../public', 'view_customers.html'));
    }
});

router.get('/orderhistory',(req,res)=>{
    res.send("hello")
})

module.exports = router;