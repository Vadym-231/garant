const mongose = require('mongoose')


class Mongo {
    constructor(url,db) {
        this.connection(url+db)
        this.url=url;
        this.db=db;
    }
    async connection(url){
        await mongose.connect(url, {useNewUrlParser: true})
            .then(() => {
                console.log('Connection good by ', url)
            })
            .catch(err => {
                console.log(err)
            })
        this.conn = mongose.connection;
    }
    insertData(database_model, json) {
        const result = new database_model(json);
        return result.save()
    }
    disconnect(){
        return mongose.disconnect()
    }
    deleteById(model,id){
        return  model.find({_id:id}).remove().exec()
    }
    switchDataBase(db_name){
        // mongose.disconnect();
        this.connection(this.url+db_name);
    }
    getDataByInform(model,plus=null,minus=null,sortByDate=false,sortByUsername=false){
        if(sortByUsername){
            return  model.find(plus,minus).then(data=>{
                return data;
            })
        }
        if(sortByDate){
            return  model.find(plus,minus).sort({date: -1}).then(data=>{
                return data;
            })
        }
        else {
            return model.find(plus,minus).then(data=>{
                return data
            });
        }
    }
}


module.exports = {Mongo}