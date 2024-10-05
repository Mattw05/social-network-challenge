
const { Thought, User } = require('../models');

const thoughtController = {

    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find().select('-__v');
            res.json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
  
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            !thoughtData
                ? res.status(404).json({ message: 'No thought with that ID!' })
                : res.json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
            res.json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            !thoughtData
                ? res.status(404).json({ message: 'No thought associated with that ID!' })
                : res.json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            !thoughtData
                ? res.status(404).json({ message: 'No thought associated with that ID!' })
                : res.json({ message: 'The thought has been deleted!' });
        } catch (error) {
            res.json(500).json(error);
        }
    },

    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            !thoughtData
                ? res.status(404).json({ message: 'No thought found with that ID!' })
                : res.json(thoughtData);
        } catch (error) {
            res.json(500).json(error);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            !thoughtData
                ? res.status(404).json({ message: 'No thought found with that ID!' })
                : res.json(thoughtData);
        } catch (error) {
            res.json(500).json(error);
        }
    }
};

module.exports = thoughtController;