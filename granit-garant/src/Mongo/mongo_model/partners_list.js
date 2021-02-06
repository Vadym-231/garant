const mongoose = require('mongoose')


const partners = mongoose.Schema({
    companyName:{
        type:String,
        default:null
    },
    logoLink:{
        type:String,
        default: null
    }
})

const partners_model = mongoose.model('partners', partners)

module.exports = partners_model