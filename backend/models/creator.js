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
    socialMedia: {
        Facebook: String,
        F_link: String,
        Youtube: String,
        Y_link: String,
        Twitter: String,
        T_link: String,
        Raddit: String,
        R_link: String,
        Anoter: String,
        A_link: String,
    },
    recommend_count:{
        type: Number
    },
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
