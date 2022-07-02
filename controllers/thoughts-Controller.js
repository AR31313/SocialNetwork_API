const { Thought, User } = require("../models");

module.exports = {
  // Create a Thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.status(400).json(err));
  },

  //Read, GET a Thought 
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Read, GET all thoughts 
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // Update a Thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.Id },
      body,
      { runValidators: true, new: true }
    )
      .then((dbUpdateThoughtData) => {
        return dbUpdateThoughtData ? res.json(({ message: 'Thoughts sucessfully updated!' })) : res.status(404).json({ message: 'No Thought with this id!' })
      }).catch((err) => res.status(500).json(err));
  },

  // Delete a Thoughts
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.Id })
      .then((dbThoughtData) => {
        return dbThoughtData ? res.json({ message: 'Thoughts sucessfully deleted!' }) : res.status(404).json({ message: 'No thought with that ID' });
      }).catch((err) => res.status(500).json(err));
  }


}
