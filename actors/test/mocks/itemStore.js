var q = require('q');

var items = {};

module.exports = {
  put: function(doc) {
    items[doc._id] = doc;
    return q();
  },
  get: function(id) {
    return q(items[id]);
  },
  getAll: function() {
    return q(items);
  }
}