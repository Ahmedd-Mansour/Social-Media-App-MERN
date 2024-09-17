const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String,
    },
    user_id:{
        type: String,
        required: true
    },
    creatorName:{
        type: String,
    },
    creatorLastname:{
        type: String
    },
    likes: [{
        type:mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
},{timestamps: true});



module.exports = mongoose.model('Post',postSchema)