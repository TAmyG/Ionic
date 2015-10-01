var app = angular.module('starter', ['ionic'])
//controladores
app.controller('AppCtrl', ['$scope', 'FreshlyPressed', '$log', AppCtrl]);
//servicio
app.service('FreshlyPressed', ['$http', '$log', FreshlyPressed]);

function AppCtrl($scope, FreshlyPressed, $log){
  $scope.posts=[];
  $scope.refresh= function(){
    FreshlyPressed.getBlogs($scope);
  };
}

function FreshlyPressed($http, $log){
  this.getBlogs= function($scope){
    $http.jsonp('https://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK')
      .success(function(result){
        $scope.posts=result.posts
        $scope.$broadcast('scroll.refreshComplete');
        //$log.info(JSON.stringify(result.posts));
      });
  }; 
}

/*app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})*/