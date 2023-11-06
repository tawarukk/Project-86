const   mongoose = require('mongoose');
const Schema = mongoose.Schema

let skillSchama = new Schema({
    name_skill: {
        type: String
    },
    position_skill: {
        type: String
    },
    morale_consumed: {
        type: Number,
        decimal: true
    },
    productivity: {
        type: Number,
        decimal: true
    },
    capacity: {
        type: Number,
        decimal: true
    },
    order_efficiency: {
        type: Number,
        decimal: true
    },
    condition_skill: {
        type: String
    },
    effect_skill: {
        type: String
    },
    available_content: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now // กำหนดค่าเริ่มต้นเป็นวันและเวลาปัจจุบัน
    }
},{
    collation: {
        locale: 'th', 
        caseLevel: true, 
        strength: 2 
    }
})

module.exports = mongoose.model('Skill', skillSchama)