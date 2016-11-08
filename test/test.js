var chai = require('chai');
var expect = require('chai').expect;
var calculate = require('../js/calculate.js').calculate;

describe('calculate', function(){
  var array = [
    ['first name', 'last name', 'annual salary', 'super rate (%)', 'payment start date'],
    [ 'David', 'Rudd', '60050', '9%', '01 March - 31 March' ],
    [ 'Ryan', 'Chen', '120000', '10%', '01 March - 31 March' ]
  ];

  it('should creates a json string version of payslip', function(){
    expect(calculate(array)).to.equal(
      '[{"name":"David Rudd","pay period":"01 March - 31 March","gross income":5004,"income tax":922,"net income":4082,"super":450},{"name":"Ryan Chen","pay period":"01 March - 31 March","gross income":10000,"income tax":2696,"net income":7304,"super":1000}]'
    );
  });
});
