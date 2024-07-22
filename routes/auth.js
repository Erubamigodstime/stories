const express = require ('express')
const router = express.Router()
const passport = require('passport')
// const passport = require('../config/passport')

// @desc Authenticate with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))


// @desc Google Auth hcall back
// @route GET / auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
(req, res)=> {
    res.redirect('/dashboard')
})

// @desc Logout user
// route  /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router