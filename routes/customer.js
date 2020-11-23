const express = require('express');
const app = express();
const router = express.Router();
const {pool} = require('../dbConfig');
const dbService = require('../dbServices');
app.use(express.static('public'));
const auth = require('./auth');
const getUser = auth[2];
const checkAuthenticated = auth[1];
const isAuthenticated = auth[3];
const httpStatusCodes = require('http-status-codes');
const reasonPhrases = httpStatusCodes.ReasonPhrases;
const statusCodes = httpStatusCodes.StatusCodes;
const rootFinder = require('../rootFinder');
app.engine("html", require("ejs").renderFile);

router.get('/', verifyCustomer, function (req, res, next) {
    res.render('dashboard_customer', {
        title: "Dashboard",
        userData: req.user,
        messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
    });
});
// view order history
router.get('/orderhistory', function (req, res) {
    let path = rootFinder() + "/public/order_history.html";
    return res.status(200).sendFile(path, (err => {
        console.log(err);
    }));
});


router.get('/orderhistory/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllDataOrders();
    console.log("hello")
    // response.json({
    //     success:true
    // })
    result//result is a promise object 
        .then(data => response.json({data: data}))
        .catch(err => console.log(err));
})

router.post('/orderhistory/insert', (request, response) => {
    //img name class price
    const row  = request.body;
    // console.log("hello")
    // console.log(row)
    const classification = row.classification
    const name = row.name
    const price = row.price
    const picture = row.picture
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewOrderName(name,classification,price,picture);//insert is async function need to use then
    // console.log("result")
    // console.log(result)
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
 
    
});

router.get('/orderhistory/search/:classification', (request, response) => {
    const { classification } = request.params;
    console.log(classification)
    const db = dbService.getDbServiceInstance();

    const result = db.searchByClassification(classification);
    
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})


router.delete('/orderhistory/delete/:dateadded', (request, response) => {
    console.log(request.params)
    const { dateadded } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteOrderRowByDate(dateadded);
    
    result//true or false
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
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




// view customer medicine search
router.get('/search_medicines', function (req, res) {
    let path = rootFinder() + "/public/search_medicines.html";
    console.log("search_medicines")
    return res.status(200).sendFile(path, (err => {
        console.log(err);
    }));
});

router.get('/search_medicines/results', (request, response) => {
    //console.log(request.params)
    //const { category } = request.params;
    const db = dbService.getDbServiceInstance();
    console.log('this far?')
    const result = db.searchMedByCategory();
    
    result//true or false
        .then(data => response.json({success : data}))
        .catch(err => console.log(err));
});

// view customer medicine search
router.get('/profile', function (req, res) {
    let path = rootFinder() + "/public/profile.html";
    console.log("arrived at profile")
    return res.status(200).sendFile(path, (err => {
        console.log(err);
    }));

});

router.get('/profile/results', (request, response) => {
    const user_email = getUser(request).email;
    const db = dbService.getDbServiceInstance();
    const result = db.getProfile(user_email);

    //response.send('test result')
    result//true or false
        .then(data => response.json({success : data}))
       .catch(err => console.log(err));
});

module.exports = [router, verifyCustomer, isCustomer];