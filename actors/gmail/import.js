var q = require('q');

module.exports = function(googleapis, authClient, itemStore) {
  function insertThread(thread) {
    var id = 'couchlist:gmail:thread:' + thread.id;
    return itemStore.get(id).then(function(doc) {
      if (!doc) {
        doc = {
          _id: id,
          source: thread,
          'couchlist:type': 'gmail'
        };
      }
      doc['couchlist:completed'] = false;
      console.log('gmail/import:', id);
      itemStore.put(doc);
    });
  }
  
  function getClient() {
    var p = q.defer();
    googleapis.discover('gmail', 'v1')
    .execute(function(err, client) {
      p.resolve(client);
    });
    return p.promise;
  }
  
  function fetchThreads(client) {
    var p = q.defer();
    client.gmail.users.threads.list({ userId: 'me', q: 'in:inbox' })
    .withAuthClient(authClient).execute(function(err, res) {
      p.resolve(res);
    });
    return p.promise;
  }
  
  return function() {
    return getClient().then(function(client) {
      return fetchThreads(client).then(function(res) {
        var promises = res.threads.map(function (thread) {
          return insertThread(thread);
        });
        return q.all(promises);
      });
    });
  };
};
