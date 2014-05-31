/** @jsx React.DOM */

var ReactTest = require('./ReactTest');
var expect = require('chai').expect;
var Label = require("../../main/js/Label");

describe("Label Test", function() {
  beforeEach(function() {
    ReactTest.resetDOM();
  });

  it("Check Text Assignment", function() {
    var label = ReactTest.render(<Label>Some Text We Need
      for Test</Label>);
    expect(label.refs.p.props.children).to.equal("Some Text We Need for Test");
  });

  it("Click", function () {
    var label = ReactTest.render(<Label>Some Text We Need to Test</Label>);

    ReactTest.click(label.refs.p);
    expect(label.refs.p.props.children).to.equal("Text After Click");
  });
});
