const mongoose = require('mongoose')


const responsive = mongoose.Schema({
    url:{
        type:String,
        require:true
    }
})

const Responsive = mongoose.model('responsive', responsive)

module.exports = Responsive