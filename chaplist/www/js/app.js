// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMockE2E', 
                           'LocalStorageModule'])

.run(function($ionicPlatform) {
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


.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('registro', {
    url: '/registro',
    templateUrl: 'templates/register.html',
    controller: 'RegistroCtrl'
  })
  .state('init', {
    url: '/init',    
    templateUrl: 'templates/init.html',
    controller: 'InitCtrl'
  })  
  .state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
    }
  })
  .state('main.public', {
    url: 'main/public',
    views: {
        'public-tab': {
          templateUrl: 'templates/public.html'
        }
    }
  })
  .state('main.admin', {
    url: 'main/admin',
    views: {
        'admin-tab': {
          templateUrl: 'templates/admin.html'
        }
    }
  });
  $urlRouterProvider.otherwise('login');
    /*$urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        //$state.go('init');
        $state.go('login');
      });*/
})
 
.run(function($httpBackend){
  $httpBackend.whenGET(/templates\/\w+.*/).passThrough(); 
  $httpBackend.whenGET('http://localhost:3000/tvshow').passThrough();
});