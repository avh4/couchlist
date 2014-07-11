/** @jsx React.DOM */

"use strict";

var React = require('react');
var TheList = require('./TheList');

var request = require('browser-request');



module.exports = React.createClass({
  getInitialState: function() {
    return { items: [] };
  },
  componentDidMount: function() {
    request('http://localhost:5984/couchlist-dev/_all_docs?include_docs=true', function(err, res, body) {
      this.setState({items: JSON.parse(body).rows});
    }.bind(this));
  },
  render: function() {
    return <TheList items={this.state.items}/>;
  }
});
