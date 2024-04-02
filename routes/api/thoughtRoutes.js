const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  getAllReactions,
  getReaction,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').get(getAllReactions).post(createReaction);

router.route('/:id/reactions/:id').get(getReaction).delete(deleteReaction);

module.exports = router;