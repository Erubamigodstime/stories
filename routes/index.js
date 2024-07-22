const express = require ('express')
const router = express.Router()
const controller = require('../controller/controllerOne')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


// @desc Login / landin page 
// @route GET /login
router.get('/', ensureGuest, controller.login )


// @desc Dashboard  page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, controller.dashboard)


module.exports = router