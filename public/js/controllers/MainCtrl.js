
app.controller('MainController',
 ['$scope','$http',function($scope, $http) {

   $scope.tagline = 'Welcome to tutorials point angular app!';

   $scope.formData = {};
   $scope.loading = true;


   $scope.init = function(){
       //alert('init'); 
       $http.get('/users').
       then(function(response) {
        //alert(response.data);
         $scope.users = response.data;
       });
     };
     $scope.orderByMe = function(x) {
      $scope.myOrderBy = x;
    }

    
  }]);