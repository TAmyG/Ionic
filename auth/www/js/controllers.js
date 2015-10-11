angular.module('starter')

.controller('AppCtrl' ,function($state, $scope, $ionicPopup,
                                AuthService, AUTH_EVENTS){
    
    $scope.username = AuthService.username();
    
    $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
        var alerPopup = $ionicPopup.alert({
            title: 'Unauthorized',
            template: 'You are not allowed to acces this resouce'
        });
    });
    
     $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
         AuthService.logout();
         $state.go('login');
        var alerPopup = $ionicPopup.alert({
            title: 'Session lost',
            template: 'Login again.'
        });
    });    
    
    $scope.setCurrentUsername = function(name){
        $scope.username = name;
    };    
})

.controller('LoginCtrl' ,function($scope, $state, $ionicPopup,
                                   AuthService){
    $scope.data = {};
    $scope.login = function(data){           
      AuthService.login(data.username, data.password).then(          
          function (authenticated){
              //$state.go($state.current, {}, {reload: true});
              console.log(authenticated);
              $state.go('main.public',{}, {reload: true});
              console.log('nos vamos al main');
              $scope.setCurrentUsername(data.username);
              
          }, function(err){
            var alerPopup = $ionicPopup.alert({
                title: 'Login failed',
                template: 'Check your credentials'
            });
          });
    };
    $scope.registro = function(){
        $state.go('registro',{}, {reload: true});
    };
})

.controller('RegistroCtrl', function($scope, $state, $ionicPopup){
    $scope.data = {};
    
    $scope.addUser = function(data){
        if(data.username == undefined || data.password == undefined){
            $ionicPopup.alert({
                    title: 'Fallo en el registro',
                    template: 'No deje campos vacíos!!'
                });
        }else{
                $ionicPopup.alert({
                    title: 'Usuario agregado',
                    template: 'Usuario: '+data.username+'<br>Agregado con éxito' 
                });
            $state.go('login',{}, {reload: true});
        }        
    };    
})

.controller('DashCtrl' ,function($scope, $state, $http, $ionicPopup,
                                   AuthService){
    $scope.logout = function(){
        AuthService.logout();
        $state.go('login');
    };
    
    $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };
 
      $scope.performUnauthorizedRequest = function() {
        $http.get('http://localhost:8100/notauthorized').then(
          function(result) {
            // No result here..
          }, function(err) {
            $scope.response = err;
          });
      };

      $scope.performInvalidRequest = function() {
        $http.get('http://localhost:8100/notauthenticated').then(
          function(result) {
            // No result here..
          }, function(err) {
            $scope.response = err;
          });
      };
});