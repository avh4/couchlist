module.exports = function(googleapis, authClient, couchlist) {
  function insertThread(thread) {
    var subject = thread.messages[0].payload.headers.filter(function(h) { return h.name === 'Subject'} )[0].value;
    var doc = thread;
    delete doc.messages[0].payload.body;
    delete doc.messages[0].payload.parts;
    doc._id = 'couchlist:gmail:thread:' + thread.id;
    doc['couchlist:description'] = subject;
    doc['couchlist:type'] = 'gmail';

    console.log('gmail/import:', doc._id, subject);
    couchlist.put(doc);
  }
  
  function processThread(client, threadId) {
    client.gmail.users.threads.get({
      userId: 'me',
      id: threadId
    }).withAuthClient(authClient).execute(function(err, res) {
      insertThread(res);
    });
  }
  
  return function() {
    googleapis.discover('gmail', 'v1')
      .execute(function(err, client) {
        client.gmail.users.threads.list({ userId: 'me', q: 'in:inbox' })
        .withAuthClient(authClient).execute(function(err, res) {
          res.threads.forEach(function(thread) {
            processThread(client, thread.id);
          });
        });
      });
  };
};
