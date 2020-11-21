const express = require('express');
const app = express();
const passport = require("passport");
const router = express.Router();
const {pool} = require('../dbConfig');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
app.use(express.static('public'));
const LocalStrategy = require('passport-local').Strategy;
const emailValidator = require("email-validator");
const PhoneNumber = require('awesome-phonenumber');
const moment = require('moment');

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: "Register",
        userData: req.user,
        messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')},
        error: null,
        body: null
    });
});

router.post('/register', async function (req, res) {
    let email = req.body.email;
    let phone_number = req.body.phone_number;

    if (!emailValidator.validate(email)) {
        res.render('register', {
            error: "The email address is not proper.",
            body: req.body
        });
        return;
    }

    let dob = req.body.dob;
    let age = moment().diff(moment(dob, "YYYY-MM-DD"), 'years');
    if (age < 18) {
        res.render('register', {
            error: "You must be 18 years of age or above.",
            body: req.body
        });
        return;
    }

    let phoneNumber = new PhoneNumber(phone_number, 'US');
    if (!phoneNumber.isValid()) {
        res.render('register', {
            error: "The phone number is not proper.",
            body: req.body
        });
        return;
    }

    try {
        const client = await pool.connect()
        await client.query('BEGIN')
        const hashedPassword = await bcrypt.hash(req.body.password, 10);  // Allow 10 rounds of hash encryption; default is 10
        await JSON.stringify(client.query(`SELECT user_id
                                           FROM users
                                           WHERE email_address = $1`, [email], function (err, result) {
            if (result.rows[0]) {
                req.flash('warning', "This email address is already registered. <a href='/login'>Log In!</a>");
                res.render('register', {
                    error: "This email address is already registered.",
                    body: req.body
                });
            } else {
                let queryString = `INSERT INTO users (user_id, first_name, last_name, email_address, phone_number,
                                                      address,
                                                      gender, dob, passwd)
                                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
                client.query(queryString, [uuid.v4(), req.body.firstName, req.body.lastName, email, phone_number,
                    req.body.address, req.body.gender, dob, hashedPassword], function (err, result) {
                    if (err) {
                        console.log(err);
                        client.query('ROLLBACK');
                        client.release();
                    } else {
                        let qs = `SELECT user_id
                                  FROM users
                                  WHERE email_address = $1`
                        client.query(qs, [email], function (err, result) {
                            if (err) {
                                console.log(err);
                                client.query('ROLLBACK');
                                client.release();
                                res.redirect('/register');
                            } else {
                                if (result.rows[0] == null) {
                                    client.query('ROLLBACK');
                                    client.release();
                                    console.log("Oops! Something went horribly wrong.");
                                    req.flash('danger', "Oops! Something went horribly wrong.");
                                    res.redirect('/register');
                                } else {
                                    let roleMappingQueryString = `INSERT INTO role_mapping(user_id, role_id, isactive, create_date, modified_date)
                                                                  VALUES ($1, $2, $3, $4, $5)`;
                                    client.query(
                                        roleMappingQueryString,
                                        [
                                            result.rows[0].user_id,
                                            3,
                                            'Y',
                                            new Date().toISOString(),
                                            new Date().toISOString()
                                        ],
                                        function (err, result) {
                                            if (err) {
                                                console.log(err);
                                                client.query('ROLLBACK');
                                                client.release();
                                                res.redirect('/register');
                                            } else {
                                                client.query('COMMIT');
                                                client.release();
                                                console.log(result);
                                                req.flash('success', 'User created successfully.')
                                                res.redirect('/login');
                                            }
                                        });
                                }
                            }
                        });
                    }
                });
            }
        }));
    } catch (e) {
        throw (e);
    }
});

router.get('/login', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('../dashboard');
    } else {
        res.render('login', {
            title: "Log In",
            userData: req.user,
            messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')},
            error: null
        });
    }
});

router.get('/logout', function (req, res) {
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    req.flash('success', "Logged out. See you soon!");
    res.redirect('/');
});


// router.post('/login', passport.authenticate('local', {
//     successRedirect: '../dashboard',
//     failureRedirect: './login',
//     failureFlash: {error: "User not found"},
//     session: true
// }), function (req, res) {
//     if (req.body.remember) {
//         req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
//     } else {
//         req.session.cookie.expires = false; //Cookie expires at the end of the session
//     }
//     res.redirect('/');
// });


router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('./login', {
                error: "Credentials do not match."
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            if (req.body.remember) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
            } else {
                req.session.cookie.expires = false; //Cookie expires at the end of the session
            }
            return res.redirect('../dashboard');
        });
    })(req, res, next);
});

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    loginAttempt();

    async function loginAttempt() {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryStr = `SELECT users.user_id,
                                   users.first_name,
                                   users.last_name,
                                   users.email_address,
                                   users.passwd,
                                   role_mapping.role_id
                            FROM users
                                     INNER JOIN role_mapping ON users.user_id = role_mapping.user_id
                                     INNER JOIN role ON role.role_id = role_mapping.role_id
                            WHERE email_address = $1`;
            await JSON.stringify(client.query(queryStr, [username], function (err, result) {
                if (err) {
                    return done(err)
                }
                if (result.rows[0] == null) {
                    req.flash('danger', "Oops! Incorrect login details.");
                    return done(null, false);
                } else {
                    bcrypt.compare(password, result.rows[0].passwd, function (err, check) {
                        if (err) {
                            console.log('Error while checking password');
                            return done();
                        } else if (check) {
                            let users = [{
                                email: result.rows[0].email_address,
                                firstName: result.rows[0].first_name,
                                lastName: result.rows[0].last_name,
                                role: result.rows[0].role_id
                            }];
                            setUser(req, users);
                            return done(null, users);
                        } else {
                            req.flash('danger', "Oops! Incorrect login details.");
                            return done(null, false);
                        }
                    });
                }
            }))
        } catch (e) {
            throw (e);
        }
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
})

router.get('/', function (req, res, next) {
    res.redirect('/users/login');
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

function setUser(req, user) {
    if (req.isAuthenticated()) {
        let property = 'user';
        if (req._passport && req._passport.instance) {
            property = req._passport.instance._userProperty || 'user';
        }
        this[property] = user;
    }
}

function getUser(req) {
    if (req.isAuthenticated()) {
        let property = 'user';
        if (req._passport && req._passport.instance) {
            property = req._passport.instance._userProperty || 'user';
        }
        return req[property][0];
    }
}

function isAuthenticated(req) {
    return req.isAuthenticated()
}


module.exports = [router, checkAuthenticated, getUser, isAuthenticated];
