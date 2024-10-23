const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User' 
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment' 
        }
    ]

})

const postModel = mongoose.model('Post',postSchema);

module.exports = postModel;