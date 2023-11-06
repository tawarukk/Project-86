const   mongoose = require('mongoose');
const   Schema = mongoose.Schema

let productSchama = new Schema({
    name_product: {
        type: String
    },
    time_product: {
        type: Number
    },
    type_product: {
        type: String
    },
    img_portrait_product: {
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

module.exports = mongoose.model('Product', productSchama)