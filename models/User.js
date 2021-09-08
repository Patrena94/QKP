const { Schema, model } = require ('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        validate:{
            validator:()=> Promis.resolve(false),
            message: 'Email validation failed'
            // isEmail:true
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref:'Friend'
    }]   
},
{
    toJSON: {
        virtuals: true,
        getters: true
      },
    id: false
}
);

const User = model('User', UserSchema);
//verify that total count of friends and reations on retrieval is needed.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.reaction.length + 1, 0);
  });

module.exports=User;