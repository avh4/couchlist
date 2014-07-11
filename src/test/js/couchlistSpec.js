/** @jsx React.DOM */

require('./env');
var ReactTest = require('./ReactDomTest');
var props = ReactTest.mock.props;
var couchlist = rewire('../../main/js/couchlist');

ReactTest.mock(couchlist, 'Label');

describe('couchlist', function() {
  it('shows a label', function() {
    ReactTest.render(<couchlist/>);
    expect(props($('#Label')).children).to.eql('couchlist');
  });
});