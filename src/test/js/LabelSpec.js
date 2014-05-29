/** @jsx React.DOM */

"use strict";

var React,
  ReactTestUtils;
var Label;
var assert = require("assert");
var jsdom = require('jsdom').jsdom;

global.initDOM = function() {
  var jsdom = require('jsdom');
  global.window = jsdom.jsdom().createWindow('<html><body></body></html>');
  global.document = window.document;
  global.navigator = window.navigator;

  React = require("react/addons"),
  ReactTestUtils = React.addons.TestUtils;
  Label = require("../../main/js/Label");

}

global.cleanDOM = function() {
  delete global.window;
  delete global.document;
  delete global.navigator;
}

describe("Label Test", function() {

  beforeEach(function() {
    initDOM();
  });

  afterEach(function() {
    cleanDOM();
  });

  it("Check Text Assignment", function() {
    var label = ReactTestUtils.renderIntoDocument( <Label>Some Text We Need for Test</Label>);
      assert.equal(label.refs.p.props.children, "Some Text We Need for Test");
    });

    it("Click", function () {
      var label = ReactTestUtils.renderIntoDocument(<Label>Some Text We Need to Test</Label > );

    ReactTestUtils.Simulate.click(label.refs.p.getDOMNode());
    assert.equal(label.refs.p.props.children, "Text After Click");
  });
});
