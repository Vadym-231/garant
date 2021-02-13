const keystone = require('keystone');
const Types = keystone.Field.Types;
const User = new keystone.List('User');

User.add({
    name: { type: Types.Name, required: true, initial: true, index: true },
    email: { type: Types.Email, required: true, initial: true, index: true, unique: true },
    password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

User.defaultColumns = 'name, email, isAdmin';
User.register();

const resume = new keystone.List('Resumes', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

resume.add({
    vacancies_name:{
        type:Types.Text,
        default:'Security'
    },
    must_be:{
        type:Types.TextArray,
        default: ['None']
    },
    price:{
        fixed:{
            type:Types.Boolean,
            default: false
        },
        count:{
            type:Types.Number,
            default:0
        }
    },
    date: {
        type: Types.Date,
        default: Date.now()
    }
})

resume.defaultColumns = 'vacancies_name, must_be, price, date';
resume.register();


const partners = new keystone.List('Partners', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

partners.add({
    companyName:{
        type:Types.Text,
        default:null
    },
    logoLink:{
        type:Types.Text,
        default: null
    }
})

partners.defaultColumns = 'companyName, logoLink';
partners.register();



const order = new keystone.List('Orders', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

order.add({
    email:{
        type:Types.Email,
        require:true
    },
    feedback:{
        type:Types.Text,
        require:true
    },
    phone:{
        type:Types.Number,
        require:true
    },
    type:{
        type:Types.Text,
        require:true
    }
})

order.defaultColumns = 'email, feedback, phone, type';
order.register();



const FeedBack = new keystone.List('Feedback_vacancies', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

FeedBack.add({
    name:{
        type:Types.Name,
        require:true
    },
    email:{
        type:Types.Email,
        require: true
    },
    date:{
        type:Types.Date,
        default:new Date()
    },
    text:{
        type:Types.Text,
        default: null
    },
    lastName:{
        type:Types.Name,
        require:true
    },
    vacancies:{
        type:Types.Text,
        require:true
    }
})

FeedBack.defaultColumns = 'email, feedback, phone, type';
FeedBack.register();


const responsive = new keystone.List('Responsive', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

responsive.add({
    url:{
        type:Types.Text,
        require:true
    }
})

responsive.defaultColumns = 'url';
responsive.register();



module.exports = User