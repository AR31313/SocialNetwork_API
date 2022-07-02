const router = require('express').Router();
const {
  createUser
} = require('../../controllers/userContoller');

// /api/users
router.route('/').post(createUser);

// /api/courses/:courseId
// router
//   .route('/:Id')

module.exports = router;
