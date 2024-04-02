const { Thought, User } = require('../models');
const { findById } = require('../models/User');


const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().select('-__v');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getOneThought = async (req, res) => {
  try {
    const thought = await Thought
      .findById(req.params.id)
      .select('-__v');
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { thoughts: thought._id } },
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { thoughtText: req.body.thoughtText },
      { new: true }
    ).select('-__v');
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (thought) {
      return res.json(`Thought by ${thought.username} was deleted.`);
    }
    res.status(400).json(`Error: Could not find thought with this id ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }

}

const getReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    const reaction = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() === req.params.reactionId
    );
    res.json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
}

const createReaction = async (req, res) => {
  try {
    const reaction = await Thought.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { new: true }
    );
    res.json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllReactions = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought.reactions);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getReactions = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought.reactions);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    thought.reactions = thought.reactions.filter( (reaction) => reaction.reactionId.toString() !== req.body.reactionId);
    thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}




module.exports = {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  getAllReactions,
  getReaction,
  createReaction,
  getReactions,
  deleteReaction,
};