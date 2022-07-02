const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

module.exports = {
  // Create a Thought
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => {
        res.json(dbUserData);
      }).catch(err => res.status(400).json(err));
  },
}