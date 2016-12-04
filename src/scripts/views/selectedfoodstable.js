Healthtracker.Views = Healthtracker.Views || {};

(function () {
  'use strict';

  /**
   * This view displays a table where all the foods added by the user are 
   * contained. The user is able to update the food's quantity (directly on the
   * table) or even remove foods.
   */
  Healthtracker.Views.SelectedFoodsTable = Backbone.View.extend({
    el: $('#selected_foods_table'),
    template: JST['src/scripts/templates/selectedfoodstable.ejs'],
    events: {
      'click .remove_food_btn': 'removeFood',
      'change .food_quantity': 'updateFoodQuantity'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      Healthtracker.Mediator.bind('foodsChanged', this.render);
      this.render();
    },
    removeFood: function(evt) {
      var selectedId = $(evt.target).attr('data-id');
      Healthtracker.Singletons.trackedFoods.remove(selectedId);
      Healthtracker.Mediator.trigger('foodsChanged');
    },
    updateFoodQuantity: function(evt) {
      var selectedId = $(evt.target).attr('data-id');
      var newQuantity = $(evt.target).val();
      var selectedFood = Healthtracker.Singletons.trackedFoods.get(selectedId);
      selectedFood.quantity = newQuantity;
      Healthtracker.Mediator.trigger('foodsChanged');
    },
    render: function () {
      // The totals are computed, so they could be displayed on table's footer
      var totals = {
        calories: 0,
        fat: 0,
        sugar: 0,
        protein: 0
      };

      _.each(Healthtracker.Singletons.trackedFoods.toJSON(), function(food) {
        totals.calories += food.calories;
        totals.fat      += food.fat;
        totals.sugar    += food.sugar;
        totals.protein  += food.protein;
      });

      var model = {
        foods: Healthtracker.Singletons.trackedFoods.toJSON(),
        totals: totals
      };

      this.$el.html(this.template(model));
    }

  });

})();
