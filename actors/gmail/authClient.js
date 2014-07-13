var q = require('q');
var net = require('../net');
var db = require('../../src/main/js/db');
var googleapis = require('googleapis');
var OAuth2 = googleapis.auth.OAuth2;

module.exports = function() {
  function body(res) { return res.body; }
  var a = net.get(db + '/couchlist:gmail:config').then(body);
  var b = net.get(db + '/couchlist:gmail:credentials').then(body);
  return q.all([a, b]).spread(function(config, credentials) {
    var oauth2Client = new OAuth2(config.client_id, config.client_secret, config.redirect_uri);
    oauth2Client.credentials = credentials;
    return oauth2Client;
  });
}

// if (credentials.refresh_token) {
//   oauth2Client.credentials = credentials;
//   module.exports = oauth2Client;
// } else {
//   throw "Need to get new credentials";
//   var scopes = [
//     'https://www.googleapis.com/auth/gmail.readonly'
//   ];
//
//   var url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scopes.join(" ") // space delimited string of scopes
//   });
//
//   var readline = require('readline');
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   console.log(url);
//   rl.question("What do you think of node.js? ", function(answer) {
//     oauth2Client.getToken(answer, function(err, tokens) {
//       console.log(err);
//       console.log(tokens);
//       oauth2Client.credentials = tokens;
//     });
//   });
// }
