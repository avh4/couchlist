var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var q = require('q');


function async(fn, done) {
  setTimeout(function() {
    try {
      fn();
      done();
    } catch (e) {
      done(e);
    }
  })
}

describe('actors/gmail', function() {
  var gmail;
  var couchlist;
  var authClient;
  beforeEach(function() {
    gmail = require('gmail-mock')();
    authClient = {};
    couchlist = {
      put: sinon.spy(),
      get: sinon.stub()
    };
  });

  describe('actors/gmail/import', function() {
    var subject;
  
    beforeEach(function() {
      subject = require('./gmail/import')(gmail, authClient, couchlist);
    });
  
    describe('when there are new threads in the inbox', function() {
      beforeEach(function() {
        gmail.addMessage({
          id: 'M1',
          threadId: 'T1',
          payload: { headers: [ { name: 'Subject', value: 'My Subject'}]}
        });
      
        subject();
      });
    
      it('adds the thread to the list', function() {
        expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
          return doc._id === 'couchlist:gmail:thread:T1';
        }));
      });
    
      it('sets the item type', function() {
        expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
          return doc['couchlist:type'] === 'gmail';
        }));
      });
      
      it('marks the item as pending since the message data is not loaded', function() {
        expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
          return doc['couchlist:pending'] === true;
        }));
      });
    });
  
    describe('when there are updated threads in the inbox', function() {
      it('updates the existing list items', function() {
      
      });
    });
  });

  describe('actors/gmail/update', function() {
    var subject;
    var m1;
  
    beforeEach(function() {
      couchlist.get.returns(q({
        'couchlist:gmail:thread:T1': {
          _id: 'couchlist:gmail:thread:T1',
          source: { id: 'T1' }
        }
      }));
      gmail.addMessage(m1 = {
        id: 'M1',
        threadId: 'T1',
        labelIds: [ 'INBOX' ],
        payload: { headers: [ { name: 'Subject', value: 'My Subject'}]}
      });
      subject = require('./gmail/update')(gmail, authClient, couchlist);
    });
    
    it('sets the item description from the message subject', function(done) {
      subject();
      
      async(function() {
        expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
          return doc['couchlist:description'] === 'My Subject';
        }));
      }, done);
    });
    
    it('sets pending to false', function(done) {
      subject();
      
      async(function() {
        expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
          return doc['couchlist:pending'] === false;
        }));
      }, done);
    });
  
    describe('when a thread has been archived', function() {
      it('marks the item as complete', function(done) {
        m1.labelIds = []; // 'INBOX' is not present

        subject();
        
        async(function() {
expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
            return doc['couchlist:completed'] === true;
          }))
        }, done);
      });
      
      it('does not mark items as complete if they are still in the inbox', function(done) {
        m1.labelIds = [ 'OTHER', 'INBOX' ];

        subject();
        
        async(function() {
expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
            return doc['couchlist:completed'] === false;
          }))
        }, done);
      });
      
      it('does not mark items as complete if any message is still in the inbox', function(done) {
        m1.labelIds = []; // 'INBOX' is not present
        gmail.addMessage({
          threadId: 'T1',
          labelIds: [ 'OTHER', 'INBOX' ]
        });

        subject();
        
        async(function() {
expect(couchlist.put).to.have.been.calledWith(sinon.match(function(doc) {
            return doc['couchlist:completed'] === false;
          }))
        }, done);
      });
    });
  });  
});
