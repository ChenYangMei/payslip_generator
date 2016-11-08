var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var csv = require('csv-parse');
var fs = require('fs');
var calculate = require('./calculate.js').calculate;

var upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/upload", upload.single('myfile'), function (req, res, next) {

  var file = req.file;
  var array = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", function(data){
      // console.log(data);
      array.push(data);

    }).on("end", function(){

      res.send(calculate(array));
    });

});

app.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
