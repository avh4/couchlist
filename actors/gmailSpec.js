var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;

var gmail = require('gmail-mock')();

describe('actors/gmail/import', function() {
  var couchlist;
  var authClient;
  
  beforeEach(function() {
    authClient = {};
    couchlist = {
      add: sinon.spy()
    };
  });
  
  describe('when there are new threads in the inbox', function() {
    var subject;
    
    beforeEach(function() {
      gmail.addMessage({
        threadId: 'T1',
        gmailData: 'XXX',
        payload: { headers: [ { name: 'Subject', value: 'My Subject'}]}
      });
      
      subject = require('./gmail/import')(gmail, authClient, couchlist);
      subject();
    });
    
    it('adds the thread to the list', function() {
      expect(couchlist.add).to.have.been.calledWith(sinon.match(function(doc) {
        return doc._id === 'couchlist:gmail:thread:T1';
      }));
    });
    
    it('sets the description to the thread subject', function() {
      expect(couchlist.add).to.have.been.calledWith(sinon.match(function(doc) {
        return doc['couchlist:description'] === 'My Subject';
      }));
    });
  });
  
  describe('when there are updated threads in the inbox', function() {
    it('updates the existing list items', function() {
      
    });
  });
});

describe('actors/gmail/update', function() {
  describe('when a thread has been archived', function() {
    it('marks the item as complete', function() {
      
    });
  });
});