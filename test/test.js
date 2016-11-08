var chai = require('chai');
var expect = require('chai').expect;
var calculate = require('../js/calculate.js').calculate;

describe('calculate', function(){
  it('creates a payslip', function(){
    expect(calculate(response)).to.equal('HELLO WORLD');
  });
});
