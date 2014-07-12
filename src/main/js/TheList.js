/** @jsx React.DOM */

"use strict";

var React = require('react');
var db = require('./db');
var net = require('./net');

module.exports = React.createClass({
  doAdd: function() {
    var text = this.refs.addField.getDOMNode().value;
    var doc = { 'couchlist:description': text };
    net.post(db, doc);
    this.refs.addField.getDOMNode().value = '';
    return false;
  },
  render: function() {
    var items = this.props.items.map(function(i) {
      var doc = i.doc;
      var icon;
      if (doc['couchlist:type'] === 'gmail') {
        icon = <span className="glyphicon glyphicon-envelope"></span>;
      }
      return <li className="list-group-item" key={doc._id}>{icon} {doc['couchlist:description']}</li>;
    });
    return <ul className="list-group">{items}
    <li className="add list-group-item"><form onSubmit={this.doAdd}><input ref="addField" placeholder="New Item" className="form-control"/></form></li>
    </ul>;
  }
});
