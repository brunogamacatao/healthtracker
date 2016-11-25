Healthtracker.Models = Healthtracker.Models || {};

(function () {
  'use strict';

  /**
   * This model represents a food with the relevent nutritional information.
   * It also works as a proxy between the NutritionIX format and this apps own
   * data format.
   */
  Healthtracker.Models.Food = Backbone.Model.extend({
    validate: function(attrs, options) {
      if (_.isEmpty(attrs.id)) return 'The id could not be empty';
      if (_.isEmpty(attrs.name)) return 'The name could not be empty';
      if (_.isEmpty(attrs.brand)) return 'The brand could not be empty';
      if (_.isEmpty(attrs.size)) return 'The size could not be empty';
      if (_.isEmpty(attrs.calories)) return 'The calories could not be empty';
      if (_.isEmpty(attrs.fat)) return 'The fat could not be empty';
      if (_.isEmpty(attrs.sugar)) return 'The sugar could not be empty';
      if (_.isEmpty(attrs.protein)) return 'The protein could not be empty';

      if (!_.isNumber(attrs.calories)) return 'Calories should be a valid number';
      if (!_.isNumber(attrs.fat)) return 'Fat should be a valid number';
      if (!_.isNumber(attrs.sugar)) return 'Sugar should be a valid number';
      if (!_.isNumber(attrs.protein)) return 'Protein should be a valid number';

      if (parseFloat(attrs.calories) < 0) return 'Negative calories value are not allowed';
      if (parseFloat(attrs.fat) < 0) return 'Negative fat value are not allowed';
      if (parseFloat(attrs.sugar) < 0) return 'Negative sugar value are not allowed';
      if (parseFloat(attrs.protein) < 0) return 'Negative protein value are not allowed';
    },
    parse: function(data) {
      if (data.hits) {
        return _.map(data.hits, function(foodData) {
          return {
            id:       foodData._id,
            brand:    foodData.fields.brand_name,
            name:     foodData.fields.item_name,
            size:     foodData.fields.nf_serving_size_qty + ' ' + foodData.fields.nf_serving_size_unit,
            calories: foodData.fields.nf_calories,
            fat:      foodData.fields.nf_total_fat,
            sugar:    foodData.fields.nf_sugars,
            protein:  foodData.fields.nf_protein
          };          
        });
      }
      return data;
    }
  });
})();
