var assert = require('assert');

options = {
  config: require("../config.json")
};


describe('Filter', function() {

  var _stack = [{"email":"example@.....","labels":[{"name":"example","value":1},{"name":"example 2","value":1},{"name":"example3","value":2}]},{"email":"example2@.....","labels":[{"name":"example","value":1},{"name":"example 2","value":1},{"name":"example3","value":2}]}  ];
  var _merge_with = {"email":"example@.....","labels":[{"name":"example","value":1},{"name":"example 2","value":1},{"name":"example3","value":1},{"name":"example4","value":1}]  };

  var filter = require('../filter/commonLabels/filter.js')(options);

  describe('#mergeStack()', function () {
    it('All labels equals to 2 for email example@....', function () {
      var stack = filter.mergeStack(_stack, _merge_with);
      assert.equal(stack[0].labels[0].value, 2);
      assert.equal(stack[0].labels[1].value, 2);
      assert.equal(stack[0].labels[1].value, 2);
    });
  });

  describe('#filterStack() - Filter by popularity', function () {
    it('1 element removed', function () {
      var popular = filter.filterStack(_stack);
      assert.equal(popular[0].labels.length, 3);
    });
  });

  describe('#filterStack() - Sorting', function () {
    it('Descending', function () {
      var sorting = filter.filterStack(_stack);
      assert.equal(sorting[0].labels[0].value, 2);
    });
  });

});