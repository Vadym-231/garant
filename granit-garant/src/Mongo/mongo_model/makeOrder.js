const mongoose = require('mongoose')

const order = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    feedback:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    }
})

const Order = mongoose.model('orders', order)

module.exports = Order