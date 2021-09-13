const {Schema, model } = require ('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
  reactionBody: {
      type: String,
      required: true,
      maxLength: 280
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
  },
  username: {
  type: String,
  required: true,
  },
    }
  );

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength:280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
    type: String,
    required: true
    },
    // reactions: [{
    //     type: Schema.Types.ObjectId,
    //     ref:'Reaction'
    // }],
    reactions: [ReactionSchema]
  },
    {
    toJSON: {
        getters: true,
        virtuals: false
      },
      id:false
    },
    );
    
    const Thought = model('Thought', ThoughtSchema);
    
    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
      });
module.exports=Thought;
