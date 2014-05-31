'use strict';

var jsdom = require('jsdom').jsdom;

exports.reset = function() {
  global.window = jsdom().createWindow('<html><body></body></html>');
  global.document = window.document;
  global.navigator = window.navigator;
}

exports.reset();
var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;

exports.render = function(component) {
  return ReactTestUtils.renderIntoDocument(component);
}

exports.click = function(component) {
  ReactTestUtils.Simulate.click(component.getDOMNode());
}
