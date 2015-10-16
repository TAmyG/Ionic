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


.controller('AppCtrl', function() {})
.controller('DashCtrl', function() {})


.controller('LoginCtrl', function($scope, $state, 
                                  $http, $ionicPopup) {
    $scope.data = {};
    
    $scope.login = function (data){
        var correct = 0;
        arrayUser.forEach(function(e){
            console.log(e);
            if (e.username == data.username && e.password == data.password){
                 $ionicPopup.alert({
                    title: 'Bienvenido',
                    template: 'Hola: <h1>'+data.username+'</h1>'
                });
                userActual = e;
                $state.go('init',{}, {reload: true});
                correct = 1;
            }                
        });
        //si llega a este punto las credenciales son incorrectas
        if(correct < 1)
            $ionicPopup.alert({
                        title: 'Fallo en el login',
                        template: 'Credenciales incorrectas!!'
            })
    }
    
    $scope.registro = function(){
        $state.go('registro',{}, {reload: true});
    };
})

.controller('RegistroCtrl', function($scope, $state, 
                                  $http, $ionicPopup) {
    $scope.data = {};
    
    $scope.addUser = function(data){
        if(data.username == undefined || data.password == undefined){
           popUp('Error', 'Campos vacíos', $ionicPopup);
        }else{
            popUp('Usuario agregado', 
                  'Usuario: '+data.username+'<br>Agregado con éxito' , 
                  $ionicPopup);
            arrayUser.push({
                username: data.username,
                password: data.password,
                list: [{
                    n:'testList',
                    d: 'Productos varios',
                    t: '16/10/2015'
               }]
            });
            $state.go('login',{}, {reload: true});
        }        
    };   
})

.controller('InitCtrl', function($scope, $state, 
                                  $http, $ionicPopup) {
    
    $scope.data = {};
    $scope.arrayListas = userActual.list;
    
    $scope.newList = function(){
         popUpNewList($scope, $ionicPopup, function(res){             
             //$scope.arrayListas.push(res);
             userActual.list.push(res);
         });
    };
    
    $scope.delete = function($index){
        console.log($scope.arrayListas.length);
        //$scope.arrayListas.splice($index, 1);
        userActual.list.splice($index, 1);
        //$scope.arrayListas = arrayActual;
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