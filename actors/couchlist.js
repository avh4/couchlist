var q = require('q');

module.exports = function(net, db) {
  return {
    put: function(doc) {
      if (!doc._id) throw new Error('doc._id is required for couchlist.put()');
      var doc_url = db + '/' + doc._id;
      net.put(doc_url, doc).then(function(res) {
        if (res.status === 409) {
          net.head(doc_url).then(function(res) {
            doc._rev = res.headers.etag.replace(/"/g, '');
            console.log("UPDATING REVISION: ", doc._id, doc._rev);
            net.put(doc_url, doc).done();
          }).done();
        }
        return res;
      }).done();
    },
    get: function() {
      return net.get(db + '/_all_docs?include_docs=true').then(function(res) {
        return res.body.rows.map(function(r) {
          return r.doc;
        });
      });
    }
  };
};
