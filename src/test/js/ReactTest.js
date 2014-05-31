"use strict";

var jsdom = require('jsdom').jsdom;

exports.initDOM = function() {
  var jsdom = require('jsdom');
  global.window = jsdom.jsdom().createWindow('<html><body></body></html>');
  global.document = window.document;
  global.navigator = window.navigator;
}

exports.cleanDOM = function() {
  delete global.window;
  delete global.document;
  delete global.navigator;
}

exports.initDOM();
var React = require("react/addons");
var ReactTestUtils = React.addons.TestUtils;
exports.cleanDOM();

exports.render = function(component) {
  return ReactTestUtils.renderIntoDocument(component);
}

exports.renderString = function(component) {
  return React.renderComponentToString(component);
}

exports.click = function(component) {
  ReactTestUtils.Simulate.click(component.getDOMNode());
}
