angular.module('starter')

.service('servicioWeb', function($http){
    this.pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
    
    this.getMovies = function () {
        $http.get('http://localhost:3000/tvshow')
            .success(function(data) {
                data.forEach(function(e){
                    console.log(e,"ollalal");
                });                
            })
            .error(function(data) {
                console.log(data);
            });
    }
    
    //función para agregar nuevos usuarios, con sus validaciones
    this.registerUser =  function(data){
        this.title= '';
        this.msj = '';
        this.state = true; 
        
        if (data.fecha == undefined || data.name == undefined || data.lastName == undefined
            || data.email == undefined || data.pass1 == undefined || data.pass2 == undefined
            || data.sexo == undefined){
            this.state = false;
            this.title = '<h1>Error</h1>';
            this.msj = 'No se permiten campos vacíos<br>';
        }
        
        if(data.pass1.length < 6){
            this.state = false;
            this.title = '<h1>Error</h1>';
            this.msj = 'La contraseña debe tener por lo menos 6 caracteres<br>';
        }
        
        
        if(data.pass1 !== data.pass2){
            this.state = false;
            this.title = '<h1>Error</h1>';
            this.msj += 'Las contraseñas no coinciden<br>';
        }
        
        
        if(!this.pattern.test(data.email)){
            this.state = false;
            this.title = '<h1>Error</h1>';
            this.msj += 'Ingrese un email válido!!';
        }
        
        //comprobación de los errores
        
        if(this.state){
            this.title = '<h1>Correcto</h1>',
            this.msj = 'Cuenta creada con éxito!'
        }
        
      return {
          state: this.state,
          title: this.title,
          msj: this.msj
      }
    };
    
});