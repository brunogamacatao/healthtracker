Healthtracker.Views = Healthtracker.Views || {};

(function () {
  'use strict';

  /**
   * This modal is shown whenever the user selects a food (in the food dropdown
   * table). It lets users see some food defails and adjust the quantity she
   * wishes to add of this food.
   */
  Healthtracker.Views.AddFoodModal = Backbone.View.extend({
    el: $('#food_modal'),
    template: JST['src/scripts/templates/addfoodmodal.ejs'],
    events: {
      'click #add_food_modal_btn': 'addFood'
    },
    addFood: function(evt) {
      // Setting the user typed quantity to the model
      this.model.quantity = parseFloat($('#food_quantity').val());

      Healthtracker.Singletons.trackedFoods.add(this.model);
      Healthtracker.Mediator.trigger('foodsChanged', this.model);

      // Perform the view event cleanup 
      $('#add_food_modal').modal('hide');
      this.undelegateEvents();
      this.stopListening();
    },
    render: function () {
      this.$el.html(this.template({food: this.model}));
      $('#add_food_modal').modal('show');
    }
  });

})();
