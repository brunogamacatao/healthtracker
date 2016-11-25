Healthtracker.Collections = Healthtracker.Collections || {};

(function () {
  'use strict';

  /**
   * This is a mock implementation of a collection, intended to store the
   * selected foods in memory. It simulates the way a collection, connected to
   * a RESTful webservice behaves.
   */
  Healthtracker.Collections.TrackedFoods = function() {
    var foods = [];

    return {      
      add: function(food) {
        foods.push(food);
      },
      get: function(id) {
        return _.find(foods, function(food) {
          return food.id == id;
        });
      },
      remove: function(id) {
        foods = _.filter(foods, function(food) {
          return food.id != id;
        });
      },
      toJSON: function() {
        return foods;
      }
    };
  };

})();
