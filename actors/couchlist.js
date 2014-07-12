var net = require('./net');
var db = require('../src/main/js/db');

module.exports = {
  put: function(doc) {
    net.post(db, doc);
  }
}