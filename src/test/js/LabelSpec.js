/** @jsx React.DOM */

require('./env');
var ReactTest = require('./ReactDomTest');
var Label = rewire("../../main/js/Label");

var ExampleService = { click: sinon.spy() };
Label.__set__('ExampleService', ExampleService);

describe("Label Test", function() {
  var subject;

  beforeEach(function(done) {
    ReactTest.reset(done);
  });

  it("Check Text Assignment", function() {
    subject = ReactTest.render(<Label>Some Text We Need for Test</Label>);
    expect($('p').text()).to.equal("Some Text We Need for Test");
  });

  it("Click", function () {
    var label = ReactTest.render(<Label>Some Text We Need to Test</Label>);

    ReactTest.click('p');
    expect($('p').text()).to.equal("Text After Click");
    expect(ExampleService.click).to.have.been.called;
  });
});
