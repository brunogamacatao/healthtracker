Healthtracker.Views = Healthtracker.Views || {};

(function () {
  'use strict';

  /**
   * This is a simple component which displays the updated total calories 
   * tracked.
   */
  Healthtracker.Views.CaloriesDisplay = Backbone.View.extend({
    el: $('#calories_display'),
    template: JST['src/scripts/templates/caloriesdisplay.ejs'],
    initialize: function () {
      _.bindAll(this, 'render');
      Healthtracker.Mediator.bind('foodsChanged', this.render);
      this.render();
    },
    calculateModel: function() {
      var totalCal = 0.0;

      _.each(Healthtracker.Singletons.trackedFoods.toJSON(), function(food) {
        totalCal += food.calories * food.quantity;
      });

      return {
        calories: totalCal
      };
    },
    render: function () {
      this.$el.html(this.template(this.calculateModel()));
    }

  });

})();
