const express = require('express')
const usersController = require('./user.controller')
const router = express.Router()

router
.route('/:userId').get(usersController.getById)
module.exports = router