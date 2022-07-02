const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  // deleteUser

} = require('../../controllers/userContoller');

// /api/users
router.route('/').post(createUser).get(getAllUsers);

// /api/users/:users_Id
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
// .delete(deleteUser)

module.exports = router;
