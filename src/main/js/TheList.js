/** @jsx React.DOM */

"use strict";

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <ul className="list-group">
    <li className="list-group-item"><span className="glyphicon glyphicon-star"></span>Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Morbi leo risus</li>
    <li className="list-group-item">Porta ac consectetur ac</li>
    <li className="list-group-item">Vestibulum at eros</li>
  </ul>;
  }
});
