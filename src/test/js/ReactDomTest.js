'use strict';

var jsdom = require('jsdom').jsdom;

exports.reset = function(done) {
  var doc = jsdom('<html><body></body></html>');
  global.window = doc.parentWindow;
  global.document = window.document;
  global.navigator = window.navigator;
  global.$ = undefined;
  if (done) {
    jsdom.jQueryify(doc.parentWindow, "../../../node_modules/jquery/dist/jquery.js", function () {
      done();
    });
  }
}

exports.reset();
var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;

exports.render = function(component) {
  var div = document.createElement('div');
  React.renderComponent(component, div);
  global.$ = function(selector) {
    return window.$(div).find(selector);
  }
  return div;
}

exports.click = function(selector) {
  ReactTestUtils.Simulate.click($(selector).get(0));
}

exports.input = function(selector, value) {
  var target = $(selector).get(0);
  ReactTestUtils.Simulate.change(target, { target: { value: value }});
}

exports.mock = function(subject, componentNameToMock) {
  if (typeof subject.__set__ != 'function') {
    throw new Error('ReactTest.mock subjects must use rewire');
  }
  var mock = React.createClass({
    render: function() {
      return React.DOM.div({id: componentNameToMock}, JSON.stringify(this.props));
    }
  });
  subject.__set__(componentNameToMock, mock);
}

exports.mock.props = function(element) {
  return JSON.parse(element.text());
}
