const   mongoose = require('mongoose');
const Schema = mongoose.Schema

let studentSchama = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
},{
    collation: {
        locale: 'th', 
        caseLevel: true, 
        strength: 2 
    }
})

module.exports = mongoose.model('Students', studentSchama)