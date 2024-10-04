const router = require('express').Router();
const {
    createReaction,
    createThought,
    updateThought,
    getAllThoughts,
    getSingleThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;