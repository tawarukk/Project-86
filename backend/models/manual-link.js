const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let manualLinkSchema = new Schema({
    manual_id: {
        type: String
    },
    m_descriptions: {
        type: String
    },
    m_posision: {
        type: String
    },
    m_tier:{
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

module.exports = mongoose.model('manualLink', manualLinkSchema);