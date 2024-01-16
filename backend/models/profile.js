const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let profileSchema = new Schema({
    profile_img: {
        type: String
    },
    descriptions: {
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

module.exports = mongoose.model('profile', profileSchema);