var express = require('express');
var router = express.Router();
const path = require('path')
const {fileGetter} = require('../src/File Getter/file_geter')
const error_logger = require('../src/logger')




/* GET home page. */

router.get('/fonts/:font',(req, res) => {
  try {
    const result = req.params.replace(new RegExp('.', 'g'),' ');
    res.download(path.join(__dirname, '../public/fonts/${result}'));
  }catch (err) {
    error_logger.error(err);
    res.status(404).end();
  }
})
router.get('/images/:image',(req, res) => {
  try {
    const result = req.params.replace(new RegExp('.', 'g'),' ');
    res.download(path.join(__dirname, '../public/images/${result}'));
  }catch (err) {
    error_logger.error(err);
    res.status(404).end();
  }
})

router.get('/getResume',(req, res) => {
  res.download(path.join(__dirname,'../public/res.pdf'));
  return;
})
//__dirname,'../src/bundle.js'path.join('C:\\Users\\Вадим\\WebstormProjects\\portfolio_react\\dist\\bundle.js'
router.get('/bundle', function(req, res) {
  try {
    fileGetter(res,path.join(__dirname,'../src/bundle.js'),'text/javascript').pipe(res)
  }catch (e) {
    console.log(e)

  }
  return;
});

router.get(RegExp(/^\/.*/),((req, res) => {
  fileGetter(res,path.join(__dirname,'../public/index.html'),'text/html').pipe(res)
}))

module.exports = router;
