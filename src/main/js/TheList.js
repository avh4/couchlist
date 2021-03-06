/** @jsx React.DOM */

"use strict";

var React = require('react');
var db = require('./db');
var net = require('./net');

module.exports = React.createClass({
  doAdd: function() {
    var text = this.refs.addField.getDOMNode().value;
    var doc = { 'couchlist:description': text, 'couchlist:type': 'text' };
    net.post(db, doc);
    this.refs.addField.getDOMNode().value = '';
    return false;
  },
  render: function() {
    var items = this.props.items.map(function(i) {
      var doc = i.doc;
      if (!doc['couchlist:type']) return null;
      if (doc['couchlist:completed']) return null;
      var icon;
      if (doc['couchlist:type'] === 'gmail') {
        icon = <i className="fa fa-envelope"></i>;
      } else if (doc['couchlist:type'] === 'github:issue') {
        icon = <i className="fa fa-github-alt"></i>;
      }
      
      var project;
      if (doc['couchlist:project']) {
        project = <span className="text-muted">{doc['couchlist:project']}</span>;
      }
      
      if (!doc['couchlist:description']) {
        return <li className="list-group-item" key={doc._id}><i className="text-muted">{icon} {doc._id}</i></li>;
      } else {
        return <li className="list-group-item" key={doc._id}>{icon} {project} {doc['couchlist:description']}</li>;
      }
    });
    return <ul className="list-group">{items}
    <li className="add list-group-item"><form onSubmit={this.doAdd}><input ref="addField" placeholder="New Item" className="form-control"/></form></li>
    </ul>;
  }
});
