'use strict';

var jsdom = require('jsdom').jsdom;

exports.reset = function(done) {
  var doc = jsdom('<html><body></body></html>');
  global.window = doc.parentWindow;
  global.document = window.document;
  global.navigator = window.navigator;
  if (done) {
    jsdom.jQueryify(doc.parentWindow, "../../../node_modules/jquery/dist/jquery.js", function () {
      global.$ = window.$;
      done();
    });
  } else {
    global.$ = undefined;
  }
}

exports.reset();
var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;

exports.render = function(component) {
  var div = document.createElement('div');
  React.renderComponent(component, div);
  return div;
}

exports.click = function(subject, selector) {
  ReactTestUtils.Simulate.click($(subject).find(selector).get(0));
}
