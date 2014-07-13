var q = require('q');
var request = require('superagent');

module.exports = function(itemStore) {
  function insert(issue) {
    var id = 'couchlist:github:issue:' + issue.id;
    var doc = {
      _id: id,
      source: issue,
      'couchlist:type': 'github:issue',
      'couchlist:description': '#' + issue.number + ' ' + issue.title,
      'couchlist:completed': issue.state != 'open',
      'couchlist:project': issue.repository.full_name
    };
    console.log('github/import:', id);
    itemStore.put(doc);
    return q();
  }

  return function() {
    var p = q.defer();
    request.get('https://api.github.com/issues')
    .set('Accept', 'application/json')
    .set('Authorization', 'token ff200399f532bfa720a7527aa865364987f3b040')
    .end(function(err, res) {
      var promises = res.body.map(function(issue) {
        console.log(issue);
        return insert(issue);
      });
      p.resolve(q.all(promises));
    });
    return p.promise;
  };
};
