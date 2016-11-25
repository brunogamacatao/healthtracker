Healthtracker.Views = Healthtracker.Views || {};

(function () {
  'use strict';

  /**
   * This view displays a search box, where users can type food names.
   */
  Healthtracker.Views.FoodSearch = Backbone.View.extend({
    el: $('#food_search'),
    field: '#food_name',
    template: JST['src/scripts/templates/foodsearch.ejs'],
    events: {
      'keyup #food_name': 'foodNameChanged'
    },
    initialize: function() {
      _.bindAll(this, 'cleanup', 'foodNameChanged');
      Healthtracker.Mediator.bind('foodsChanged', this.cleanup);
      this.render();
    },
    cleanup: function() {
      $(this.field).val('');
      $(this.field).focus();
    },
    foodNameChanged: function() {
      Healthtracker.Mediator.trigger('foodNameChanged', $(this.field).val());
    },
    render: function () {
      this.$el.html(this.template());
    }    
  });

})();
