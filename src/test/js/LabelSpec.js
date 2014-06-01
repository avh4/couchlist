/** @jsx React.DOM */

var ReactTest = require('./ReactDomTest');
var expect = require('chai').expect;
var Label = require("../../main/js/Label");

describe("Label Test", function() {
  var subject;

  beforeEach(function(done) {
    ReactTest.reset(done);
  });

  it("Check Text Assignment", function() {
    subject = ReactTest.render(<Label>Some Text We Need for Test</Label>);
    expect($(subject).find('p').text()).to.equal("Some Text We Need for Test");
  });

  it("Click", function () {
    var label = ReactTest.render(<Label>Some Text We Need to Test</Label>);

    ReactTest.click(subject, 'p');
    expect($(subject).find('p').text()).to.equal("Text After Click");
  });
});
