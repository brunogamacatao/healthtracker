Healthtracker.Views = Healthtracker.Views || {};

(function () {
  'use strict';

  /**
   * This modal is shown whenever the user selects a food (in the food dropdown
   * table). It lets users see some food defails and adjust the quantity she
   * wishes to add of this food.
   */
  Healthtracker.Views.ErrorModal = Backbone.View.extend({
    el: $('#error_modal'),
    template: JST['src/scripts/templates/errormodal.ejs'],
    initialize: function() {
      _.bindAll(this, 'displayErrors');
      Healthtracker.Mediator.bind('foodFetchError', this.displayErrors);
    },
    displayErrors: function(errorMessage) {
      this.render(errorMessage);
    },
    render: function (errorMessage) {
      this.$el.html(this.template({message: errorMessage}));
      $('#component_error_modal').modal('show');
    }
  });

})();
