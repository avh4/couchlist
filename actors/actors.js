var gmail = require('./gmail/index')
var couchlist = require('./couchlist');

module.exports = { 
  start: function() {
    gmail(couchlist).import();
  } 
};