const router = require('express').Router();
const { getUsers,
        getOneUser,
        createUser,
        updateUser,
        deleteUser,
        getFriends,
        addFriend,
        deleteFriend
      } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends').get(getFriends);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;