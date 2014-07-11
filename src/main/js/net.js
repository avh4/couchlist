'use strict';

var request = require('browser-request');
var q = require('q');

module.exports = {
  get: function(url) {
    var p = q.defer();
    request(url, function(err, res, body) {
      p.resolve(body);
    });
    return p.promise;
  },
  post: function(url, body) {
    var p = q.defer();
    request({method: 'POST', url: url, body: body, json: true}, function(err, res, body) {
      p.resolve();
    });
    return p.promise;
  }
};