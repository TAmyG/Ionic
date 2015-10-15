angular.module('starter')
 
.controller('AppCtrl', function() {})
.controller('LoginCtrl', function() {})
.controller('DashCtrl', function() {})

.controller('InitCtrl', function($scope, $state, 
                                  $http, $ionicPopup) {
    $scope.arrayListas = [];
    $scope.data = {}  
    
    $scope.newList = function(){
         popUpNewList($scope, $ionicPopup, function(res){
             $scope.arrayListas.push(res);
         });
    }
    
    $scope.delete= function($index){
        $scope.arrayListas.splice($index, 1);
    }
    
    $scope.see = function(){
        console.log('nos vamos');
         $state.go('main.dash',{}, {reload: true});
    }
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
};