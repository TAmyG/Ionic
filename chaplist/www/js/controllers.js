var arrayUser=[{
        username: 'usuario',
        password: '1234',
        list: [{
                    n:'testList',
                    d: 'Productos varios',
                    t: '16/10/2015'
               }]
    }]

var userActual

angular.module('starter')

/*------------------------------------------------------------------------------------*/
.controller('AppCtrl', function() {})
/*------------------------------------------------------------------------------------*/
.controller('DashCtrl', function() {})
/*------------------------------------------------------------------------------------*/
.controller('LoginCtrl', function($scope, $state, 
                                  $http, $ionicPopup,
                                  servicioWeb) {
    $scope.data = {};    
    $scope.login = function (data){
       var result = servicioWeb.login(data);
       popUp(result.title, result.msj, $ionicPopup);
        //si el estado es correcto se redirige a la pantalla de login
       if(result.state){
          $state.go('init',{}, {reload: true});
          $scope.data = {};
       }    
        
    }
    
    $scope.registro = function(){
        $state.go('registro',{}, {reload: true});
    };
})

/*------------------------------------------------------------------------------------*/
.controller('RegistroCtrl', function($scope, $state, 
                                  $http, $ionicPopup,
                                      servicioWeb) {
    $scope.data = {};
    $scope.addUser = function(data){
        var result = servicioWeb.registerUser(data);
        popUp(result.title, result.msj, $ionicPopup);
        //si el estado es correcto se redirige a la pantalla de login
        if(result.state){
            $state.go('login',{}, {reload: true});
            $scope.data = {};
        }            
    };   
})

/*------------------------------------------------------------------------------------*/
.controller('InitCtrl', function($scope, $state, 
                                  $http, $ionicPopup,
                                 servicioWeb) {
    
    $scope.data = {};
     
    
    $scope.newList = function(){
         popUpNewList($scope, $ionicPopup, function(res){             
             //$scope.arrayListas.push(res);
             userActual.list.push(res);
         });
    };
    
    $scope.delete = function($index){
       
    };
})



/*FUNCIONES-----------------------------------------------------------------*/
//función para crear nuevs listas
var popUpNewList = function($scope, $ionicPopup, callback){
    var myPopup = $ionicPopup.show({
        template: '<input type="text" placeholder="nombre" ng-model="data.name">'+
                   '<textarea rows="4" placeholder="descripcion" ng-model="data.description" cols="50"></textarea>',
        title: 'Nueva lista',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.name || !$scope.data.description ) 
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
               else
                return {
                    n:$scope.data.name,
                    d:$scope.data.description,
                    t: tiempo()
               }
            }
          }
        ]
      });
      myPopup.then(function(res) {
          callback(res);
      });   
}


//función que retorna la fecha actual, útil para la creación de las listas
var tiempo = function(){
    var currentdate = new Date();
    return currentdate.getDate() + "/"+(currentdate.getMonth()+1)
            + "/" + currentdate.getFullYear()
}

var popUp = function(title, msj,$ionicPopup){
     var alertPopup = $ionicPopup.alert({
     title: title,
     template: msj
   });
};