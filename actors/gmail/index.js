var googleapis = require('googleapis');

module.exports = function(itemStore) {
  return require('./authClient')().then(function(authClient) {
    return   {
      import: require('./import')(googleapis, authClient, itemStore),
      update: require('./update')(googleapis, authClient, itemStore)
    };
  });
};
