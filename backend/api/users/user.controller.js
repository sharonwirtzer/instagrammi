
const usersService = require('./user.service')


async function getById(req, res){
    try {
        const {userId}= req.params
        const user = await usersService.getById(userId)
        res.json(user)
    } catch (err) {
        console.log('error while trying get user by id: ', err)
        throw err
    }

}





module.exports = {
    getById,
    
}