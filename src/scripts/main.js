window.Healthtracker = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mediator: {},
  Singletons: {},
  init: function () {
    'use strict';

    // implementing the mediator pattern
    _.extend(Healthtracker.Mediator, Backbone.Events);

    // collections instantiation
    var foods = new Healthtracker.Collections.Food();

    // The tracked foods collections should be a singleton, so the data would
    // be unique among all components
    Healthtracker.Singletons.trackedFoods = new Healthtracker.Collections.TrackedFoods();

    // views instantiation
    new Healthtracker.Views.FoodSearch();
    new Healthtracker.Views.FoodTable({ collection: foods });
    new Healthtracker.Views.CaloriesDisplay();
    new Healthtracker.Views.SelectedFoodsTable();
  }
};

$(document).ready(function () {
  'use strict';
  Healthtracker.init();
});
