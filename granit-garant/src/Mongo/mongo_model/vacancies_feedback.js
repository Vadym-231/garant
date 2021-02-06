const mongoose = require('mongoose')


const feedback = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true
    },
    date:{
        type:Date,
        default:new Date()
    },
    text:{
        type:String,
        default: null
    },
    lastName:{
      type:String,
      require:true
    },
    vacancies:{
        type:String,
        require:true
    }
})

const Feedback = mongoose.model('feedback_vacancies', feedback)

module.exports = Feedback