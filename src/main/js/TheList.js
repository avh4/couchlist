/** @jsx React.DOM */

"use strict";

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var items = this.props.items.map(function(i) {
      var doc = i.doc;
      return <li className="list-group-item" key={doc._id}><span className="glyphicon glyphicon-star"></span>{doc['couchlist:description']}</li>;
    });
    return <ul className="list-group">{items}</ul>;
  }
});
