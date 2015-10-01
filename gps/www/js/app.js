var app = angular.module('starter', ['ionic', 'ngCordova']);
app.controller('AppCtrl', ['$scope', '$cordovaGeolocation', '$ionicPopup', AppCtrl]);

app.run(function($ionicPlatform) {
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
})


function AppCtrl($scope, $cordovaGeolocation, $ionicPopup){ 
    
    var posOptions = {timeout: 10000, enableHighAccuracy: false};    
    $scope.where = function(){
           $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function(position){
                var lat  = position.coords.latitude
                var long = position.coords.longitude                
                $ionicPopup.alert({
                 title: 'Geo',
                 template: 'Lat: '+ lat+'\nLong: '+long
               });
            }, function(error){
                $ionicPopup.alert({
                 title: 'Error',
                 template: error
               });
                console.log('error:', error);
            });
    };
}