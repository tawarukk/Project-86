const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsSchema = new Schema({
    title: {
        type: String
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
        }
    }],
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
