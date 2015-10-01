var FPApp = angular.module('FPApp',['ionic']);

FPApp.service('FPSvc', ['$http', '$rootScope', FPSvc]);
FPApp.controller('FPCtrl', ['$scope', '$ionicPlatform',
                            '$ionicListDelegate',
                            '$sce', '$ionicLoading', 
                            'FPSvc', FPCtrl]);

function FPCtrl($scope, $ionicPlatform,
                 $ionicListDelegate, $sce, 
                 $ionicLoading, FPSvc){
    $ionicLoading.show({template: 'Cargando blogs...'});
    
    $scope.deviceReady=false;
    $ionicPlatform.ready(function(){
        $scope.$apply(function(){
           $scope.deviceReady=true;         
        });
    });
    
    $scope.blogs=[];
    $scope.params={};
    
    $scope.$on('FPApp.blogs', function(_, result){
        result.posts.forEach(function(b){
            $scope.blogs.push({
                name: b.author.name,
                avatar_URL: b.author.avatar_URL,
                title:$sce.trustAsHtml(b.title),
                URL: b.URL,
                except: $sce.trustAsHtml(b.except),
                featured_image: b.featured_image
            });
        }); 
        $scope.params.before = result.date_range.oldest;
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
    });
    
    $scope.loadMore= function(){
        FPSvc.loadBlogs($scope.params);        
    };
    $scope.reload= function(){
        $scope.blogs=[];
        $scope.params={};
        FPSvc.loadBlogs();
    };    
    $scope.show= function($index){
        cordova.InAppBrowser.open($scope.blogs[$index].URL,
                                  '_blank',
                                 'location=no');
    };
    $scope.share= function($index){
        $ionicListDelegate.closeOptionButtons();
        window.socialmessage.send({
            url:$scope.blogs[$index].URL
        });        
    };
}

function FPSvc($http, $rootScope){
    this.loadBlogs= function(params){
        $http.get('https://public-api.wordpress.com/rest/v1/freshly-pressed/',{
            params: params
        })
          .success(function(result){
            $rootScope.$broadcast('FPApp.blogs',result);
        });
    }
}