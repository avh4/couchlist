var googleapis = require('googleapis');
var OAuth2 = googleapis.auth.OAuth2;

var secret = require('./client_secret_723963848580-6t1oqvmcudb282l596quomin7rfhp9n1.apps.googleusercontent.com.json').installed;
var credentials = require('./credentials.json');

var oauth2Client = new OAuth2(secret.client_id, secret.client_secret, 'urn:ietf:wg:oauth:2.0:oob');

if (credentials.refresh_token) {
  oauth2Client.credentials = credentials;
  module.exports = oauth2Client;
} else {
  throw "Need to get new credentials";
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
    });
  });
}
