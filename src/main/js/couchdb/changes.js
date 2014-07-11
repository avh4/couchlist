'use strict';

var net = require('../net');

module.exports = function(db_url) {
  var since = 0;

  function longpoll(callback) {
    console.log('couchdb/changes: Long Polling: ' + since);
    net.get(db_url + '/_changes?feed=longpoll&since=' + since)
    .then(function(body) {
      var b = JSON.parse(body);
      since = b.last_seq;
      callback();
      setTimeout(longpoll.bind(null, callback));
    })
  }
  return {
    longpoll: longpoll
  }
}
