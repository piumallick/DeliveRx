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
const customerRouter = require('./routes/customer');
const dashboardRouter = require('./routes/dashboard');

const app = express();

const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

app.use(express.static(path.join(__dirname, 'public')));
app.use(lessMiddleware(path.join(__dirname, 'public')));
// app.use("/public", express.static("./public/"));
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

app.engine("html", require("ejs").renderFile);

// app.use('/', indexRouter);
app.use('/users', authRouter);
app.use('/login', authRouter);
app.use('/staff', staffsRouter);
app.use('/customer', customerRouter);
app.use('/dashboard', dashboardRouter);


app.get('/register', function (req, res, next) {
    res.redirect('/users/register');
});

app.get('/logout', function (req, res, next) {
    res.redirect('/users/logout');
});

const PORT = process.env.PORT || 3000;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
