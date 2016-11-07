
// Problem: Employee monthly payslip
//
// When I input the employee's details: first name, last name, annual salary (positive integer) and super rate(0% - 50% inclusive), payment start date, the program should generate payslip information with name, pay period,  gross income, income tax, net income and super.
//
// The calculation details will be the following:
// •       pay period = per calendar month
// •       gross income = annual salary / 12 months
// •       income tax = based on the tax table provide below
// •       net income = gross income - income tax
// •       super = gross income x super rate
//
// Notes: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar increment, otherwise round down.
//
// The following rates for 2012-13 apply from 1 July 2012.
//
// Taxable income   Tax on this income
// 0 - $18,200     Nil
// $18,201 - $37,000       19c for each $1 over $18,200
// $37,001 - $80,000       $3,572 plus 32.5c for each $1 over $37,000
// $80,001 - $180,000      $17,547 plus 37c for each $1 over $80,000
// $180,001 and over       $54,547 plus 45c for each $1 over $180,000
//
// The tax table is from ATO: http://www.ato.gov.au/content/12333.htm
//
// Example Data
// Employee annual salary is 60,050, super rate is 9%, how much will this employee be paid for the month of March ?
// •       pay period = Month of March (01 March to 31 March)
// •       gross income = 60,050 / 12 = 5,004.16666667 (round down) = 5,004
// •       income tax = (3,572 + (60,050 - 37,000) x 0.325) / 12  = 921.9375 (round up) = 922
// •       net income = 5,004 - 922 = 4,082
// •       super = 5,004 x 9% = 450.36 (round down) = 450
//
// Here is the csv input and output format we provide. (But feel free to use any format you want)
//
// Input (first name, last name, annual salary, super rate (%), payment start date):
// David,Rudd,60050,9%,01 March – 31 March
// Ryan,Chen,120000,10%,01 March – 31 March
//
// Output (name, pay period, gross income, income tax, net income, super):
// David Rudd,01 March – 31 March,5004,922,4082,450
// Ryan Chen,01 March – 31 March,10000,2696,7304,1000
//
// As part of your solution:
// •       List any assumptions that you have made in order to solve this problem.
// •       Provide instruction on how to run the application
// •       Provide a test harness to validate your solution.



var csv = null;


$(document).ready(function() {

    // The event listener for the file upload
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');

        } else {
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                var csvData = event.target.result;

                processInput(csvData); //Call ProcessInput
            };
            reader.onerror = function() {
                alert('Unable to read ' + file.fileName);
            };
        }
    }


    $("#display").on('click', function(){
        console.log(csv);
        if (csv === null) {
            alert("Please upload a csv file");
        }else {
            var build = '<table border="1" cellpadding="2" cellspacing="0">\n';
        	var rows = csv.split("\n");
        	rows.forEach( function getvalues(thisRow) {
            	build += "<tr>\n";
            	var columns = thisRow.split(",");
            	for(var i=0;i<columns.length;i++){ build += "<td>" + columns[i] + "</td>\n"; }
            	build += "</tr>\n";
            });
        	build += "</table>";
        	$('.payslip').append(build);
        }
        var displayCurrency = function(key, value){

            var $tr = $("<tr></tr>");
            $("table").append($tr);
            var $tdKey = $("<td></td>").append(key);
            $tr.append($tdKey);
            var $tdValue = $("<td></td>").append(value);
            $tr.append($tdValue);

        };
    });


    $("#download").on('click', function(){

        if (csv === null) {
            alert("Please upload a csv file");
        }else {

            var a = document.createElement('a');
            a.href = 'data:attachment/csv,' +  encodeURIComponent(csv);
            a.target = '_blank';
            a.download = 'payslip.csv';

            document.body.appendChild(a);
            a.click();
        }
    });

});


function processInput(response) {

    var allTextLines = response.split(/\r\n|\n/);

    var headers = allTextLines[0].split(',');

    var input = [];

    for (var i = 1; i < allTextLines.length; i++) {

        var data = allTextLines[i].split(',');

        if (data.length == headers.length) {
            var lines = [];
            for (var j = 0; j < headers.length; j++) {
                var line = [ headers[j], data[j] ];
                lines.push(line);
            }
            // console.log(lines);
            input.push(lines);
        }
    }

    createOutput(input);
}


function createOutput(data){
    console.log(data);
    var output = [];

    for (var i = 0; i < data.length; i++) {
        var array = data[i];
        var newObj = {};

        var annualSalary = parseInt(array[2][1]);
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

        newObj.name = array[0][1] + " " + array[1][1];
        newObj["pay period"] = array[4][1];
        newObj["gross income"] = Math.round( annualSalary /12);
        newObj["income tax"] = Math.round(tax/12);
        newObj["net income"] = newObj["gross income"] - newObj["income tax"];
        newObj["super"] = Math.round(newObj["gross income"] * parseFloat(array[3][1])/100);

        output.push(newObj);
    }
    processOutput(output);
}


function processOutput(data){

    csv = Object.keys(data[0]).join(",") + '\r\n';

    for (var i = 0; i < data.length; i++) {
        var line = '';
        for (var index in data[i]) {
            line += data[i][index];
            if(line !== ''){
                line += ',';
            }
        }
        csv += line + '\r\n';
    }
}
