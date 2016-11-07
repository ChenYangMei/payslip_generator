var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var csv = require('csv-parse');
var fs = require('fs');

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
      // console.log(array);
      calculate(array);
    });


  calculate = function(response) {

    var output = [];

    for (var i = 1; i < response.length; i++) {
      var array = response[i];
      console.log(array);
      var newObj = {};

      var annualSalary = parseInt(array[2]);
      var tax;

      if (annualSalary <= 18200) {
          tax = null;
      }else if (annualSalary > 18200 && annualSalary <= 37000) {
          tax = (annualSalary - 18200) * 0.19;
      }else if (annualSalary > 37000 && annualSalary <= 80000) {
          tax = 3572 + (annualSalary - 37000) * 0.325;
      }else if (annualSalary > 80000 && annualSalary <= 180000) {
          tax = 17547 + (annualSalary - 80000) * 0.37;
      }else if (annualSalary > 180000) {
          tax = 54547 + (annualSalary - 180000) * 0.45;
      }

      newObj.name = array[0] + " " + array[1];
      newObj["pay period"] = array[4];
      newObj["gross income"] = Math.round( annualSalary /12);
      newObj["income tax"] = Math.round(tax/12);
      newObj["net income"] = newObj["gross income"] - newObj["income tax"];
      newObj["super"] = Math.round(newObj["gross income"] * parseFloat(array[3])/100);

      output.push(newObj);
    }

    var csv = Object.keys(output[0]).join(",") + '\r\n';

    for (var j = 0; j < output.length; j++) {
        var line = '';
        for (var index in output[j]) {
            line += output[j][index];
            if(line !== ''){
                line += ',';
            }
        }
        csv += line + '\r\n';
    }

      res.send(csv);
  };

});


app.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
