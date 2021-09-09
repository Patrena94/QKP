const {Thought, User} = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
    User.find({})
      .populate({
        path: 'users',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
 //get single thought by its _id

 getThoughtById({ params }, res) {
 Thought.findOne({ _id: params.id })
 .populate({
   path: 'tusers',
   select: '-__v'
 })
 .select('-__v')
 .then(dbThoughtData => {
   if (!dbThoughtData) {
     res.status(404).json({ message: 'No User found with this id!' });
     return;
   }
   res.json(dbThoughtData);
 })
 .catch(err => {
   console.log(err);
   res.status(400).json(err);
 });
},
    //add Thought to User
    addThought({ params, body}, res) {
    console.log(body);
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate({
            _id: params.userId},
            { $push: { thoughts: _id }},
            {new: true}
        );
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=> res.json(err));
    },
    //remove thought

    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({message: 'No thought with this id!'});
            }

            return Thought.findOneAndUpdate(
               {_id: params.userId},
               {$pull: {thoughts: params.thoughtId}},
               {new: true}
            );
        })
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      // remove React
removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { ReactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};
module.exports = thoughtController;