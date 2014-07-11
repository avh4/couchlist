'use strict';

var q = require('q');
var request = require('superagent');

module.exports = {
  post: function(url, body) {
    var p = q.defer();
    request.post(url).send(body).end(function(err, res) {
      p.resolve(res);
    });
    return p.promise;
  }
};