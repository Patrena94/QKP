const router = require('express').Router();
// const { addThought, removethought } = require('../../controllers/thought-controller');
// const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// router.use('/thoughts', thoughtRoutes);
// router.use('/users', userRoutes);

// /api/thoughts/<userId>
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thought-controller');
// /api/thoughts/<userId>/<thoughtId>
// router.route('/:userId/:thoughtId').delete(removeThought);
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought)



  router.route('/:userId').post(addThought);
  router.route('/:UserId/:thoughtId/:reactionId').delete(removeReaction);
module.exports = router;
