const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    name_con: {
        type: String
    },
    type_con: [{
        type: String
    }],
    img_card_con: {
        type: String
    },
    socialMedia: [{
        platform: String,
        link: String
    }],
    survey_con:{
        type: String
    },
    available_con: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('creator', creatorSchema);
