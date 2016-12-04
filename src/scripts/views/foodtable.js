Healthtracker.Views = Healthtracker.Views || {};

(function () {
  'use strict';

  /**
   * This is a dropdown table displayed whenever the user fills some food name
   * at the food search box. The foods displayed are retrived via NutritionIX
   * webservice.
   */
  Healthtracker.Views.FoodTable = Backbone.View.extend({
    el: $('#food_table'),
    template: JST['src/scripts/templates/foodtable.ejs'],
    events: {
      'click .add_food_btn': 'foodSelected'
    },
    initialize: function () {
      _.bindAll(this, 'foodNameChanged', 'cleanup', 'render');
      Healthtracker.Mediator.bind('foodNameChanged', this.foodNameChanged);
      Healthtracker.Mediator.bind('foodsChanged', this.cleanup);
    },
    foodNameChanged: function(value) {
      if (_.isEmpty(value)) {
        this.collection.reset();
        this.render();
      } else {
        $('#loading_div').show();
        this.collection.search(value).success(this.render);
      }
    },
    cleanup: function() {
      this.collection.reset();
      this.render();      
    },
    foodSelected: function(evt) {
      var selectedId = $(evt.target).attr('data-id');
      var selectedFood = _.find(this.collection.toJSON()[0], function(food) {
        return food.id == selectedId;
      });

      var modal = new Healthtracker.Views.AddFoodModal({model: selectedFood});
      modal.render();
    },
    render: function () {
      $('#loading_div').hide();
      var fetchedFoods = this.collection.toJSON()[0] || [];
      this.$el.html(this.template({foods: fetchedFoods}));
    }

  });

})();
