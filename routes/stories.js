const express = require ('express')
const router = express.Router()
const controller = require('../controller/stories')
const { ensureAuth,  } = require('../middleware/auth')


// @desc Login / show add page
// @route GET /stories/add
router.get('/add', ensureAuth, controller.addPage )


// @desc story add form
// @route post /stories
router.post('/', ensureAuth, controller.addStory )

// @desc edit story page
// @route post /stories/edit/:id
router.get('/edit/:id', ensureAuth, controller.editStory )

// @desc Login / show all stories
// @route GET /stories
router.get('/', ensureAuth, controller.showStories )


// @desc Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, controller.updateStory )

// @desc Delete story
// @route DELETE /stories/:id
router.delete('/:id', ensureAuth, controller.deleteStory )

// @desc Login / show one stories
// @route GET /stories/:id
router.get('/:id', ensureAuth, controller.showOneStory )

// @desc Login / show more stories
// @route GET /stories/user/:id
router.get('/user/:userId', ensureAuth, controller.showMoreStory )

module.exports = router