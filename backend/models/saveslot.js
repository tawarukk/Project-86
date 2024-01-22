const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let saveSlotSchema = new Schema({
    user_save_id: {
        type: String
    },
    save_id: {
        type: String
    },
    save_topic: {
        type: String
    },
    save_description:{
        type: String
    },
    save_color: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('saveSlot', saveSlotSchema);