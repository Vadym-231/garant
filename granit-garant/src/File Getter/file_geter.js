const fs = require('fs')
const error_logger = require('../logger')
function fileGetter(res,PathStr,type){
    try {
        if (type !== 'img') {
            res.writeHead(200, {'Content-Type': type + '; charset=utf-8'});
            return fs.createReadStream(PathStr, 'utf-8');//(__dirname+PathStr,'utf-8');
        } else {
            fs.readFile(PathStr, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    res.send(data);
                }
            })
        }
    }
    catch (error) {
        error_logger.error(error);
    }
}
module.exports = {fileGetter};