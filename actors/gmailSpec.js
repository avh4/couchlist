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
  var itemStore;
  var authClient;
  beforeEach(function() {
    gmail = require('gmail-mock')();
    authClient = {};
    itemStore = require('./mocks/itemStore');
  });

  describe('actors/gmail/import', function() {
    var subject;
  
    beforeEach(function() {
      gmail.addMessage({
        id: 'M1',
        threadId: 'T1',
        payload: { headers: [ { name: 'Subject', value: 'My Subject'}]}
      });
      
      subject = require('./gmail/import')(gmail, authClient, itemStore);
    });
  
    describe('when there are new threads in the inbox', function() {
      beforeEach(function() {
        return subject();
      });
    
      it('adds the thread to the list', function() {
        return itemStore.get('couchlist:gmail:thread:T1').then(function(item) {
          expect(item._id).to.equal('couchlist:gmail:thread:T1');
        });
      });
    
      it('sets the item type', function() {
        return itemStore.get('couchlist:gmail:thread:T1').then(function(item) {
          expect(item['couchlist:type']).to.equal('gmail');
        });
      });
    });
  
    describe('when there are updated threads in the inbox', function() {
      beforeEach(function() {
        return itemStore.put({
          _id: 'couchlist:gmail:thread:T1', 
          'couchlist:description': 'My Subject',
          'couchlist:completed': true
        })
        .then(subject);        
      });
      
      it('does not remove the description', function() {
        return itemStore.get('couchlist:gmail:thread:T1').then(function(item) {
          expect(item['couchlist:description']).to.equal('My Subject');
        });
      });
      
      it('marks the item as not complete', function() {
        return itemStore.get('couchlist:gmail:thread:T1').then(function(item) {
          expect(item['couchlist:completed']).to.equal(false);
        });
      });
    });
  });

  describe('actors/gmail/update', function() {
    var subject;
    var m1;
  
    beforeEach(function() {
      itemStore.put({
        _id: 'couchlist:gmail:thread:T1',
        source: { id: 'T1' }
      });
      gmail.addMessage(m1 = {
        id: 'M1',
        threadId: 'T1',
        labelIds: [ 'INBOX' ],
        payload: { headers: [ { name: 'Subject', value: 'My Subject'}]}
      });
      subject = require('./gmail/update')(gmail, authClient, itemStore);
    });
    
    function check(fn) {
      var p = q.defer();
      setTimeout(function() {p.resolve();});
      return p.promise.then(function() {
        return itemStore.get('couchlist:gmail:thread:T1').then(fn);
      });
    }
    
    it('sets the item description from the message subject', function() {
      subject();
      
      return check(function(item) {
        expect(item['couchlist:description']).to.equal('My Subject');
      });
    });
    
    describe('when a thread has been archived', function() {
      it('marks the item as complete', function() {
        m1.labelIds = []; // 'INBOX' is not present

        subject();
        
        return check(function(item) {
          expect(item['couchlist:completed']).to.equal(true);
        });
      });
      
      it('does not mark items as complete if they are still in the inbox', function() {
        m1.labelIds = [ 'OTHER', 'INBOX' ];

        subject();
        
        return check(function(item) {
          expect(item['couchlist:completed']).to.equal(false);
        });
      });
      
      it('does not mark items as complete if any message is still in the inbox', function() {
        m1.labelIds = []; // 'INBOX' is not present
        gmail.addMessage({
          threadId: 'T1',
          labelIds: [ 'OTHER', 'INBOX' ]
        });

        subject();
        
        return check(function(item) {
          expect(item['couchlist:completed']).to.equal(false);
        });
      });
    });
  });  
});
