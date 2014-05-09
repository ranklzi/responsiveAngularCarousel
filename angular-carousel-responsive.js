'use strict';

angular.module('angular-carousel-responsive', [
    'ngTouch', 'angular-carousel'
])
.directive('rnCarouselResponsive', function() {
  return {
    restrict: 'A',

    scope: {
       carouselItems: '='
    },
    link: function(scope, element, attrs) {
      var width, height;
      scope.resolutionType = -1;
      
      scope.carouselItemsGrouped = [];

      function getWindowResolution(){
        width = window.innerWidth;
        height = window.innerHeight;
        //console.log('width:' + width);
        //console.log('height:' + height);
      }

      function getResolutionType(){
          if (width < 648)
          {
            return 1;
          }
          else if (width < 1200)
          {
            return 4;
          }
          else if (width < 1500)
          {
            return 9;
          }

          return 1;
      }

      function generateGroupedArray(){
          scope.carouselItemsGrouped = [];
          //scope.slideIndex = 2;

          if (scope.resolutionType < 0 || jQuery.type(scope.carouselItems) != 'array' || scope.carouselItems.length === 0){
            console.log('nothing to generate.');
            return;
          }

          console.log('number of images per slides: ' + scope.resolutionType);

          // if (resolutionType == 1) {
          //   //basic layout - display one image per slide
          //   scope.carouselItemsGrouped = scope.carouselItems.slice();
          //   return;
          // }

          var slideGroupIndex = 0;

          for (var i=0; i<scope.carouselItems.length; i++){
            if (slideGroupIndex === 0) {
              //create a new group in grouped array
              scope.carouselItemsGrouped.push([]);
            }

            scope.carouselItemsGrouped[scope.carouselItemsGrouped.length - 1].push(scope.carouselItems[i]);


            if (slideGroupIndex >= scope.resolutionType - 1){
              slideGroupIndex = 0;
            }
            else {
              slideGroupIndex++; 
            }
          }

          console.log('generateGroupedArray for ' + scope.resolutionType + ' image(s) per slide');
          console.log(scope.carouselItemsGrouped);

      }

      function process(){
          //main method, invoked with every change in window resolution
          console.log('process() called.');

          getWindowResolution();

          var resolutionTypeNew =
            getResolutionType();

          if (resolutionTypeNew != scope.resolutionType)
          {

            //console.log('number of slides to show has changed from ' + resolutionType + ' to ' + resolutionTypeNew);
            scope.resolutionType = resolutionTypeNew;
            generateGroupedArray();
          }
      }

      process();

      //document.addEventListener("DOMContentLoaded", process, false);
      window.onresize = process;

      console.log('directive');
      scope.$watch('carouselItems', function(oldVal, newVal) {
        if(newVal) {
          console.log(scope.carouselItems);
        }
      });
    },
    template: '<ul rn-carousel rn-carousel-indicator="true" width="100%">' +
      '<li ng-repeat="group in carouselItemsGrouped" class="slide">' +
        '<div class="container" ng-if="resolutionType == 1">' +
          '<div class="row">' +
              '<div ng-repeat="image in group">' +
                '<div class="col-xs-12">' +
                  '<img ng-src="{{image.imageUrl}}" width="100%" />' +
                '</div>' +
              '</div>' +
          '</div>' +
        '</div>' +

        '<div class="container" ng-if="resolutionType == 4">' +
          '<div class="row">' +
            '<div class="col-xs-6 thumbnail">' +
                  '<img ng-src="{{group[0].imageUrl}}" style="max-height:150px;" />' +
            '</div>' +
            '<div class="col-xs-6 thumbnail" ng-hide="group[1].imageUrl === undefined">' +
                  '<img ng-src="{{group[1].imageUrl}}" style="max-height:150px;" />' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-xs-6 thumbnail" ng-hide="group[2].imageUrl === undefined">' +
                  '<img ng-src="{{group[2].imageUrl}}" style="max-height:150px;" />' +
            '</div>' +
            '<div class="col-xs-6 thumbnail" ng-hide="group[3].imageUrl === undefined">' +
                    '<img ng-src="{{group[3].imageUrl}}" style="max-height:150px;" />' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="container" ng-if="resolutionType == 9">' +
          '<div class="row">' +
            '<div ng-repeat="image in group" class="col-xs-4 thumbnail">' +
              
                  '<img ng-src="{{image.imageUrl}}" height="auto" width="100%"></img>' +
                
            '</div>' +
          '</div>' +
        '</div>' +
      '</li>' +
    '</ul>',
    //templateUrl: 'file:///responsiveCarouselTemplate.html'

  };
});