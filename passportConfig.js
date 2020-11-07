// const LocalStrategy = require('passport-local').Strategy;
// const {pool} = require('./dbConfig');
// const bcrypt = require('bcrypt');
//
// // Initialize Local Strategy
// function initialize(passport) {
//     const authenticateUser = (email, password, done) => {
//
//         pool.query(
//                 `SELECT *
//                  FROM users
//                  WHERE email_address = $1`,
//             [email],
//             (err, results) => {
//                 if (err) {
//                     console.log("Error: " + err);
//                     throw err;
//                 }
//                 console.log(results.rows);
//
//                 if (results.rows.length > 0) {
//                     const user = results.rows[0];
//
//                     bcrypt.compare(password, user.password, (err, isMatch) => {
//                         if (err) {
//                             throw err;
//                         }
//
//                         if (isMatch) {
//                             return done(null, user);
//                         } else {
//                             return done(null, false, {message: "Password is not correct. Please try again."})
//                         }
//                     })
//                 } else {
//                     return done(null, false, {message: "Email address is not registered."})
//                 }
//             }
//         );
//     };
//
//
//     passport.use(new LocalStrategy({
//             userNameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true
//         }, authenticateUser
//     ));
//
//     passport.serializeUser((user, done) => done(null, user.id));
//
//     passport.deserializeUser((id, done) => {
//         pool.query(
//                 `SELECT *
//                  FROM users
//                  WHERE user_id = $1`, [id], (err, results) => {
//                 if (err) {
//                     throw err;
//                 }
//                 return done(null, results.rows[0]);
//             }
//         )
//     })
// }
//
// module.exports = initialize;