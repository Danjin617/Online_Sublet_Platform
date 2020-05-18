app.controller('MainController',
 ['$scope','$http','$rootScope',function($scope, $http, $rootScope) {

   $scope.tagline = 'Welcome to tutorials point angular app!';

   $scope.formData = {};
   $scope.loading = true;


   $scope.init = function(){
      //alert($rootScope.user.username);
       //alert('init'); 
       $http.get('/api/listings').
       then(function(response) {
         $scope.listings = response.data;
       });
     };
     $scope.orderByMe = function(x) {
      $scope.myOrderBy = x;
    }

    $scope.toDate = function(x) {
      return date.getMonth() + " " + date.getDate() + ", " + date.getFullYear();
    };

    
  }]);