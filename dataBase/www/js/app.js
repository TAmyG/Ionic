var db = null;
var app = angular.module('starter', ['ionic', 'ngCordova'])
//Controlador
app.controller('AppCtrl', ['$scope', '$cordovaSQLite', '$ionicPopup', AppCtrl]);

app.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    //creación de base de datos, esto se realiza cuando el método
    //onDeviceReady() esta ejecutando
    
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
      console.log('Base de datos creada colocho');
  });
})


function AppCtrl($scope, $cordovaSQLite,$ionicPopup){
    $scope.select=[];
    $scope.insert = function(firtstName, lastName){
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        //inserción
        $cordovaSQLite.execute(db, query, [firtstName,lastName])
            .then(function(res){
                $ionicPopup.alert({
                 title: 'Don\'t eat that!',
                 template: 'Insert ID -> ' + res.insertId
               });
            }, function(err){
                $ionicPopup.alert({
                 title: 'Don\'t eat that!',
                 template: err + ''
               });
            });       
    };
    //Select
    $scope.select = function(lastName){
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db,query,[lastName])
        .then(function(res){
            if(res.rows.length>0){
                $ionicPopup.alert({
                    title:"Msj",
                    template: res.rows.item(5).firstname 
                });                
            }
            else{
                $ionicPopup.alert({
                    title:"Msj",
                    template: "Sin resultados"
                });
            }
        },function(err){
                 $ionicPopup.alert({
                    title:"Msj",
                    template: "Error de select"
                });
        });
    };
    
    
    //TRONAR LA BASE DE DATOS
    //$cordovaSQLite.deleteDB("my.db");
}




