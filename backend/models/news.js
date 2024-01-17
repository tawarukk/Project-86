const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsSchema = new Schema({
    topic: {
        type: String
    },
    description: {
        type: String
    },
    img_card_news: {
        type: String
    },
    type: {
        type: String
    },
    view_count: {
        type: Number
    },
    paragraphs: [{
        heading: {
            type: String
        },
        image: {
            type: String
        },
        content: {
            type: String
        },
        status:{
            type: String
        }
    }],
    available_con: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collation: {
        locale: 'th',
        caseLevel: true,
        strength: 2
    }
});

module.exports = mongoose.model('News', newsSchema);
