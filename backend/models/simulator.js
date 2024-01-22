const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let simulatorSchema = new Schema({
    product_id: {
        type: String
    },
    Name_product:{
        type: String
    },
    position: {
        type: String
    },
    Time_Remaining: {
        type: Number,
    },
    view_count: {
        type: Number,
        default: 0
    },
    Rate: {
        type: Number,
        default: 0
    },
    Rate_cal: {
        type: Number,
        default: 0,
        set: v => parseFloat(v.toFixed(1)), // Round to 1 decimal place
    },
    Rate_count: {
        type: Number,
        default: 0
    },
    Share_count: {
        type: Number,
        default: 1
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
        user: String,
        user_id: String
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
