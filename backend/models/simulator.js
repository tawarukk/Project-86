const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let simulatorSchema = new Schema({
    product_id: {
        type: String
    },
    position: {
        type: String
    },
    view_count: {
        type: Number,
        default: 0
    },
    Rate: {
        type: Number,
        default: 0
    },
    Rate_count: {
        type: Number,
        default: 0
    },
    Share_count: {
        type: Number,
        default: 0
    },
    operator: [{
        operator_save_a: {
            type: String
        },
        operator_save_b: {
            type: String
        },
        operator_save_c: {
            type: String
        },
    }],
    comment: [{
        comment_member: String,
        user: String
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

module.exports = mongoose.model('Simulator', simulatorSchema);
