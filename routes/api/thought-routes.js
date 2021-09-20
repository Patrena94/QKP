const router = require("express").Router();

const userRoutes = require("./user-routes");


// /api/thoughts/<userId>
const {
  getAllThoughts,
  getThoughtById,
  updateThought,
  addThought,
  // deleteThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

router.route('/:userId/:thoughtId').delete(removeThought);

router.route('/:id/reactions').post(addReaction);

router.route('/').get(getAllThoughts);

router.route('/:userId').post(addThought);

router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought);

router.route('/:userId/:id/:reactionId').delete(removeReaction);

module.exports = router;
