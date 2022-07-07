const router = require('express').Router();
const {
  createThought,
  getThoughtById,
  getAllThoughts,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction

} = require('../../controllers/thoughts-Controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/<thoughtID>
router
  .route('/:id')
  .put(updateThought)
  .delete(deleteThought)
  .get(getThoughtById);


//api/thoughts/<thoughtID>/reactions/<reactionID>
router.route('/:thoughtId/reactions/')
  .post(addReaction)
  .delete(deleteReaction)
module.exports = router;
