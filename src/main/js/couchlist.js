/** @jsx React.DOM */

"use strict";

var React = require('react');
var TheList = require('./TheList');

var request = require('browser-request');

var changes = require('./couchdb/changes')('http://localhost:5984/couchlist-dev');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentDidMount: function() {
    changes.longpoll(function() {
      request('http://localhost:5984/couchlist-dev/_all_docs?include_docs=true',
        function(err, res, body) {
          this.setState({
            items: JSON.parse(body).rows
          });
        }.bind(this));
    }.bind(this));
  },
  render: function() {
    return <TheList items={this.state.items}/>;
  }
});
