const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData, reactionData } = require('./data');

const getUsername = () => {
  const randomUser = Math.floor(Math.random() * userData.length);
  return userData[randomUser].username;
};

const getReactions = (max) => {
  const randomSize = Math.floor(Math.random() * (max + 1));
  const reactions = [];
  for (let i = 0; i < randomSize; i++) {
    const randomIndex = Math.floor(Math.random() * reactionData.length);
    reactions.push(reactionData[randomIndex]);
  }
  return reactions;
}
const thoughts = thoughtData.map((text) => {
  const object = {};
  object.thoughtText = text;
  object.username = getUsername();
  object.reactions = [];
  const reactionArray = getReactions(5);
  for (const reaction of reactionArray) {
    const reactionobject = {};
    reactionobject.reactionBody = reaction;
    reactionobject.username = getUsername();
    object.reactions.push(reactionobject);
  }
  return object;
});

connection.on('error', (err) => err);

connection.once('open', async () => {

  const thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) await connection.dropCollection('thoughts');
  const thoughtsColl = await Thought.insertMany(thoughts);

  const users = userData.map((user) => {
    const object = {};
    object.username = user.username;
    object.email = user.email;
    object.thoughts = [];
    for (let i = 0; i < thoughts.length; i++) {
      if (thoughts[i].username == user.username) object.thoughts.push(thoughtsColl[i]['_id']);
    }
    return object;
  });

  const usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) await connection.dropCollection('users');
  const userColl = await User.insertMany(users);

  const userobjectIds = userColl.map((user) => user._id);
  for (const user of userColl) {
    const numFriends = Math.floor(Math.random() * 4);
    for (let i = 0; i < numFriends; i++) {
      const friendIndex = Math.floor(Math.random() * userobjectIds.length);
      user.friends.push(userobjectIds[friendIndex]);
    }
    await user.save();
  }

  console.info('Data has been seeded!');
  process.exit(0);
});