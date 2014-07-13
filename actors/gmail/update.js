var q = require('q');

var log = {
  err: function() {
    console.log('ERR', 'gmail/update:', arguments);
  },
  info: function() {
    console.log('INF', 'gmail/update:', arguments);
  },
  debug: function() {
    console.log('DBG', 'gmail/update:', arguments);
  }
}

module.exports = function(googleapis, authClient, couchlist) {
  function getClient() {
    var p = q.defer();
    googleapis.discover('gmail', 'v1')
    .execute(function(err, client) {
      p.resolve(client);
    });
    return p.promise;
  }
  
  function objFor(obj, fn) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn(key, obj[key]);
      }
    }
  }
  
  return function() {
    getClient().then(function(client) {
      couchlist.get().then(function(items) {
        objFor(items, function(itemId, item) {
          if (item['couchlist:completed']) return;
          if (!item.source) return;
          var threadId = item.source.id;
          client.gmail.users.threads.get({userId: 'me', id: threadId, fields: 'messages(labelIds,payload)'})
          .withAuthClient(authClient).execute(function(err, thread) {
            if (err) {
              log.err(threadId, err.code, err.message);
            } else {
              var subject = thread.messages[0].payload.headers.filter(function(h) { return h.name === 'Subject'} )[0].value;
              item['couchlist:completed'] = true;
              item['couchlist:description'] = subject;
              item['couchlist:pending'] = false;
              for (var i = 0; i < thread.messages.length; i++) {
                if (thread.messages[i].labelIds.indexOf('INBOX') != -1) {
                  item['couchlist:completed'] = false;
                }
              }
            
              log.info(threadId, 'COMPLETED');
              couchlist.put(item);
            }
          });
        });
      }).done();
    }).done();
  };
};
