const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
    {
        name: {type: String, required: true},
        comment: {type: String, required: true},
    }
)
const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerUsername: { type: String, required: true },
        published: {type: Date, required: true},
        likes: {type: [String], required: true},
        dislikes: {type: [String], required: true},
        views: {type: Number, required: true},
        comments: {type: [CommentSchema], required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
