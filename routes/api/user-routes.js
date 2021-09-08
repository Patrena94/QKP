const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
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

module.exports = router;