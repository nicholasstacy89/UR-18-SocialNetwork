const { User, Thought } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User
      .find()
      .select('-__v');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getOneUser = async (req, res) => {
  try {
    const user = await User
      .findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .select('-__v');
    if (!user) {
      return res.status(400).json({ message: 'Error: This user does not exist.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User
          .findByIdAndUpdate(req.params.id, req.body, { new: true })
          .select('-__v');
   
    if (req.body.username) {
      await Thought.updateMany(
        { _id: { $in: user.thoughts } },
        { username: req.body.username },
      );
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      await Thought.deleteMany({ _id: { $in: user.thoughts } })
      return res.json(`${user.username} was deleted`);
    }
    res.status(400).json('Error: This user does not exist.');
  } catch (err) {
    res.status(500).json(err);
  }
}

const getFriends = async (req, res) => {  
  try {
    const user = await User
      .findById(req.params.userId)
      .populate('friends')
      .select('-__v');
    if (!user) {
      return res.status(400).json('Error: This user does not exist.');
    }
    res.json(user.friends);
  } catch (err) {
    res.status(500).json(err);
  }
}

const addFriend = async (req, res) => {
  try {
    if (req.params.userId === req.params.friendId) {
      return res.status(400).json('Error: User cannot friend self.');
    }
    const user = await User.findById(req.params.userId);
    if (user.friends.find( friend => friend._id.toString() === req.params.friendId )) {
      return res.status(400).json(`Error: already friends with ${req.params.friendId}`);
    }
    user.friends.push({_id: req.params.friendId});
    user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user.friends.find( friend => friend._id.toString() === req.params.friendId )) {
      return res.status(400).json(`Error: ${req.params.friendId} is not your friend.`);
    }
    const numFriends = user.friends.length;
    user.friends = user.friends.filter( friend => friend._id.toString() !== req.params.friendId );
    if (numFriends === user.friends.length) return res(400).json('Error: friend does not exist.');
    user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getFriends,
  addFriend,
  deleteFriend
};