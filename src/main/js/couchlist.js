/** @jsx React.DOM */

"use strict";

var React = require('react');
var TheList = require('./TheList');

var request = require('browser-request');

var since = 0;

function poll(callback) {
  console.log('Polling: ' + since);
  request('http://localhost:5984/couchlist-dev/_changes?feed=longpoll&since=' + since,
    function(err, res, body) {
      var b = JSON.parse(body);
      since = b.last_seq;
      callback();
      setTimeout(poll.bind(null, callback));
    });
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentDidMount: function() {
    poll(function() {
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
