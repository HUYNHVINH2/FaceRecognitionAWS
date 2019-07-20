const aws = require('aws-sdk');
let express = require('express');
var bodyParser  = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
var port = process.env.PORT || 8080;
const fs = require('fs');
aws.config.update({region:'us-east-1'});
var rekognition = new aws.Rekognition({
  apiVersion: '2016-06-27'
});
app.listen(port, function () {
  console.log('working in ' + port);
})
app.get('/',async(req, res) =>{
  res.render('home');
 })
app.post('/detectLabels',async(req, res) =>{
  var ImageName = req.body.fileName;
  console.log(ImageName)
  fs.readFile(`./${ImageName}`, 'base64', (err, data) => {
    const buffer = new Buffer(data, 'base64');
    rekognition.detectLabels({
        Image: {
          Bytes: buffer
        }
      }).promise()
      .then((result) => {
        res.json({ data:result });
        console.log(result);
      });
  });
 })
// fs.readFile('./image.jpg', 'base64', (err, data) => {
//   const buffer = new Buffer(data, 'base64');
//   rekognition.detectLabels({
//       Image: {
//         Bytes: buffer
//       }
//     }).promise()
//     .then((res) => {
//       console.log(res);

//     });

// });