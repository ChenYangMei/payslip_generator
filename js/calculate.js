
exports.calculate = function(response) {
  var outputArray = [];

  for (var i = 1; i < response.length; i++) {
    var array = response[i];
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

    outputArray.push(newObj);
  }

  var output = JSON.stringify(outputArray);
  return output;

};
