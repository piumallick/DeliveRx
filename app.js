const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const lessMiddleware = require('less-middleware');
const logger = require('morgan');

// const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const staffsRouter = require('./routes/staff');
const customRouter = require('./routes/customer');
const dashboardRouter = require('./routes/dashboard');

const app = express();

const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

app.use(express.static(path.join(__dirname, 'public')));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: "cats"}));
app.use(flash());
// const initializePassport = require('./passportConfig');
// initializePassport(passport);
app.use(passport.initialize());
// app.use(passport.initialize(initializePassport));
app.use(passport.session());

// app.use('/', indexRouter);
app.use('/users', authRouter);
app.use('/login', authRouter);
app.use('/staff', staffsRouter);
app.use('/customer', customRouter);
app.use('/dashboard', dashboardRouter);


app.get('/register', function (req, res, next) {
    res.redirect('/users/register');
});

app.get('/logout', function (req, res, next) {
    res.redirect('/users/logout');
});

// middleware
// app.use(session({
//         secret: 'secret',
//         resave: false,
//         saveUninitialized: false
//     })
// );
//

const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render pages

// // Staff Dashboard Pages
// app.get('/users/staff/dashboard', (req, res) => {
//     res.render("dashboard_staff");
// });
//
// app.get('/users/staff/dashboard/view_medicines', function (req, res) {
//     let dbClient = new db.Client(dbConnection);
//
//     dbClient.connect(function (err) {
//         if (err)
//             throw err;
//
//         let query = "select * from medicine";
//
//         dbClient.query(query, function (err, result) {
//             if (err)
//                 throw err;
//             else {
//                 res.render('view_medicines.ejs', {medicine: result});
//             }
//         });
//     });
// });
//
//
// // Index / Home Page
// app.get('/', (req, res) => {
//     res.render("index");
// });
//
// // Register New User Page
// app.get('/users/register', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.render('dashboard', {user: req.user.firstName});
//     } else {
//         res.render("register");
//     }
// });
//
// // Login Page
// app.get('/users/login', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.render('dashboard', {user: req.user.firstName});
//     } else {
//         res.render("login");
//     }
// });
//
// app.get('/users/dashboard', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.render("dashboard", {user: req.user.firstName});
//     } else {
//         res.render("login");
//     }
// });
//
// // Logout Page
// app.get('/users/logout', ((req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You have logged out!');
//     res.redirect('/users/login');
// }));
//
// app.post('/users/register', (async (req, res) => {
//
//     let {firstName, lastName, email, phone_number, address, gender, dob, password, confirm_password} = req.body;
//
//     console.log({
//         firstName, lastName, email,
//         phone_number, address, gender, dob,
//         password, confirm_password
//     });
//
//     // Validation checks
//     let errors = []
//
//     if (!firstName || !lastName || !email || !phone_number || !address || !gender || !dob || !password || !confirm_password) {
//         errors.push({message: 'Please enter data for all the fields.'})
//     }
//
//     if (password.length < 6) {
//         errors.push({message: 'Password should be at least 6 characters.'})
//     }
//
//     if (password !== confirm_password) {
//         errors.push({message: 'Passwords do not match.'})
//     }
//
//     if (errors.length > 0) {
//         res.render('register', {errors})
//     } else {
//         // Form validation has passed
//         let hashedPassword = await bcrypt.hash(password, 10); // Allow 10 rounds of hash encryption; default is 10
//         console.log(hashedPassword);
//
//         pool.query(
//                 `SELECT * FROM users WHERE email_address = $1`, [email], (err, results) => {
//                 if (err) {
//                     throw err;
//                 } else if (results.rows.length === 0) {
//                     console.log(results.rows);
//                     //res.send();
//                 }
//
//                 if (results.rows.length > 0) {
//                     errors.push({message: "Email already registered."});
//                     res.render('register', {errors});
//                 } else {
//                     pool.query(
//                             `INSERT INTO users (first_name, last_name, email_address, phone_number, address, gender, dob, passwd)
//                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//                         [firstName, lastName, email, phone_number, address, gender, dob, hashedPassword], (err, results) => {
//                             if (err) {
//                                 throw err;
//                             }
//                             console.log(results.rows);
//                             req.flash('success_msg', 'You are now registered. Please log in.');
//                             res.redirect('/users/login')
//                         }
//                     )
//                 }
//             }
//         )
//     }
// }))
//
// // catch 404 and forward to error handler
// // app.use(function (req, res, next) {
// //   next(createError(404));
// // });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
//
// // app.post('/users/login',
// //     passport.authenticate('local', {
// //       successRedirect: '/users/dashboard',
// //       failureRedirect: '/users/login',
// //       failureFlash: true
// //     })
// // );
//
// // app.post('/users/login', function (req, res, next) {
// //     passport.authenticate('local', function (err, user, info) {
// //         if (err) {
// //             return next(err);
// //         }
// //         if (!user) {
// //             return res.redirect('/users/login');
// //         }
// //         req.logIn(user, function (err) {
// //             if (err) {
// //                 return next(err);
// //             }
// //             return res.redirect('/users/dashboard');
// //         });
// //     })(req, res, next);
// // });
//
// app.post('/users/login', passport.authenticate('local', {
//         successRedirect: '/users/dashboard',
//         failureRedirect: '/users/register',
//         failureFlash: true,
//         session: true
//     }), function (req, res) {
//         res.redirect('/');
//     }
// );
//
// // function checkAuthenticated(req, res, next) {
// //     if (req.isAuthenticated()) {
// //         return res.redirect('/users/dashboard');
// //     }
// //     next();
// // }
// //
// // function checkNotAuthenticated(req, res, next) {
// //     if (req.isAuthenticated()) {
// //         return next;
// //     }
// //     res.redirect('/users/login');
// // }
//
// module.exports = app;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
