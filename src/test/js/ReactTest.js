"use strict";

var React, ReactTestUtils;
var jsdom = require('jsdom').jsdom;

exports.initDOM = function() {
  var jsdom = require('jsdom');
  global.window = jsdom.jsdom().createWindow('<html><body></body></html>');
  global.document = window.document;
  global.navigator = window.navigator;

  React = require("react/addons"),
  ReactTestUtils = React.addons.TestUtils;
}

exports.cleanDOM = function() {
  delete global.window;
  delete global.document;
  delete global.navigator;
  React = undefined;
  ReactTestUtils = undefined;
}

exports.render = function(component) {
  return ReactTestUtils.renderIntoDocument(component);
}

exports.click = function(component) {
  ReactTestUtils.Simulate.click(component.getDOMNode());
}
