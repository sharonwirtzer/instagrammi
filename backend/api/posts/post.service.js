const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const socketService = require('../../services/socket.service')

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('posts')
        // -1 means show new posts first

        return await collection.find(filterBy).sort({ createdAt: -1 }).toArray()
    } catch (err) {
        console.log('error while tryung to query posts: ', err)
        throw err
    }
}

async function getById(postId) {
    try {
        const collection = await dbService.getCollection('posts')
        return await collection.findOne({ _id: ObjectId(postId) })
    } catch (err) {
        console.log('error while trying to get post: ', err);
        throw err
    }
}

async function remove(postId) {
    try {
        console.log('postId', postId)
        const collection = await dbService.getCollection('posts')
        const post = await collection.findOne({ _id: ObjectId(postId) })
        await collection.deleteOne({ _id: ObjectId(postId) })
        // return await collection.deleteOne({ _id: ObjectId(postId), byUserId: ObjectId(userId) })

        //remove post in user...
        const userCollection = await dbService.getCollection('users')
        const pullingProccess = await userCollection.updateOne(
            { _id: ObjectId(post.byUser._id) },
            { $pull: { postid: postId } }
          )

    } catch (err) {
        console.log('error while trying to remove post: ', err)
        throw err
    }

}


async function add(post) {
    try {
        const collection = await dbService.getCollection('posts')
        const addingProcess = await collection.insertOne(post)
        const updatedPost = addingProcess.ops[0];

        //update postId in user...
        const updatedPostId = updatedPost._id
        console.log('updatedPostId',updatedPostId)
        const userCollection = await dbService.getCollection('users')
        await userCollection.updateOne(
            { _id: ObjectId(updatedPost.byUser._id) },
            { $push: { postid: JSON.parse(JSON.stringify(updatedPostId)) } }
        )

        return updatedPost
    } catch (err) {
        console.log("kusomo");
        throw err
    }
}

async function update(post) {
    try {
        const collection = await dbService.getCollection('posts')
        const postId = post._id
        delete post._id
        const res = await collection.findOneAndUpdate(
            { _id: ObjectId(postId) },
            { $set: post },
            { returnOriginal: false })


        socketService.emit('postUpdate', res.value)
        return res.value
    } catch (err) {
        console.log('error while trying to updated post: ', err)
        throw err
    }
}



module.exports = {
    query,
    getById,
    remove,
    add,
    update
}


