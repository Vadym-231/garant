const resume = require('./mongo_model/resume_model')
const partners = require('./mongo_model/partners_list')
const {Mongo} = require('./MongoClass')
const db_config = require('./database.json')


const mongo = new Mongo(db_config.ConnectUrl,'')

const resumeCreateOne =async ()=>{

    for (let i=0;i<6;i++){
        let result = await mongo.insertData(resume,{
            vacancies_name:"Security from office",
            must_be:['Middle steps education or more',"You must be cerefully","You must be middle body build or more!"],
            price:{
                fixed:false,
                count:8000
            }})
        console.log(result)
    }

}
const data=[{imgSrc:'https://i.ibb.co/RpyWB2G/image7.jpg'},
    {imgSrc:'https://i.ibb.co/47dC8Nj/image9.jpg'},
    {imgSrc:'https://i.ibb.co/cT1pp2h/image11.jpg'},
    {imgSrc:'https://i.ibb.co/KD3zwLp/image13.jpg'},
    {imgSrc:'https://i.ibb.co/5FwLgpV/image14.jpg'}]
const partnersCreateOne = async ()=>{
    for (let i=0;i<data.length;i++){
        let result = await mongo.insertData(partners,{
            companyName:"That`s company name",
            logoLink:data[i].imgSrc
        })
        console.log(result)
    }
}
partnersCreateOne();


