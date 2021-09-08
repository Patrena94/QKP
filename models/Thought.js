const {Schema, model, Type } = require ('mongoose');
// const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema ({
    thought_text: {
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
    const ReactionSchema = new Schema({

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
          },
        reaction_text: {
            type: String,
            allowNull: false,
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
    
        reaction: [ReactionSchema]},
    
        {
            toJSON: {
              virtuals: true,
              getters: true
            },
            id: false
          }
        );
    const Thought = model('Thought', ThoughtSchema);
    
    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.rections.length;
      });
module.exports=Thought;
