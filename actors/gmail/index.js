var googleapis = require('googleapis');
var authClient = require('./authClient');

module.exports = function(couchlist) {
  return {
    import: require('./import')(googleapis, authClient, couchlist),
    update: require('./update')(googleapis, authClient, couchlist)
  }
};
