var googleapis = require('googleapis');
var OAuth2 = googleapis.auth.OAuth2;

var secret = require('./client_secret_723963848580-6t1oqvmcudb282l596quomin7rfhp9n1.apps.googleusercontent.com.json').installed;
var credentials = require('./credentials.json');

var oauth2Client = new OAuth2(secret.client_id, secret.client_secret, 'urn:ietf:wg:oauth:2.0:oob');

var db = require('../src/main/js/db');
var net = require('./net');

function insertThread(thread) {
  var subject = thread.messages[0].payload.headers.filter(function(h) { return h.name === 'Subject'} )[0].value;
  var doc = thread;
  delete doc.messages[0].payload.body;
  delete doc.messages[0].payload.parts;
  doc._id = 'couchlist:gmail:thread:' + thread.id;
  doc['couchlist:description'] = 'subject';

  net.post(db, doc);
}

function processThread(client, threadId) {
  client.gmail.users.threads.get({
    userId: 'me',
    id: threadId
  }).withAuthClient(oauth2Client).execute(function(err, res) {
    insertThread(res);
  });
}

function go() {
  googleapis.discover('gmail', 'v1')
    .execute(function(err, client) {
      client.gmail.users.threads.list({ userId: 'me', q: 'in:inbox' })
      .withAuthClient(oauth2Client).execute(function(err, res) {
        res.threads.forEach(function(thread) {
          processThread(client, thread.id);
        });
      });
    });
}

if (credentials.refresh_token) {
  oauth2Client.credentials = credentials;
  go();
} else {
  var scopes = [
    'https://www.googleapis.com/auth/gmail.readonly'
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes.join(" ") // space delimited string of scopes
  });

  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log(url);
  rl.question("What do you think of node.js? ", function(answer) {
    oauth2Client.getToken(answer, function(err, tokens) {
      console.log(err);
      console.log(tokens);
      oauth2Client.credentials = tokens;
      go();
    });
  });
}
