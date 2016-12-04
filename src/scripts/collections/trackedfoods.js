Healthtracker.Collections = Healthtracker.Collections || {};

(function () {
  'use strict';

  /**
   * This is a mock implementation of a collection, intended to store the
   * selected foods in browser's local storage. It simulates the way a 
   * collection, connected to a RESTful webservice behaves.
   */
  Healthtracker.Collections.TrackedFoods = function() {
    var foods = (localStorage.foods && JSON.parse(localStorage.foods)) || [];

    function commitChanges() {
      localStorage.foods = JSON.stringify(foods);
    }

    return {      
      add: function(food) {
        foods.push(food);
        commitChanges();
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
        commitChanges();
      },
      toJSON: function() {
        return foods;
      }
    };
  };

})();
