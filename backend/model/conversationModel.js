const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

const conversationModel = mongoose.model("Conversation", conversationSchema)

module.exports = conversationModel;