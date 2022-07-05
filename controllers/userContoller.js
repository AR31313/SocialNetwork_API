const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

module.exports = {
  // Create a USER
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => {
        res.json(dbUserData);
      }).catch(err => res.status(400).json(err));
  },
  //Read, GET a USER
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        { path: 'thoughts', select: "-__v" },
        { path: 'friends', select: "-__v" }
      ])
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //GET all USERS /api/users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  //Update a USER
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  //Delete a USER
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        return dbUserData ? res.json({ message: 'User sucessfully deleted!' }) : res.status(404).json({ message: 'No User with that ID' });
      }).catch((err) => res.status(500).json(err));
  },
  //UPDATE FRIENDS
  // POST /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err))
  },


}