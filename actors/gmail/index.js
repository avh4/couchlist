var googleapis = require('googleapis');

module.exports = function(couchlist) {
  return require('./authClient')().then(function(authClient) {
    return   {
      import: require('./import')(googleapis, authClient, couchlist),
      update: require('./update')(googleapis, authClient, couchlist)
    };
  });
};
