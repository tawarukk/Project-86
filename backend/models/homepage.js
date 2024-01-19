const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let homepageSchema = new Schema({
    homepage_img: {
        type: String
    },
    topic: {
        type: String
    },
    descriptions: {
        type: String
    },
    link_page: {
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

module.exports = mongoose.model('homepage', homepageSchema);