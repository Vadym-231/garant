var express = require('express');
var router = express.Router();
const {Mongo} = require('../src/Mongo/MongoClass')
const db_config = require('../src/Mongo/database.json')
const multer  = require("multer");
var fileUpload = require('express-fileupload');
const tempJson = require('../src/about_us.json')
const fs= require('fs')
const path = require('path')
const partners = require('../src/Mongo/mongo_model/partners_list')
const resume  = require('../src/Mongo/mongo_model/resume_model')
const vacansies = require('../src/Mongo/mongo_model/vacancies_feedback')
const order = require('../src/Mongo/mongo_model/makeOrder')





const error_logger = require('../src/logger')

/* GET api request. */

const mongo = new Mongo(db_config.ConnectUrl,'');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body.internalUserID) // YAY, IT'S POPULATED
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage }).single('files');

//router.use(upload.single('file'));

//router.use(fileUpload());
/*

/*data.append('email',this.email.current.value)
data.append('feedback',this.feedback.current.value)
data.append('phone',this.phone.current.value)
data.append('type',this.type.current.value);
*/

router.post('/addOrder',async (req, res) => {
  try {
      await mongo.insertData(order,{
          email:req.body.email,
          feedback:req.body.feedback,
          phone:req.body.phone,
          type:req.body.type
      })

      res.status(200).send()
  }catch (e) {
      res.status(403).send()
  }

})
router.get('/aboutUs',(req,res)=>{
    try {

        res.status(200).send(JSON.stringify(tempJson))
    }catch (e) {
        res.status(403).send(JSON.stringify(tempJson))
        console.log(e)
    }
})

router.get('/getResumes',async (req,res)=>{
    try{

        let result = await mongo.getDataByInform(resume);
        console.log(result)

        res.status(200).send(JSON.stringify(result))

    }catch (e) {
        res.status(404).send()
        console.log(e)
        ///errror
    }
})

router.get('/getPartners',async (req,res)=>{

    try {
        let result = await mongo.getDataByInform(partners)


        res.status(200).send(JSON.stringify(result))
        console.log(result)

    }catch (e) {

        res.status(404).send()
        console.log(e)
        ///errrrrrrrrrrror
    }
})

router.get('/about',async (req, res) => {
    try {
       const result = await mongo.getDataByInform(about_model, null, null, false,false);
       console.log(result)
       res.status(200).end(JSON.stringify(result[0]));
    }catch (e){
        error_logger.error(e);
        res.status(400).send()
    }
})
router.post("/addResume",  async function (req, res,next) {
    try {

        let vacancies = await mongo.getDataByInform(resume,{_id:req.body.id});


        if(Array.isArray(vacancies)&&vacancies.length>0){
          await  mongo.insertData(vacansies,{
                name:req.body.name,
                email:req.body.email,
                lastName:req.body.lastName,
                text:req.body.text,
                vacancies:vacancies[0]. vacancies_name
            })
            res.status(200).send()
            return;
        }

    }catch (e) {
        res.status(401).send()
      console.log(e)

    }

    next();

});

module.exports = router;
