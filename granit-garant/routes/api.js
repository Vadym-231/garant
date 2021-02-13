var express = require('express');
var router = express.Router();
const {Mongo} = require('../src/Mongo/MongoClass')
const db_config = require('../src/Mongo/database.json')
const tempJson = require('../src/about_us.json')
const partners = require('../src/Mongo/mongo_model/partners_list')
const resume  = require('../src/Mongo/mongo_model/resume_model')
const vacansies = require('../src/Mongo/mongo_model/vacancies_feedback')
const order = require('../src/Mongo/mongo_model/makeOrder')
const responsive = require('../src/Mongo/mongo_model/responsive')






/* GET api request. */

const mongo = new Mongo(db_config.ConnectUrl,'');



router.get('/getResponsive',async (req, res) => {

   try{
       let data= await mongo.getDataByInform(responsive,{})
       res.status(200).send(JSON.stringify(data))
   }catch (e) {
       res.status(403).send()
       console.log(e)
   }

})
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
