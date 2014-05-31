/** @jsx React.DOM */

var ReactTest = require('./ReactTest');
var expect = require('chai').expect;
var Label = require('../../main/js/Label');

describe('Label', function() {
  it('displays the provided message', function() {
    var $ = ReactTest.render(<Label>Hello World</Label>);
    expect($('p').text()).to.equal('Hello World');
  });
});