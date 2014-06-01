'use strict';

require('./ReactDomTest');
var React = require('react');
var cheerio = require('cheerio');

exports.render = function(component) {
  return cheerio.load(React.renderComponentToString(component));
}

exports.mock = function(subject, componentNameToMock) {
  var mock = React.createClass({
    render: function() {
      return React.DOM.div({id: componentNameToMock}, JSON.stringify(this.props));
    }
  });
  subject.__set__(componentNameToMock, mock);
}
