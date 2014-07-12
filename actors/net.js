'use strict';

var q = require('q');
var request = require('superagent');

module.exports = {
  post: function(url, body) {
    var p = q.defer();
    request.post(url)
    .set('Accept', 'application/json')
    .send(body).end(function(err, res) {
      p.resolve(res);
    });
    return p.promise;
  },
  put: function(url, body) {
    var p = q.defer();
    request.put(url)
    .set('Accept', 'application/json')
    .send(body).end(function(err, res) {
      p.resolve(res);
    });
    return p.promise;
  },
  head: function(url) {
    var p = q.defer();
    request.head(url)
    .end(function(err, res) {
      p.resolve(res);
    });
    return p.promise;
  },
  get: function(url) {
    var p = q.defer();
    request.get(url)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      p.resolve(res);
    });
    return p.promise;
  }
};