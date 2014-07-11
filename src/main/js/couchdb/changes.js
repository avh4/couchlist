'use strict';

var request = require('browser-request');

module.exports = function(db_url) {
  var since = 0;

  function longpoll(callback) {
    console.log('couchdb/changes: Long Polling: ' + since);
    request(db_url + '/_changes?feed=longpoll&since=' + since,
      function(err, res, body) {
        var b = JSON.parse(body);
        since = b.last_seq;
        callback();
        setTimeout(longpoll.bind(null, callback));
      });
  }
  return {
    longpoll: longpoll
  }
}
