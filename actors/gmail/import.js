module.exports = function(googleapis, authClient, itemStore) {
  function insertThread(thread) {
    var doc = {
      _id: 'couchlist:gmail:thread:' + thread.id,
      source: thread,
      'couchlist:type': 'gmail',
      'couchlist:pending': true
    };

    console.log('gmail/import:', doc._id);
    itemStore.put(doc);
  }
  
  return function() {
    googleapis.discover('gmail', 'v1')
    .execute(function(err, client) {
      client.gmail.users.threads.list({ userId: 'me', q: 'in:inbox' })
      .withAuthClient(authClient).execute(function(err, res) {
        res.threads.forEach(function(thread) {
          insertThread(thread);
        });
      });
    });
  };
};
