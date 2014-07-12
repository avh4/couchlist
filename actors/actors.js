var net = require('./net');
var db = require('../src/main/js/db');
var couchlist = require('./couchlist')(net, db);

var gmail = require('./gmail/index');

module.exports = { 
  start: function() {
    var g = gmail(couchlist);
    g.import();
    g.update();
  } 
};