const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend

} = require('../../controllers/userContoller');

// /api/users
router.route('/').post(createUser).get(getAllUsers);

// /api/users/:users_id
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
// .delete(deleteFriend);

module.exports = router;
