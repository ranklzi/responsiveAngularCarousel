var app = angular.module('myTestApp', ['angular-carousel-responsive']);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
	$scope.items = [];

	$scope.items = [{'imageUrl':'http://wallpaperwonder.com/wp-content/uploads/2014/04/Silvia-Drift-Wallpaper-HD.jpg'}, 
		{'imageUrl':'http://image.superstreetonline.com/f/eventcoverage/sstp_0912_formula_drift_round_5_evergreen_speedway/26785975/sstp_0912_12_o%2Bformula_drift_washington%2Btoyota_crash.jpg'},
		{'imageUrl':'http://bizbeatblog.dallasnews.com/files/2013/09/IMG_4153.jpg'}, 
		{'imageUrl':'http://www.mrwallpaper.com/wallpapers/toyota-supra-drift.jpg'}, 
		{'imageUrl':'http://fc01.deviantart.net/fs40/f/2009/045/e/5/3000_GT_Drift_by_MurilloDesign.jpg'}, 
		{'imageUrl':'http://www.zastavki.com/pictures/1920x1200/2009/Motocycles_Other_Bikes_Drift_012388_.jpg'}, 
		{'imageUrl':'http://www.rideicon.com/wp-content/uploads/2012/01/Drift2_13911.jpg'}, 
		{'imageUrl':'http://cdn.carthrottle.com/wp-content/uploads/2012/12/Drift-FB-2.jpg'}, 
		{'imageUrl':'http://www.wreckedmagazine.com/images/driftaustralia.jpg'}];

  	$http.get('http://gdata.youtube.com/feeds/api/standardfeeds/most_popular?v=2&alt=json').success(function(data) {
        $scope.items2 = data.feed.entry;
        console.log('get feed');
        //console.log($scope.items);
    }).error(function(data) {
        alert('cannot fetch youtube API');
    });
}]);