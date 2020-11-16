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
// render view_medicines
router.get('/view_medicines', function (req, res) {
    let path = rootFinder() + "/public/view_medicines.html";
    return res.status(200).sendFile(path, (err => {
        console.log(err);
    }));
});

// render view_suppliers
router.get('/view_sppliers', function (req, res) {
    let path = rootFinder() + "/public/view_suppliers.html";
    return res.status(200).sendFile(path, (err => {
        console.log(err);
    }));
});




//create medicine
router.post('/view_medicines/insert', (request, response) => {
    const row  = request.body;
   
    const id = row.id
    const name = row.name
    const price = row.price
    const classification = row.classification
    const picture = row.picture
    // console.log(id)
    // console.log(name)
    // console.log(request.body)
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(id,name,price,classification,picture);
    
   
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});


//create supplier
router.post('/view_suppliers/insert', (request, response) => {
    const row  = request.body;
   
    const id = row.id
    const name = row.name
    const address = row.address
    const phonenumber = row.phonenumber
    const email = row.email
    // console.log(id)
    // console.log(name)
    // console.log(request.body)
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewSuppliersName(id,name,address,phonenumber,email);
    result
    .then(data => response.json({ data: data}))
   
    .catch(err => console.log(err));
});

//getAll
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

//getAll suppliers
router.get('/view_suppliers/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllDataSuppliers();
    // response.json({
    //     success:true
    // })

    result//result is a promise object
        .then(data => response.json({data: data}))
        .catch(err => console.log(err));
})

// delete
router.delete('/view_medicines/delete/:id', (request, response) => {
    console.log(request.params)
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result//true or false
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete suppliers
router.delete('/view_suppliers/delete/:id', (request, response) => {
    console.log(request.params)
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowByIdSuppliers(id);
    
    result//true or false
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});



// update
router.patch('/view_medicines/update', (request, response) => {
    const { id, name,price,classification } = request.body;
    // console.log(request.body)
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name,price,classification );
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// update for suppliers
router.patch('/view_suppliers/update', (request, response) => {
    const { id, name,address,phonenumber,email } = request.body;
    // console.log(request.body)
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameByIdSuppliers(id, name,address,phonenumber,email );
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});




//search
router.get('/view_medicines/search/:id', (request, response) => {
    const { id } = request.params;
    console.log(id)
    const db = dbService.getDbServiceInstance();

    const result = db.searchById(id);
    
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
//search for supplier
router.get('/view_suppliers/search/:id', (request, response) => {
    const { id } = request.params;
    console.log(id)
    const db = dbService.getDbServiceInstance();

    const result = db.searchByIdSuppliers(id);
    
    
    result
    .then(data => response.json({data : data}))
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