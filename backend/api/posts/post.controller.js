const logger = require('../../services/logger.service')
const postService = require('./post.service')

async function getposts(req, res) {
    try {
        const posts = await postService.query(req.query)
        res.send(posts)
    } catch (err) {
        logger.error('Cannot get posts', err)
        res.status(500).send({ err: 'Failed to get posts' })
    }
}

async function getById(req, res) {
    try {
        const {id} = req.params
        const post = await postService.getById(id)
        res.json(post)
    } catch (err) {
        logger.error('Cannot get post by id', err)
        res.status(500).send({ err: 'Failed to get post' })
    }
}

async function deletepost(req, res) {
    try {
        const postId =req.params.id
        await postService.remove(postId)
        res.json('post deleted')

    } catch (err) {
        console.log('Failed to delete post: ', err)
        res.status(500).send({ err: 'Failed to delete post' })
    }


}


async function addpost(req, res) {
    try {
        const post = req.body
        const updatedPost = await postService.add(post)
        res.json(updatedPost)

    } catch (err) {
        console.log('Failed to add post: ', err)
        res.status(500).send({ err: 'Failed to add post' })
    }
}

async function updatePost(req, res) {
    try {
        const post = req.body
        const updatedPost = await postService.update(post)
        res.json(updatedPost)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update post' })
    }
}

module.exports = {
    getposts,
    getById,
    deletepost,
    addpost,
    updatePost
}
