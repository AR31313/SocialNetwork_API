const router = require('express').Router();
const {
  createThought,
  getThoughtById,
  getAllThoughts,
  updateThought,
  deleteThought


} = require('../../controllers/thoughts-Controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtID
router
  .route('/:id')
  .put(updateThought)
  .delete(deleteThought)
  .get(getThoughtById);


module.exports = router;
