const {Schema, model } = require ('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema ({
    reaction_text: {
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
    required: true
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref:'Reaction'
    }],
    toJSON: {
        virtuals: true,
        getters: true
      },
      id:false
});
const Reaction = model('Reaction', ReactionSchema);

module.exports=Reaction;
