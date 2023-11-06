const   mongoose = require('mongoose');
const   Schema = mongoose.Schema

let memberSchama = new Schema({
    name_member: {
        type: String
    },
    email_member: {
        type: String
    },
    password_member: {
        type: String
    },
    code_member: {
        type: String
    },
    img_member: {
        type: String
    },
    tier_member: {
        type: String
    },
    role_member: {
        type: String
    },
    available_member: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now // กำหนดค่าเริ่มต้นเป็นวันและเวลาปัจจุบัน
    }
},{
    collation: {
        locale: 'th', // กำหนดภาษา (อาจจะเป็น 'en' สำหรับภาษาอังกฤษ)
        caseLevel: true, // กำหนดให้ตัวพิมพ์ใหญ่และตัวพิมพ์เล็กมีความสำคัญต่างกัน
        strength: 2 // กำหนดระดับความเข้มข้นของการเปรียบเทียบ (1 หรือ 2)
    }
})

module.exports = mongoose.model('member', memberSchama)
