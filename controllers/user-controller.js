const { User } = require('../models');
// const { db } = require('../models/User')

const userController = {
    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
  //get one User by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res){
  User.create(body)
  .then(dbUserData =>
    res.json(dbUserData))
  .catch(err =>
    res.status(400).json(err));
},

updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {new: true})
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json ({
                message: 'No User found with this id!'
            });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
deleteUser({ params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
//add friend by userid/friends/:friendId

addFriend({ params, body }, res) {
  User.findOneAndUpdate(
    { _id: params.id },
    { $push: { friends: body } },
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
 // remove friend-userId/friends/:friendId
 removeFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.id },
    { $pull: { Friends: { FriendId: params.FriendId } } },
    { new: true }
  )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},
addFriend({params}, res){
  User.findOneAndUpdate({
    _id: params.id},
  {$addToSet:{friends: params.friendId}},
  {new: true}
  )
  .then((dbUserData)=>{
    if(!dbUserData){
    res.status(404).json({message:'no user found with this id'
    });
    return;
  }
  res.json(dbUserData);
})
.catch((err)=> res.status(400).json(err));
},
removeFriend({params}, res){
  User.findOneAndUpdate({
    _id: params.id},
  {$pull: {friends: params.friendId} },
    {new:true}
  )
  .then((dbUserData)=> {
    if(!dbUserData) {
      res.status(404).json({message: "no user found with this Id"});
    return;

    }
    res.json(dbUserData);
  })
  .catch((err)=> res.status(400).json(err));
}
};

module.exports = userController;