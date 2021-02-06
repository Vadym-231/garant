const mongoose = require('mongoose')


const Resume = mongoose.Schema({
    vacancies_name:{
        type:String,
        default:'Security'
    },
    must_be:{
        type:Array,
        default: ['None']
    },
    price:{
        fixed:{
            type:Boolean,
            default: false
        },
        count:{
            type:Number,
            default:0
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const resume_model = mongoose.model('resumes', Resume)

module.exports = resume_model