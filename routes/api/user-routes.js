const router = require('express').Router();
const { addUser} = require('../../controllers/user-controller');
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

//Set up Get all and Post at /api/users
// router.route('/').get(getCallbackFunction).post(postCallbackFunction);

router
.route('/')
.get(getAllUser)
.post(createUser);

// Set up GET one, PUT, and DELET at /api/users/:id

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// Add and Delete friend api/:userid/friends/:friendId
router.route('/:id/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;