var net = require('./net');
var db = require('../src/main/js/db');
var itemStore = require('./itemStore')(net, db);

var gmail = require('./gmail/index');
var github = { import: require('./github/import')(itemStore) };

module.exports = { 
  start: function() {
    gmail(itemStore).then(function(g) {
      g.import();
      g.update();
    });
    github.import();
  } 
};