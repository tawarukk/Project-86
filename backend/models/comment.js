const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    post_id: {
        type: String
    },
    user_id: {
        type: String
    },
    user_name_comment:{
        type: String
    },
    user_img_comment:{
        type: String
    },
    comment: {
        type: String
    },
    available_con: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', commentSchema);
