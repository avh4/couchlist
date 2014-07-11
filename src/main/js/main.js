/** @jsx React.DOM */

"use strict";

var React = require('react');
var couchlist = require('./couchlist');

React.renderComponent(<couchlist/>, document.getElementById('root'));
