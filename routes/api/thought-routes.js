const router = require("express").Router();
// const { addThought, removethought,addThought } = require('../../controllers/thought-controller');
// const thoughtRoutes = require('./thought-routes');
const userRoutes = require("./user-routes");

// router.use('/thoughts', thoughtRoutes);
// router.use('/users', userRoutes);

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
// /api/thoughts/<userId>/<thoughtId>
// router.route('/:userId/:thoughtId').delete(removeThought);
router.route('/:userId/:thoughtId').put(addReaction).delete(removeThought);
// .put(updateThought)

router.route('/').get(getAllThoughts);

router.route('/:userId').post(addThought);

//set up GET,PUT and Delete by /api/thoughts/:thoughtId

router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought);
// router.route('/:thoughtId').get(getThoughtById);

// router.route('/:thoughtId').delete(removeThought);


router.route('/:userId/:id/:reactionId').delete(removeReaction);

module.exports = router;
