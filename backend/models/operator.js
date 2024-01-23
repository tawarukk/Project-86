const   mongoose = require('mongoose');
const   Schema = mongoose.Schema

let operatorSchama = new Schema({
    name_oper: {
        type: String
    },
    tier_oper: {
        type: String
    },
    descriptions:{
        type: String
    },
    maxhp_oper: {
        type: Number
    },
    attack_oper: {
        type: Number
    },
    defent_oper: {
        type: Number
    },
    resis_oper: {
        type: Number
    },
    redeploy_oper: {
        type: Number
    },
    deploy_cost_oper: {
        type: Number
    },
    block_count_oper: {
        type: Number
    },
    img_portrait_oper: {
        type: String
    },
    img_cart_oper: {
        type: String
    },
    available_content: {
        type: String
    },
    position: {
        type: String
    },
    skill_i:{
        type: String
    },
    skill_ii:{
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

module.exports = mongoose.model('operator', operatorSchama)