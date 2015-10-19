angular.module('starter')

.service('servicioWeb', function($http, localStorageService){
    this.key = 'listas-temp';
    this.pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
    
    if(localStorageService.get(this.key))
        this.listUsers = localStorageService.get(this.key);        
    else
        this.listUsers = [];
        
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
    /*Funciones de uso temporal-----------------*/
    this.updateLocalStorage = function(){
        localStorageService.set(this.key, this.listUsers);
    }
     
 
    /*Funciones nativas-------------------------*/
    //función utilizada para la autenticación
    this.login = function(data){
        this.initFlags();
        if(data.username == undefined || data.password == undefined){
            this.title = '<h1>Error</h1>';
            this.state = false;
            this.msj = 'Campos vacios!';
        }else if((data.username == 'user' || 
                  data.username == 'user@g.com') && 
                  data.password == '1234'){
            this.title = '<h1>Bienvenido</h1>';
            this.state = true;
            this.msj = 'Bienvenido: '+data.username;            
        }else{
            this.title = '<h1>Error</h1>';
            this.state = false;
            this.msj = 'Credenciales incorrectas!';
        }
        return{
            state: this.state,
            title: this.title,
            msj: this.msj
        }
    }
    
    //función para agregar nuevos usuarios, con sus validaciones
    this.registerUser =  function(data){
        this.initFlags();
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
            //llamar al webservice para agregar
            this.title = '<h1>Correcto</h1>',
            this.msj = 'Cuenta creada con éxito!'
        }        
      return {
          state: this.state,
          title: this.title,
          msj: this.msj
      }
    }; 
    
    
    this.initFlags = function(){
        this.title= '';
        this.msj = '';
        this.state = true; 
    }
});