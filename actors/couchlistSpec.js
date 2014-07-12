var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var q = require('q');

function a(fn, done) {
  return function() {
    try {
      fn.apply(null, arguments);
      done();
    } catch (e) {
      done(e);
    }
  };
}

function async(fn, done) {
  setTimeout(a(fn, done));
}

describe('couchlist', function() {
  var subject;
  var net;
  var db;
  
  beforeEach(function() {
    db = 'fake:db';
    net = {
      post: sinon.stub().returns(q({})),
      get: sinon.stub().returns(q({})),
      put: sinon.stub().returns(q({})),
      head: sinon.stub()
    };
    subject = require('./couchlist')(net, db);
  });
  
  describe('put', function() {
    it('puts the document', function() {
      var doc = { _id: 'D1', data: 'XXX' };
      subject.put(doc);
      expect(net.put).to.have.been.calledWith(db + '/D1', doc);
    });
    
    it('should fail if there is no _id', function() {
      expect(subject.put.bind(null, {})).to.throw();
    });
    
    it('should update if the document already exists', function(done) {
      var doc = { _id: 'D1', data: 'XXX' };
      
      net.put.returns(q({status: 409, body: { error: 'conflict', reason: 'Document update conflict.' }}));
      net.head.returns(q({headers: { etag: '"R1"'}}));
      
      subject.put(doc);
      
      async(function() {
        expect(net.head).to.have.been.calledWith(db + '/D1');
        expect(net.put).to.have.been.calledWith(db + '/D1', { _id: 'D1', _rev: 'R1', data: 'XXX' });
      }, done);
    });
  });

  describe('get', function() {
    it('returns a promize with the _all_docs result', function(done) {
      net.get.returns(q({body: {total_rows: 1, offest: 0, rows: [ { id: 'D1', key: 'D1', value: { rev: 'r1'}, doc: { id: 'T1' }}]}}));
      
      subject.get().then(a(function (items) {
        expect(net.get).to.have.been.calledWith(db + '/_all_docs?include_docs=true');
        expect(items).to.eql([{ id: 'T1' }]);
      }, done));
    });
  });
});
