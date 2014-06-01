/** @jsx React.DOM */

require('./env');
var ReactTest = require('./ReactTest');
var Label = require('../../main/js/Label');

describe('Label', function() {
  it('displays the provided message', function() {
    var $ = ReactTest.render(<Label>Hello World</Label>);
    expect($('p').text()).to.equal('Hello World');
  });
});