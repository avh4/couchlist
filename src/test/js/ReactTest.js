'use strict';

require('./ReactDomTest');
var React = require('react');
var cheerio = require('cheerio');

exports.render = function(component) {
  return cheerio.load(React.renderComponentToString(component));
}
