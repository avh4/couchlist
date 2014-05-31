/** @jsx React.DOM */

var ReactTest = require('./ReactTest');
var expect = require('chai').expect;
ReactTest.initDOM();

describe('Label', function() {
  it('displays the provided message', function() {
    var Label = require('../../main/js/Label');
    var $ = require('cheerio').load(ReactTest.renderString(<Label>Hello World</Label>));
    expect($('p').text()).to.equal('Hello World');
  });
});