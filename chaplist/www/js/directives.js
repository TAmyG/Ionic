angular.module('starter')
.directive('ownattribute', function(){
   return {
      template : '<h1>{{msj}}</h1>',
      link : function (scope,elem,attrs) {
          
          /*if(scope.data.pass1 == scope.data.pass2)
                scope.msj='ya está';
          else
                scope.msj='no está';
                */
      }
   };
});