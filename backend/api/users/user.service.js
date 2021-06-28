const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const socketService = require('../../services/socket.service')

const USERS_KEY = 'users'



async function getById(userId) {
    try {
        const collection = await dbService.getCollection(USERS_KEY)
        return await collection.findOne({ _id: ObjectId(userId) })

    } catch (err) {
        console.log('error while trying to get user bz id:', err)
        throw err
    }
}

module.exports = {
    getById,
}


