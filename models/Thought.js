const {Schema, model, Type } = require ('mongoose');
// const Thought = model('Thought', ThoughtSchema);
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({

    ReactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
    Reaction_text: {
        type: String,
        allowNull: false,
        // len: [280]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
    type: String,
    allowNull: false
    },

    Reaction: [ReactionSchma]
},
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
    );
const ThoughtSchema = new Schema ({
    thought_text: {
        type: String,
        allowNull: false,
        // len: [280]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
    type: String,
    allowNull: false
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref:'Reaction'
    }],
    reactions: [ReactionSchema]},
    {
    toJSON: {
        virtuals: true,
        getters: true
      },
      id:false
    },
    );
    const Thought = model('Thought', ThoughtSchema);
    
    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.rections.length;
      });
module.exports=Thought;
