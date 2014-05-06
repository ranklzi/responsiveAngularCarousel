var myApp = angular.module('myApp', []);
myApp.directive('counter', function () {
  return {
    scope: {},
    controller: function ($scope, $element, $attrs, $transclude) {
      $scope.value = 0;
      $scope.increment = function () {
        $scope.value += 1;

      };
    },

    link: function (scope, iElm, iAttrs, controller) {
      iElm.on('click', function (e) {
        e.stopPropagation();
        scope.$apply(function () {
          console.log('click counter');
          scope.increment();
        });
      });
    },
    restrict: 'E',
    template: '<div class="circle counter"></div>'
  };
});

myApp.directive('wrapcounter', function () {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="circle wrapcounter" ng-transclude></div>',
    link: function (scope, iElm, iAttrs, controller) {
      // retreive the inner directive element
      var counter = iElm.find('counter')[0];

      var innerScope = angular.element(counter).isolateScope();

      iElm.on('click', function (e) {
        e.stopPropagation();
        scope.$apply(function () {
          // decorating the increment function with a console log.
          console.log('click wrapper');
          // accessing the inner directive api
          innerScope.increment();

        });
      });
    }
  };

});