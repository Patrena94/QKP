const {schema, model, Schema } = require ('mongoose');
const Reaction = model('Reaction', ReactionSchema);
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema ({
    Reaction_text: {
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
module.exports=Reaction;
