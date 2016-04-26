var dp;

dp = angular.module('ng-bootstrap-datepicker', []);

dp.directive('ngDatepicker', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      dateOptions: '=',
      model: '='
    },
    template: "<input type=\"text\">",
    link: function(scope, element) {
      scope.inputHasFocus = false;
      element.datepicker(scope.dateOptions).on('changeDate', function(e) {
        var defaultFormat, defaultLanguage, format, language;
        defaultFormat = $.fn.datepicker.defaults.format;
        format = scope.dateOptions.format || defaultFormat;
        defaultLanguage = $.fn.datepicker.defaults.language;
        language = scope.dateOptions.language || defaultLanguage;
        return scope.$apply(function() {
          return scope.model = e !== void 0 ? e.target.value : '';
        });
      });
      element.find('input').on('focus', function() {
        return scope.inputHasFocus = true;
      }).on('blur', function() {
        return scope.inputHasFocus = false;
      });
      element.bind('blur', function(e) {
        var currentValue;
        currentValue = element.val();
        if (moment(currentValue, scope.dateOptions.format).isValid() || currentValue === '') {
          return scope.$apply(function() {
            return scope.model = e !== void 0 ? currentValue : '';
          });
        } else {
          element.val('');
          return scope.$apply(function() {
            return scope.model = '';
          });
        }
      });
      return scope.$watch('model', function(newValue) {
        if (!scope.inputHasFocus) {
          return element.datepicker('update', newValue);
        }
      });
    }
  };
});
