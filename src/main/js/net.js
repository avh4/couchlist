'use strict';

var request = require('browser-request');
var q = require('q');

module.exports = {
  post: function(url, body) {
    var p = q.defer();
    request({method: 'POST', url: url, body: body, json: true}, function(err, res, body) {
      p.resolve();
    });
    return p.promise;
  }
};