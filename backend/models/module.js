const   mongoose = require('mongoose');
const   Schema = mongoose.Schema

let moduleSchama = new Schema({
    name_mod: {
        type: String
    },
    effect_mod: {
        type: String
    },
    maxhp_mod: {
        type: Number
    },
    attack_mod: {
        type: Number
    },
    defent_mod: {
        type: Number
    },
    resis_mod: {
        type: Number
    },
    redeploy_mod: {
        type: Number
    },
    deploy_cost_mod: {
        type: Number
    },
    block_count_mod: {
        type: Number
    },
    bonut_atkspd_mod: {
        type: Number
    },
    img_cart_mod: {
        type: String
    },
    available_content: {
        type: String
    }, 
    operator_mod: {
        type: String
    },
    operator_mod_id: {
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

module.exports = mongoose.model('module', moduleSchama)
