const express = require('express')
const {addpost, getposts, getById, updatePost, deletepost} = require('./post.controller')
const router = express.Router()

router.route('/').get(getposts).post(addpost)
router.route('/:id').get(getById).put(updatePost).delete(deletepost)

module.exports = router