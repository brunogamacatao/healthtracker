Healthtracker.Collections = Healthtracker.Collections || {};

(function () {
  'use strict';

  /**
   * This collection is responsible for accessing the NutritionIX webservice
   * to retrieve foods and its nutrition information.
   */
  Healthtracker.Collections.Food = Backbone.Collection.extend({
    urlRoot: 'https://api.nutritionix.com/v1_1/search',
    model: Healthtracker.Models.Food,
    search: function(query, success) {
      var searchParams = {
        'fields': 'brand_name,item_name,nf_calories,nf_total_fat,nf_sugars,nf_protein,nf_serving_size_qty,nf_serving_size_unit',
        'appId': Healthtracker.Config.NUTRITIONIX_APP_ID,
        'appKey': Healthtracker.Config.NUTRITIONIX_APP_KEY
      };

      this.url = this.urlRoot + '/' + query;

      return this.fetch({data: $.param(searchParams)});
    }
  });

})();
