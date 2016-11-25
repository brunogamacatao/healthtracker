'use strict';

describe('Food Model', function () {
  beforeEach(function () {
    this.FoodModel = new Healthtracker.Models.Food();
  });

  describe('#validate()', function() {
    assert.isTrue(this.FoodModel.isValid());
    assert.equal(this.FoodModel.validationError, 'The id could not be empty');
  });
});
